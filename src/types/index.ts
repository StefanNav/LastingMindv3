export type PhaseId = 'foundation' | 'story' | 'legacy'

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

export interface AppState {
  creator: LegacyCreator
  phases: Phase[]
  currentPrompt: Prompt | null
  isSessionActive: boolean
}
