import { AnimatePresence, motion, useDragControls } from 'motion/react';
import { ArrowRight, GripVertical, BarChart3, BookOpen, Compass, HelpCircle, LayoutDashboard, MessageCircle, MessageSquareHeart, Navigation, Sparkles, Trophy, Video, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { PublicUser } from '../../shared/types';
import { api } from '../lib/api';
import { useSession } from '../lib/session';
import OfficeHoursPage from '../components/OfficeHours';
import Shell, { type NavItem } from '../components/Shell';
import { Bar, Button, ErrorBox, IconButton, Loading, navigate, useRoute } from '../components/ui';
import Ask from './Ask';
import { LearnerContext, pickDefaultCourse, useLearner, type CourseItem, type HomeData, type LearnerCtx } from './context';
import Dashboard from './Dashboard';
import Explore from './Explore';
import FinalExam from './FinalExam';
import Learning from './Learning';
import Progress from './Progress';
import Feedback from './Feedback';
import FeedbackButton from './FeedbackButton';
import QuickTools from './QuickTools';
import SkillsPage from './SkillsPage';
import Study from './Study';
import { usePrefs } from './prefs';
import ReadabilityMenu, { FocusExitBar } from './ReadabilityMenu';
import FeatureTour, { tourSeen } from './Tour';
import Vault from './Vault';
import { actionPath } from './widgets';

const ACTIVE_KEY = 'usaii.lms.activeCourse';

export function LearnerProvider({ home, reload, learner, readOnly, initialCourseId, children }: { home: HomeData; reload: () => Promise<void>; learner: PublicUser; readOnly?: boolean; initialCourseId?: string; children: ReactNode }) {
  const [data, setData] = useState(home);
  useEffect(() => setData(home), [home]);
  const [activeId, setActive] = useState(() => {
    let saved = '';
    try {
      saved = readOnly ? (initialCourseId ?? '') : (localStorage.getItem(ACTIVE_KEY) ?? '');
    } catch {
      /* ignore */
    }
    return home.items.some((i) => i.course.id === saved) ? saved : pickDefaultCourse(home.items);
  });
  useEffect(() => {
    if (!home.items.some((i) => i.course.id === activeId)) setActive(pickDefaultCourse(home.items));
  }, [home.items, activeId]);
  const setActiveId = useCallback(
    (id: string) => {
      setActive(id);
      if (!readOnly)
        try {
          localStorage.setItem(ACTIVE_KEY, id);
        } catch {
          /* ignore */
        }
    },
    [readOnly],
  );
  const patchItem = useCallback((courseId: string, patch: Partial<Pick<CourseItem, 'enrollment' | 'snapshot'>>) => {
    setData((d) => ({ ...d, items: d.items.map((i) => (i.course.id === courseId ? { ...i, ...patch } : i)) }));
  }, []);
  const value: LearnerCtx = useMemo(
    () => ({ home: data, reload, activeId, setActiveId, active: data.items.find((i) => i.course.id === activeId), patchItem, learner, readOnly }),
    [data, reload, activeId, setActiveId, patchItem, learner, readOnly],
  );
  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>;
}

function WhatsNext({ item }: { item: CourseItem }) {
  const [open, setOpen] = useState(false);
  const controls = useDragControls();
  const ns = item.snapshot.nextStep;
  return (
    <motion.div drag dragControls={controls} dragListener={false} dragMomentum={false} dragConstraints={{ left: -(typeof window !== 'undefined' ? window.innerWidth - 220 : 800), right: 0, top: -(typeof window !== 'undefined' ? window.innerHeight - 120 : 600), bottom: 0 }} className="no-print fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.95 }} className="absolute bottom-16 right-0 w-[min(320px,calc(100vw-40px))]">
            <div className="beam">
              <div className="beam-inner p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-npurple">Your next step</span>
                  <button aria-label="Close" onClick={() => setOpen(false)} className="text-ink-faint hover:text-ink">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 font-display text-lg font-bold leading-snug">{ns.title}</div>
                <div className="text-xs text-ink-faint">
                  {ns.where}
                  {ns.minutes ? `, about ${ns.minutes} min` : ''}
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-ink-soft">
                  <Bar value={item.snapshot.completion.percent} height={6} />
                  <span className="shrink-0">{item.snapshot.completion.percent}%</span>
                </div>
                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setOpen(false);
                    navigate(actionPath(ns.action));
                  }}
                >
                  {ns.label} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex h-14 items-center rounded-full bg-gradient-to-r from-nblue via-npurple to-npink text-white shadow-xl shadow-npurple/40">
        <span onPointerDown={(e) => controls.start(e)} className="flex h-full cursor-grab touch-none items-center pl-3 pr-1 text-white/70 active:cursor-grabbing" title="Drag to move" aria-hidden>
          <GripVertical className="h-5 w-5" />
        </span>
        <motion.button whileTap={{ scale: 0.95 }} onClick={() => setOpen((o) => !o)} className="flex h-full items-center gap-2 pl-1 pr-5 font-semibold" aria-expanded={open}>
          <Navigation className="h-5 w-5" /> What’s next
        </motion.button>
      </div>
    </motion.div>
  );
}

