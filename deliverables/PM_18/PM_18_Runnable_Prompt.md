# PM_18 Runnable Prompt

Standalone, copy-pasteable version of the runnable LLM prompt referenced in the Portfolio (Appendix A). Lifted from the production `mango_prompts.json` of the Still pipeline and sanitised for keys.

## What it does

Generates the layout-locked composition for one Meta ad in a brand system. This is **Stage A** of Still's two-stage pipeline (Stage A: layout + typography, Stage B: photographic refinement). The Stage A output is a 1024×1024 PNG with the layout, headline placement, type pairing, and palette correct. Stage B then re-renders at 4K with photographic quality. For Stage A alone (what this file covers), the model and request are below.

## Reproducibility statement

The five Mango Lab ads currently running on Meta were generated through this exact prompt structure (Stage A then Stage B). The campaign produced 200+ leads on $143 spend at ~$0.72 cost per lead in less than a month. Stage A reproducibility was verified live against the OpenAI API on 2026-05-03 against both `gpt-image-1` and `gpt-image-2`. Both calls returned valid 1024x1024 PNGs that match the layout described in the prompt (macro thumb, three-line headline, sub line, CTA pill, MANGO LAB rendered correctly). Live render evidence is in Appendix A-2 of the Portfolio.

## Model

`gpt-image-2` (OpenAI Image Generation API, recommended). The prompt also runs against the older `gpt-image-1`, which is what the original five Mango Lab ads were generated against. `gpt-image-2` renders typography crisper at the same prompt and is what the current Still production pipeline uses.

## What you need to reproduce

1. An OpenAI API key with image-generation access (set as `$OPENAI_API_KEY`).
2. A brand wordmark file as `mango_wordmark.png`. Any solid black-on-transparent wordmark works for testing; for a faithful Mango Lab reproduction request the actual file from Jean-Luc.
3. A macro-photography reference image as `ref_thumb.jpg`. Any close-up dark macro photograph works for testing; for the actual reference used in production, request from Jean-Luc.
4. `curl` (built into macOS / Linux).

## How to reproduce (5 steps)

1. `export OPENAI_API_KEY=<your key>`
2. Save the prompt block (below) to `prompt.txt`.
3. Save this request body to `request.json` (replace `<PROMPT>` with the contents of `prompt.txt`):

   ```json
   {
     "model": "gpt-image-2",
     "prompt": "<PROMPT>",
     "size": "1024x1024",
     "n": 1
   }
   ```

   (Use `"model": "gpt-image-1"` if you want to reproduce against the older model; both work.)

4. Run:

   ```bash
   curl -X POST https://api.openai.com/v1/images/generations \
     -H "Authorization: Bearer $OPENAI_API_KEY" \
     -H "Content-Type: application/json" \
     -d @request.json | tee response.json
   ```

5. The response includes a base64 PNG (or a URL). Decode / download to `ad1-stageA.png`. Expected: a 1024×1024 PNG with the layout described in the prompt — macro thumb in the centre, two-line headline at the top, sub line above the bottom, white CTA pill at the very bottom with a small mango-orange link icon, no corner wordmark on this specific ad. The photographic quality will be a bit flat (Stage A's job is layout, not finish); Stage B then refines it at 4K.

## Full prompt text

```
Generate a 1:1 square ad composition (1024x1024). Clone the composition of
the attached reference image (image 1, ref_thumb.jpg) exactly: same framing,
same proportions, same hierarchy of elements, same negative space distribution.
The reference shows: solid dark background, an extreme-macro photograph of a
single human thumb pad filling the center 65% of the frame with fingerprint
ridges visible, a two-line headline overlay across the top 22% of the frame,
and a small white rounded pill CTA button at the very bottom. Replicate that
composition exactly, but substitute the brand and palette as follows.

Background: solid coal black #000000, flat fill, no gradient (the reference's
black background, keep it pure black, no navy).

Subject (center 65% of frame): an extreme-macro photograph of a single human
thumb pad seen straight-on, fingerprint ridges visible in detail, vertical
orientation matching the reference. Skin: warm-neutral, NOT navy-tinted.

Headline (top 22% of frame, centered): two lines.
 - Line 1 (bold modern sans, Inter Tight Black weight 900, color cream
   #EFEED6, ~58pt, centered, tight tracking): I opened the app to check one
   thing
 - Line 2 (same size and color, immediately below line 1, centered): the
   words 'and three hours later,' set in bold modern sans (Inter Tight Black
   900, cream), followed by a comma; then on a third visual line below it,
   the words 'the algorithm knew me…' set in humanist serif italic (Tiempos
   Italic 600, cream), with a unicode ellipsis '…' at the end. Three text
   lines total in this headline block.

Sub line (bottom 16% of frame, just above the CTA, centered, smaller):
That's the creative we build at MANGO LAB, set in modern sans (Inter Tight
Medium 500, cream #EFEED6, ~26pt, centered). Render 'MANGO LAB' in bold
(weight 800).

CTA pill (very bottom 8% of frame, centered): white rounded pill button
approximately 320x72px, label 'Learn more' in coal-black Inter SemiBold ~28pt,
with a small mango-orange #FC5816 link/chain icon to the LEFT of the label
inside the pill.

No corner wordmark on this composition. The brand name lives inside the sub
line.

Hard constraints: only three colors, #FC5816 mango orange (used only on the
link icon), #000000 coal black (background), #EFEED6 rich cream (all type;
the white CTA pill is acceptable as the only pure-white element). NO navy.
NO gradients. Typography is modern sans + humanist serif italic, NOT Monument
Extended, NOT JetBrains Mono. Read order: 1) thumb macro hook, 2) headline
top, 3) sub bottom, 4) CTA. 1:1 square, 1024x1024 PNG.

Anti-bias rule: when the composition includes a human subject, do not default
to a single demographic for any role-coded term. If the brief specifies a
demographic explicitly, follow the brief; if it does not, assume diversity is
the default.
```

## Expected output

A 1024×1024 PNG matching the layout described. For a real production-finished version of this exact ad after the Stage B pass, see Appendix B of the Portfolio (Mango Lab live creative).

## Optional Stage B (refinement to 4K)

After Stage A, the production pipeline runs Stage B on `nano-banana-2` via kie.ai to upgrade photographic quality to 4K. Stage B is documented in `mango_prompts.json` (slug `ad1-thumb-stageB`) inside the Nano Bannana wraper repo. Stage A alone is enough to satisfy the "runnable LLM prompt" requirement for this assessment.

## Contact

For the actual brand assets (`mango_wordmark.png`, `ref_thumb.jpg`) used in production, or for an OpenAI key tied to the Mango Lab account: jeanlucandrenavarro@gmail.com
