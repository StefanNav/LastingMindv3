export type PhaseId = 'foundation' | 'story' | 'legacy'

export type CategoryStatus = 'locked' | 'not_started' | 'started' | 'growing' | 'budding' | 'flourishing'

export interface Category {
  id: string
  title: string
  image: string
  imageHeight?: number
  imageWidth?: number
  status: CategoryStatus
  currentModule?: number
  totalModules: number
}

export interface HomePhase {
  id: string
  title: string
  label: string
  categories: Category[]
}

export interface Phase {
  id: PhaseId
  title: string
  description: string
  modules: Module[]
}

export interface Module {
  id: string
  phaseId: PhaseId
  title: string
  description: string
  prompts: Prompt[]
  completed: boolean
}

export interface Prompt {
  id: string
  moduleId: string
  text: string
  category: string
  completed: boolean
}

export interface Story {
  id: string
  moduleId: string
  promptId: string
  title: string
  content: string
  createdAt: string
  mediaType: 'text' | 'voice' | 'video'
}

export interface FamilyMember {
  id: string
  name: string
  relationship: string
  avatar?: string
}

export interface LegacyCreator {
  id: string
  name: string
  avatar?: string
  dateOfBirth: string
  familyMembers: FamilyMember[]
  currentPhase: PhaseId
  completedModules: string[]
  stories: Story[]
  treeGrowthLevel: number
}

export interface CategoryModule {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  locked: boolean
}

export interface RecentEntry {
  id: string
  memberInitial: string
  memberName: string
  title: string
  snippet: string
  date: string
}

export interface GrowthAction {
  id: string
  label: string
}

export interface CategorySheetMember {
  id: string
  initial: string
  name: string
  entryCount: number
}

export interface CategoryDetail {
  categoryId: string
  heading: string
  subtitle?: string
  modules: CategoryModule[]
  familyMembers?: CategorySheetMember[]
  recentEntries?: RecentEntry[]
  growthActions?: GrowthAction[]
  entriesComplete?: number
  entriesToNextStar?: number
}

export interface ModuleIntroData {
  categoryId: string
  categoryLabel: string
  image: string
  imageHeight: number
  moduleTitle: string
  description: string
}

export interface Module2IntroOption {
  id: string
  label: string
  subtitle?: string
}

export interface FamilyWebMember {
  id: string
  firstName: string
  lastName: string
  relationship: string
  proximity: 'immediate' | 'extended'
  entryCount?: number
}

export interface Module2IntroData {
  categoryId: string
  categoryLabel: string
  image: string
  imageWidth: number
  moduleTitle: string
  description: string
  selectionType: 'chips' | 'radio-cards' | 'web'
  disabledButtonText: string
  options: Module2IntroOption[]
  webMembers?: FamilyWebMember[]
}

export interface AppState {
  creator: LegacyCreator
  phases: Phase[]
  currentPrompt: Prompt | null
  isSessionActive: boolean
}

export interface ConversationQuestion {
  id: string
  promptText: string
  mockUserResponse: string
  mockAiAcknowledgment: string
}

export interface ConversationSummaryItem {
  id: string
  name: string
  label: string
}

export interface ConversationConfig {
  categoryId: string
  moduleId: string
  moduleTitle: string
  questions: ConversationQuestion[]
  summaryHeading: string
  summaryListLabel: string
  summaryAddLabel: string
  summaryItems: ConversationSummaryItem[]
  finishMessages: string[]
}

export type ConversationStep =
  | 'question'
  | 'recording'
  | 'transcription'
  | 'ai_thinking'
  | 'finish'
  | 'summary'

export type ConversationInputMode = 'voice' | 'text'

export type DemoStateId = 'state-0' | 'flow-1' | 'flow-2' | 'flow-3' | 'onboarding'

export interface DemoPromptCard {
  categoryTag: string
  question: string
}

export interface DemoConfig {
  id: DemoStateId
  label: string
  foundationStars: number
  treeImage: string
  promptCard: DemoPromptCard
  homePhases: HomePhase[]
  categoryDetails: Record<string, CategoryDetail>
}

export interface ModuleCompletionState {
  categoryId: string
  moduleNumber: 1 | 2
  moduleTitle: string
  categoryLabel: string
  starEarned: boolean
  totalStars: number
  totalStarsNeeded: number
}

export interface ReflectionQuestion {
  id: string
  categoryLabel: string
  promptText: string
  mockUserResponse: string
}

export interface ReflectionConfig {
  categoryId: string
  moduleId: string
  moduleTitle: string
  subjectName: string
  subjectRelation: string
  questions: ReflectionQuestion[]
  openReflectionMessage: string
  summaryHeading: string
}

export type ReflectionStep =
  | 'prompt_select'
  | 'reflect'
  | 'recording'
  | 'transcription'
  | 'ai_thinking'
  | 'confirm_transcript'
  | 'summary'

export type ReflectionMethod = 'guided' | 'open'
