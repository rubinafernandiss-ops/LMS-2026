import { motion } from 'motion/react';
import { ALargeSmall, ArrowRight, Focus, GitBranch, Headphones, Layers, Sparkles, Trophy } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button, cx, Modal, navigate } from '../components/ui';

const TOUR_KEY = 'usaii.lms.tour.v5';

export const tourSeen = () => {
  try {
    return localStorage.getItem(TOUR_KEY) === '1';
  } catch {
    return true;
  }
};
export const markTourSeen = () => {
  try {
    localStorage.setItem(TOUR_KEY, '1');
  } catch {
    /* ignore */
  }
};

interface Step {
  icon: ReactNode;
  color: string;
  title: string;
  what: string;
  where: string;
  go?: { label: string; path: string };
}

const STEPS: Step[] = [
  {
    icon: <Sparkles className="h-7 w-7" />,
    color: '#8B3DFF',
    title: 'Six new ways to learn your way',
    what: 'Read, listen, watch or revise: the course now bends to fit how you like to study.',
    where: 'Takes about a minute. You can reopen this tour anytime from the “?” button at the top right.',
  },
  {
    icon: <Focus className="h-7 w-7" />,
    color: '#1F6BFF',
    title: 'Focus Mode',
    what: 'Hides the menu, the alerts and everything else. Just you and the lesson.',
    where: 'One click on “Focus” at the top of a lesson, or in the Reading button. Press Esc to come back.',
  },
  {
    icon: <Headphones className="h-7 w-7" />,
    color: '#00C77F',
    title: 'Audio-First Player',
    what: 'Turns the written lesson into audio so you can learn while you walk, drive or cook. Choose the speed.',
    where: 'Press “Listen” at the top of any lesson.',
  },
  {
    icon: <Layers className="h-7 w-7" />,
    color: '#FF2E93',
    title: 'Knowledge Cards',
    what: 'Quick flip cards right after a video or a section, so what you just learned actually sticks.',
    where: 'They appear inside the lesson. Swipe them, or use the arrow keys. Never graded.',
  },
  {
    icon: <GitBranch className="h-7 w-7" />,
    color: '#00C2FF',
    title: 'Skill Tree',
    what: 'Every skill you have already acquired in a course, collected in one place as proof of what you can now do.',
    where: 'At the top of the Learning page, above your lessons.',
    go: { label: 'Open my skills', path: 'learning' },
  },
  {
    icon: <Trophy className="h-7 w-7" />,
    color: '#7A2FF0',
    title: 'Milestone Vault',
    what: 'Certifications, digital badges and every piece of project work you have made, in one place.',
    where: 'In the left menu, under Milestone Vault.',
    go: { label: 'Open my vault', path: 'vault' },
  },
  {
    icon: <ALargeSmall className="h-7 w-7" />,
    color: '#E0197A',
    title: 'Readability Controls',
    what: 'Bigger text, dark mode, or a dyslexia-friendly font. Set it once; we remember it.',
    where: 'The “Reading” button floats at the bottom left of every page.',
  },
];

/** A short, skippable walkthrough. Plain words, one idea per screen. */
export default function FeatureTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  const last = i === STEPS.length - 1;

  const finish = () => {
    markTourSeen();
    setI(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={finish}
      title="What's new for you"
      footer={
        <div className="flex w-full items-center justify-between gap-3">
          <button onClick={finish} className="text-sm font-semibold text-ink-faint hover:text-ink">
            {last ? 'Close' : 'Skip the tour'}
          </button>
          <div className="flex gap-2">
            {i > 0 && (
              <Button variant="secondary" onClick={() => setI((v) => v - 1)}>
                Back
              </Button>
            )}
            <Button onClick={() => (last ? finish() : setI((v) => v + 1))}>
              {last ? 'Start learning' : 'Next'} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      }
    >
      <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', damping: 24, stiffness: 300 }}>
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)` }}>
            {s.icon}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{s.what}</p>
            <p className="mt-2 rounded-2xl bg-mist px-3.5 py-2.5 text-[13px] text-ink-soft">{s.where}</p>
            {s.go && (
              <Button
                size="sm"
                variant="secondary"
                className="mt-3"
                onClick={() => {
                  navigate(s.go!.path);
                  finish();
                }}
              >
                {s.go.label}
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {STEPS.map((_, n) => (
          <button key={n} aria-label={`Step ${n + 1}`} onClick={() => setI(n)} className={cx('h-1.5 rounded-full transition-all', n === i ? 'w-7 bg-gradient-to-r from-nblue to-npurple' : 'w-1.5 bg-line hover:bg-ink-faint')} />
        ))}
      </div>
    </Modal>
  );
}
