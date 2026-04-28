import { SignInPage, type Testimonial } from './ui/sign-in';
import { data } from '../data/modules';
import { daysBetween, today } from '../lib/utils';

interface LandingProps {
  onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
  const daysLeft = daysBetween(today(), data.deadline);
  const moduleCount = data.modules.length;
  const totalEcts = data.modules.reduce((sum, m) => sum + m.ects, 0);

  // Stand-in "testimonials" — these are the live status chips for the user.
  const stats: Testimonial[] = [
    {
      avatarSrc: `https://api.dicebear.com/9.x/glass/svg?seed=deadline&backgroundColor=8b5cf6,ec4899`,
      name: `${daysLeft} days left`,
      handle: `until ${data.deadline}`,
      text: 'All hand-ins due. Oral exams spread around. Time to lock in.',
    },
    {
      avatarSrc: `https://api.dicebear.com/9.x/glass/svg?seed=modules&backgroundColor=38bdf8,a78bfa`,
      name: `${moduleCount} modules`,
      handle: `${totalEcts} ECTS in scope`,
      text: 'Product Discovery, Marketing & Sales, Startup, AI in Design, and four more.',
    },
    {
      avatarSrc: `https://api.dicebear.com/9.x/glass/svg?seed=mango&backgroundColor=fcd34d,f472b6`,
      name: 'Mango Lab → Still',
      handle: '@thread of work',
      text: 'The same ad-creative agency anchors PM_16, PM_22, PM_23 and PM_18.',
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEnter();
  };

  return (
    <SignInPage
      title={
        <>
          <span className="font-light tracking-tighter">SS26</span>{' '}
          <span className="font-semibold bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Hand-In Hub
          </span>
        </>
      }
      description={
        <>
          Welcome back, <span className="text-foreground font-medium">{data.student}</span>. One place for all eight modules,
          every deliverable, every deadline. Press{' '}
          <span className="text-violet-300 font-medium">Enter the Hub</span> to continue.
        </>
      }
      heroImageSrc="https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?w=2160&q=80&auto=format"
      testimonials={stats}
      onSignIn={handleSubmit}
      onResetPassword={() => alert(`Hand-in deadline: ${data.deadline} — that's ${daysLeft} days from today.`)}
      submitLabel="Enter the Hub →"
      hideAuthExtras
    />
  );
}
