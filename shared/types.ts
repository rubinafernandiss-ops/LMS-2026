// Shared domain model for the USAII Intuitive LMS.
// Used by both the Express API (server/) and the React client (src/).

export type Role = 'learner' | 'instructor' | 'admin';

export interface LearningGoal {
  statement: string; // "What do I want to be able to do?" (heutagogy: learner-defined)
  why: string; // personal relevance (andragogy)
  minutesPerDay: number;
  daysPerWeek: number;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  active: boolean;
  createdAt: string;
  onboarded: boolean;
  mustChangePassword: boolean;
  goal?: LearningGoal;
  learnMode?: LearnMode;
}

export interface UserRecord extends PublicUser {
  passwordHash: string;
  salt: string;
}

export type LearnMode = 'read' | 'watch' | 'listen' | 'do';

/* ---------------- Course content ---------------- */

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'text'
  | 'video'
  | 'audio'
  | 'image'
  | 'quote'
  | 'list'
  | 'link';

export interface ContentBlock {
  id: string;
  type: BlockType;
  text?: string; // heading / paragraph / text / quote / caption
  level?: 2 | 3; // heading level
  tone?: 'info' | 'tip'; // text callout tone (calm by design)
  url?: string; // media / link / image
  label?: string; // link label, media title
  attribution?: string; // quote
  items?: string[]; // list
  ordered?: boolean; // list
  transcript?: string; // video / audio transcript
}

export interface CheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
}

export interface ActivityField {
  id: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  placeholder?: string;
}

export interface LessonActivity {
  title: string;
  instructions: string[];
  fields: ActivityField[];
  allowFile: boolean;
}

export interface CheckSettings {
  mode: 'practice' | 'quiz'; // practice = retakes + instant feedback; quiz = timed, limited attempts
  timeLimitMin: number; // 0 = untimed
  attemptsAllowed: number; // 0 = unlimited
}