function Routes() {
  const { view, params, query } = useRoute();
  const { home, active } = useLearner();
  const { focus } = usePrefs();
  const [tour, setTour] = useState(() => !tourSeen());
  const unread = useMemo(() => {
    return home.items.filter((i) => i.snapshot.nextStep.action.kind === 'thread').length;
  }, [home]);
  const v = view || 'dashboard';
  const courses = home.items.map((i) => ({ id: i.course.id, title: i.course.title }));

  let page: ReactNode;
  switch (v) {
    case 'learning':
      page = <Learning />;
      break;
    case 'study':
      page = <Study courseId={params[0] ?? ''} lessonId={params[1] ?? ''} initialStep={query.get('step') ?? undefined} autoListen={query.get('listen') === '1'} />;
      break;
    case 'final':
      page = <FinalExam courseId={params[0] ?? ''} />;
      break;
    case 'progress':
      page = <Progress />;
      break;
    case 'explore':
      page = <Explore />;
      break;
    case 'ask':
      page = <Ask threadId={params[0]} query={query} />;
      break;
    case 'messages':
      page = <Ask query={new URLSearchParams('tab=messages')} />;
      break;
    case 'live-sessions':
    case 'office-hours':
      page = <OfficeHoursPage courses={courses} />;
      break;
    case 'feedback':
      page = <Feedback />;
      break;
    case 'tools':
      page = <QuickTools />;
      break;
    case 'skills':
      page = active ? <SkillsPage item={active} /> : <Dashboard />;
      break;
    case 'vault':
    case 'credential':
      page = <Vault initialTab={query.get('tab') ?? undefined} />;
      break;
    default:
      page = <Dashboard />;
  }

  const nav: NavItem[] = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'learning', label: 'Learning', icon: BookOpen, also: ['study', 'final'] },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'explore', label: 'Explore Courses', icon: Compass },
    { id: 'ask', label: 'Ask', icon: MessageCircle, badge: unread, also: ['messages'] },
    { id: 'live-sessions', label: 'Live Sessions', icon: Video, also: ['office-hours'] },
  ];
  const secondary: NavItem[] = [
    { id: 'feedback', label: 'Give Feedback', icon: MessageSquareHeart },
    { id: 'tools', label: 'Quick Tools', icon: Sparkles, also: ['skills'] },
    { id: 'vault', label: 'Milestone Vault', icon: Trophy, also: ['credential'] },
  ];
  const showFab = !focus && !!active && !['dashboard', ''].includes(view) && v !== 'study' && v !== 'final' && !active.snapshot.credentialEarned;

  return (
    <>
      <Shell
        nav={nav}
        secondary={secondary}
        current={v}
        focus={focus}
        headerExtra={
          <IconButton label="What's new: a one-minute tour" onClick={() => setTour(true)}>
            <HelpCircle className="h-5 w-5" />
          </IconButton>
        }
        floating={
          <>
            {showFab && active && <WhatsNext item={active} />}
            {!focus && <FeedbackButton />}
            <ReadabilityMenu />
            <FocusExitBar />
          </>
        }
      >
        {page}
      </Shell>
      <FeatureTour open={tour} onClose={() => setTour(false)} />
    </>
  );
}

// Route-level params that pick the course should also switch the active course.
function CourseSync() {
  const { view, params, query } = useRoute();
  const { setActiveId, activeId, home } = useLearner();
  useEffect(() => {
    const id = ['study', 'final', 'progress', 'learning', 'credential', 'vault'].includes(view) ? params[0] : query.get('course') ?? undefined;
    if (id && id !== activeId && home.items.some((i) => i.course.id === id)) setActiveId(id);
  }, [view, params, query, activeId, setActiveId, home.items]);
  return null;
}

export default function LearnerApp() {
  const { user } = useSession();
  const [home, setHome] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    try {
      setError(null);
      setHome(await api<HomeData>('/learner/home'));
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    void load();
    const on = () => void load();
    window.addEventListener('lms:reload-home', on);
    return () => window.removeEventListener('lms:reload-home', on);
  }, [load]);
  // Refresh analytics when the learner navigates between top-level pages (keeps numbers honest).
  const { view } = useRoute();
  useEffect(() => {
    if (home && ['dashboard', 'progress', 'learning', ''].includes(view)) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  if (error && !home) return <ErrorBox message={error} onRetry={() => void load()} />;
  if (!home) return <Loading label="Preparing your next step…" />;
  return (
    <LearnerProvider home={home} reload={load} learner={user}>
      <CourseSync />
      <Routes />
    </LearnerProvider>
  );
}
