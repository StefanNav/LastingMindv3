import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import type { AppState, DemoStateId, DemoConfig, DemoPromptCard, HomePhase, CategoryDetail } from '@/types'
import { mockCreator, mockPhases } from '@/data/mock'
import { demoStates, demoStateOrder } from '@/data/demoStates'

interface AppContextValue {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
  // Demo mode
  activeDemoId: DemoStateId
  setDemoState: (id: DemoStateId) => void
  demoConfig: DemoConfig
  homePhases: HomePhase[]
  categoryDetails: Record<string, CategoryDetail>
  promptCard: DemoPromptCard
  foundationStars: number
  treeImage: string
  demoStateOrder: DemoStateId[]
}

const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

const DEFAULT_DEMO: DemoStateId = 'flow-3'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    creator: mockCreator,
    phases: mockPhases,
    currentPrompt: null,
    isSessionActive: false,
  })

  const [activeDemoId, setActiveDemoId] = useState<DemoStateId>(DEFAULT_DEMO)

  const demoConfig = demoStates[activeDemoId]

  const setDemoState = (id: DemoStateId) => {
    setActiveDemoId(id)
  }

  const value = useMemo<AppContextValue>(() => ({
    state,
    setState,
    activeDemoId,
    setDemoState,
    demoConfig,
    homePhases: demoConfig.homePhases,
    categoryDetails: demoConfig.categoryDetails,
    promptCard: demoConfig.promptCard,
    foundationStars: demoConfig.foundationStars,
    treeImage: demoConfig.treeImage,
    demoStateOrder,
  }), [state, activeDemoId, demoConfig])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