export interface Lesson {
  id: string;
  title: string;
  topic: string; // the concept / skill this lesson builds (mastery unit)
  estimatedMinutes: number;
  summary: string;
  blocks: ContentBlock[];
  check: CheckQuestion[];
  checkSettings: CheckSettings;
  activity?: LessonActivity;
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface FinalExam {
  questions: CheckQuestion[];
  timeLimitMin: number;
  attemptsAllowed: number;
}

export interface GradingWeights {
  checks: number; // % (Check Your Understanding / module quizzes)
  activities: number; // %
  finalExam: number; // %
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  credentialName: string;
  durationLabel: string;
  level: string;
  price: number; // USD; micro-credentials stay under $50
  access: 'open' | 'invite';
  status: 'draft' | 'published';
  accent: 'blue' | 'purple' | 'pink' | 'green';
  coverImage?: string;
  /** A PDF the instructor uploads so learners can read the plan for the course. */
  studyPlan?: { url: string; name: string };
  passMark: number; // %
  grading: GradingWeights;
  modules: CourseModule[];
  finalExam?: FinalExam;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

/* ---------------- Learner records ---------------- */

export type LessonStatus = 'not_started' | 'in_progress' | 'done';

export interface CheckAttempt {
  at: string;
  score: number; // %
  answers: number[];
  kind: 'check' | 'review';
}

export interface ActivitySubmission {
  fields: Record<string, string>;
  fileUrl?: string;
  fileName?: string;
  submittedAt: string;
  feedback?: string;
  feedbackBy?: string;
  feedbackAt?: string;
}

export interface LessonProgress {
  status: LessonStatus;
  startedAt?: string;
  completedAt?: string;
  activeSeconds: number;
  attempts: CheckAttempt[];
  activity?: ActivitySubmission;
  selfConfidence?: number; // 1-5, learner's own estimate (calibration)
  reflection?: string; // double-loop reflection (heutagogy)
  lastReviewedAt?: string;
  quizStartedAt?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  grantedBy?: string;
  lessons: Record<string, LessonProgress>;
  finalExam?: { attempts: CheckAttempt[]; startedAt?: string };
  certificateId?: string;
  certificateIssuedAt?: string;
  targetDate?: string; // learner-chosen finish date
  /** Personal guidance written by the instructor who owns this course. */
  guidance?: InstructorGuidance;
}

/** A short, personal note from the instructor: what to do next, and what to work on. */
export interface InstructorGuidance {
  nextStep: string;
  workOn: string;
  byName: string;
  byId: string;
  updatedAt: string;
}

export type ActivityEventType =
  | 'login'
  | 'study'
  | 'check'
  | 'activity'
  | 'post'
  | 'reply'
  | 'attend'
  | 'final';

export interface ActivityEvent {
  id: string;
  userId: string;
  courseId?: string;
  type: ActivityEventType;
  at: string;
  seconds?: number; // for 'study' heartbeats
}

/* ---------------- Community / support ---------------- */

export interface Reply {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  text: string;
  createdAt: string;
  likes: string[];
}

export interface Thread {
  id: string;
  courseId: string;
  lessonId?: string;
  lessonTitle?: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  audience: 'everyone' | 'instructor';
  title: string;
  body: string;
  createdAt: string;
  likes: string[];
  replies: Reply[];
  readBy: string[]; // users who have seen latest reply
}

export interface OfficeHour {
  id: string;
  courseId: string | 'all';
  title: string;
  host: string;
  startsAt: string; // ISO
  durationMin: number;
  joinUrl: string;
  recordingUrl?: string;
  registered: string[];
  attended: string[];
  /** A Live Learning session invites named learners; office hours invite a whole course. */
  kind?: 'help' | 'learning';
  invited?: string[];
  createdBy?: string;
  createdByName?: string;
  lastReminderAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  key?: string; // de-duplication key for generated nudges
  kind: 'reply' | 'message' | 'nudge' | 'access' | 'office_hours' | 'feedback' | 'credential';
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  link?: { view: string; courseId?: string; lessonId?: string; threadId?: string };
}

export interface DirectMessage {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  subject: string;
  body: string;
  createdAt: string;
}

export interface FeedbackEntry {
  id: string;
  userId: string;
  recommend: boolean; // would you recommend this course? yes / no
  ease: number; // 1-5 "how easy was it to know the next step?"
  comment: string;
  createdAt: string;
  /** Star ratings: 'course' rates one course, 'platform' rates the USAII LMS itself. */
  kind?: 'course' | 'platform' | 'recommend';
  courseId?: string;
  stars?: number;
}

export interface AuditEntry {
  id: string;
  at: string;
  actorId: string;
  actorName: string;
  role: Role;
  action: string;
  details: string;
}

export interface Database {
  version: number;
  users: UserRecord[];
  courses: Course[];
  enrollments: Enrollment[];
  events: ActivityEvent[];
  threads: Thread[];
  officeHours: OfficeHour[];
  notifications: Notification[];
  messages: DirectMessage[];
  feedback: FeedbackEntry[];
  audit: AuditEntry[];
}

/* ---------------- Computed analytics ---------------- */

export type MasteryState = 'Not started' | 'Seen' | 'Practicing' | 'Developing' | 'Solid' | 'Mastered';

export interface TopicMastery {
  lessonId: string;
  moduleId: string;
  lessonTitle: string;
  topic: string;
  score: number; // 0-100
  state: MasteryState;
  bestCheck: number | null;
  firstCheck: number | null;
  selfConfidence?: number;
  calibration?: 'accurate' | 'over' | 'under';
  reviewDue: boolean;
}

export interface EngagementMetrics {
  loginsLast7: number;
  loginDaysLast7: number;
  activeDaysLast7: number;
  activeMinutesLast7: number;
  avgSessionMinutes: number;
  totalActiveMinutes: number;
  daily: { date: string; minutes: number; login: boolean }[]; // last 14 days
  checksTaken: number;
  activitiesSubmitted: number;
  posts: number;
  sessionsOffered: number;
  sessionsAttended: number;
  attendanceRate: number | null; // %
  engagementScore: number; // 0-100
  streak: number;
}

export interface GradePrediction {
  currentGrade: number | null; // % from completed graded work
  predictedGrade: number; // %
  predictedLetter: string;
  passConfidence: number; // %
  avgCheckScore: number | null;
  avgQuizFirstAttempt: number | null;
  comprehension: number | null; // first-attempt understanding
  finalExamScore: number | null;
  evidence: 'none' | 'early' | 'solid'; // how much graded evidence backs the prediction
  breakdown: { label: string; weight: number; score: number | null }[];
}

export interface CompletionEstimate {
  lessonsDone: number;
  lessonsTotal: number;
  percent: number;
  minutesRemaining: number;
  minutesPerWeek: number; // observed or planned pace
  paceSource: 'observed' | 'goal' | 'default';
  weeksRemaining: number;
  estimatedDate: string | null; // ISO date
  finalExamDone: boolean;
}

export interface Recommendation {
  id: string;
  priority: 'now' | 'soon' | 'later';
  title: string;
  detail: string;
  minutes: number;
  action: NextAction;
}

export interface NextAction {
  kind: 'lesson' | 'review' | 'check' | 'activity' | 'final' | 'credential' | 'thread' | 'browse' | 'office_hours';
  courseId?: string;
  lessonId?: string;
  threadId?: string;
}

export interface NextStep {
  title: string;
  reason: string;
  minutes: number;
  label: string;
  action: NextAction;
  where: string; // "Module 2 · Lesson 3"
}

export interface RiskFactor {
  label: string;
  severity: 'low' | 'medium' | 'high';
}

export interface LearnerSnapshot {
  courseId: string;
  engagement: EngagementMetrics;
  prediction: GradePrediction;
  completion: CompletionEstimate;
  mastery: TopicMastery[];
  weakAreas: TopicMastery[];
  recommendations: Recommendation[];
  nextStep: NextStep;
  risk: { needsSupport: boolean; factors: RiskFactor[] };
  eligibleForFinal: boolean;
  credentialEarned: boolean;
}
