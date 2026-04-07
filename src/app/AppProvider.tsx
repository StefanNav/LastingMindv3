import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import type { AppState, DemoStateId, DemoConfig, DemoPromptCard, HomePhase, CategoryDetail, LifeChapter, ChatMessage } from '@/types'
import { mockCreator, mockPhases } from '@/data/mock'
import { demoStates, demoStateOrder } from '@/data/demoStates'

interface AppContextValue {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
  // Demo mode
  activeDemoId: DemoStateId
  setDemoState: (id: DemoStateId) => void
  onboardingKey: number
  demoConfig: DemoConfig
  homePhases: HomePhase[]
  categoryDetails: Record<string, CategoryDetail>
  promptCard: DemoPromptCard
  foundationStars: number
  streak: number
  treeImage: string
  demoStateOrder: DemoStateId[]
  hasCompletedFirstModule: boolean
  markFirstModuleComplete: () => void
  module2Runs: Record<string, number>
  incrementModule2Run: (categoryId: string) => void
  module1Completions: Record<string, boolean>
  markModule1Complete: (categoryId: string) => void
  lifeChapters: LifeChapter[]
  saveLifeChapters: (chapters: LifeChapter[]) => void
  hasDefinedChapters: boolean
  chatFirstTimeExperience: boolean
  setChatFirstTimeComplete: () => void
  chatMessages: ChatMessage[]
  addChatMessage: (msg: ChatMessage) => void
  clearChatMessages: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

const DEFAULT_DEMO: DemoStateId = 'state-0'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    creator: mockCreator,
    phases: mockPhases,
    currentPrompt: null,
    isSessionActive: false,
  })

  const [activeDemoId, setActiveDemoId] = useState<DemoStateId>(DEFAULT_DEMO)
  const [onboardingKey, setOnboardingKey] = useState(0)
  const [hasCompletedFirstModule, setHasCompletedFirstModule] = useState(false)
  const [module2Runs, setModule2Runs] = useState<Record<string, number>>({})
  const [module1Completions, setModule1Completions] = useState<Record<string, boolean>>({})
  const [lifeChapters, setLifeChapters] = useState<LifeChapter[]>([])
  const [chatFirstTimeExperience, setChatFirstTimeExperience] = useState(true)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  const saveLifeChapters = (chapters: LifeChapter[]) => setLifeChapters(chapters)
  const hasDefinedChapters = lifeChapters.length > 0

  const setChatFirstTimeComplete = () => setChatFirstTimeExperience(false)
  const addChatMessage = (msg: ChatMessage) => setChatMessages((prev) => [...prev, msg])
  const clearChatMessages = () => setChatMessages([])

  const markFirstModuleComplete = () => setHasCompletedFirstModule(true)
  const incrementModule2Run = (categoryId: string) =>
    setModule2Runs((prev) => ({ ...prev, [categoryId]: (prev[categoryId] ?? 0) + 1 }))
  const markModule1Complete = (categoryId: string) =>
    setModule1Completions((prev) => ({ ...prev, [categoryId]: true }))

  const demoConfig = demoStates[activeDemoId]

  const setDemoState = (id: DemoStateId) => {
    setActiveDemoId(id)
    if (id === 'onboarding') {
      setOnboardingKey((k) => k + 1)
    }
    // Reset chat state on demo switch so tutorial replays correctly
    setChatFirstTimeExperience(true)
    setChatMessages([])
  }

  const value = useMemo<AppContextValue>(() => ({
    state,
    setState,
    activeDemoId,
    setDemoState,
    onboardingKey,
    demoConfig,
    homePhases: demoConfig.homePhases,
    categoryDetails: demoConfig.categoryDetails,
    promptCard: demoConfig.promptCard,
    foundationStars: demoConfig.foundationStars,
    streak: demoConfig.streak,
    treeImage: demoConfig.treeImage,
    demoStateOrder,
    hasCompletedFirstModule,
    markFirstModuleComplete,
    module2Runs,
    incrementModule2Run,
    module1Completions,
    markModule1Complete,
    lifeChapters,
    saveLifeChapters,
    hasDefinedChapters,
    chatFirstTimeExperience,
    setChatFirstTimeComplete,
    chatMessages,
    addChatMessage,
    clearChatMessages,
  }), [state, activeDemoId, onboardingKey, demoConfig, hasCompletedFirstModule, module2Runs, module1Completions, lifeChapters, chatFirstTimeExperience, chatMessages])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
