export type PhaseId = 'foundation' | 'story' | 'legacy'

export type CategoryStatus = 'locked' | 'not_started' | 'growing' | 'budding' | 'flourishing'

export interface Category {
  id: string
  title: string
  image: string
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

export interface AppState {
  creator: LegacyCreator
  phases: Phase[]
  currentPrompt: Prompt | null
  isSessionActive: boolean
}
