import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AppState } from '@/types'
import { mockCreator, mockPhases } from '@/data/mock'

interface AppContextValue {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const AppContext = createContext<AppContextValue | null>(null)

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    creator: mockCreator,
    phases: mockPhases,
    currentPrompt: null,
    isSessionActive: false,
  })

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  )
}
