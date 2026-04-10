import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from 'react'
import type { AppState, DemoStateId, DemoConfig, DemoPromptCard, HomePhase, CategoryDetail, LifeChapter, ChatMessage, LegacyItemStatus, UserState, AudienceMember } from '@/types'
import { mockCreator, mockPhases } from '@/data/mock'
import { demoStates, demoStateOrder } from '@/data/demoStates'
import { defaultAudienceMembers } from '@/data/inviteData'

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
  promptCards: DemoPromptCard[]
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
  addedLegacyItemIds: string[]
  addLegacyItem: (id: string) => void
  legacyItemStatuses: Record<string, LegacyItemStatus>
  updateLegacyItemStatus: (id: string, status: LegacyItemStatus) => void
  // Audience state
  hasInviteToken: boolean
  setHasInviteToken: (v: boolean) => void
  userState: UserState
  setUserState: (s: UserState) => void
  audienceCreatorName: string
  setAudienceCreatorName: (name: string) => void
  hasSeenAudienceWelcome: boolean
  setHasSeenAudienceWelcome: (v: boolean) => void
  audienceMembers: AudienceMember[]
  addAudienceMember: (member: AudienceMember) => void
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
  const [addedLegacyItemIds, setAddedLegacyItemIds] = useState<string[]>([])
  const [legacyItemStatuses, setLegacyItemStatuses] = useState<Record<string, LegacyItemStatus>>({})

  // Audience state
  const [hasInviteToken, setHasInviteToken] = useState(false)
  const [userState, setUserState] = useState<UserState>('creator')
  const [audienceCreatorName, setAudienceCreatorName] = useState('Robert Mitchell')
  const [hasSeenAudienceWelcome, setHasSeenAudienceWelcome] = useState(false)
  const [audienceMembers, setAudienceMembers] = useState<AudienceMember[]>(defaultAudienceMembers)

  // Simulate invite deep link via ?invite=true URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('invite') === 'true') {
      setHasInviteToken(true)
      const name = params.get('creator') || 'Robert Mitchell'
      setAudienceCreatorName(name)
    }
  }, [])

  const saveLifeChapters = (chapters: LifeChapter[]) => setLifeChapters(chapters)
  const hasDefinedChapters = lifeChapters.length > 0

  const setChatFirstTimeComplete = () => setChatFirstTimeExperience(false)
  const addChatMessage = (msg: ChatMessage) => setChatMessages((prev) => [...prev, msg])
  const clearChatMessages = () => setChatMessages([])

  const addLegacyItem = (id: string) => {
    setAddedLegacyItemIds((prev) => prev.includes(id) ? prev : [...prev, id])
    setLegacyItemStatuses((prev) => ({ ...prev, [id]: prev[id] ?? 'not_started' }))
  }
  const updateLegacyItemStatus = (id: string, status: LegacyItemStatus) =>
    setLegacyItemStatuses((prev) => ({ ...prev, [id]: status }))

  const addAudienceMember = (member: AudienceMember) =>
    setAudienceMembers((prev) => [...prev, member])

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
    if (id === 'audience') {
      setUserState('audience')
      setHasInviteToken(true)
      setHasSeenAudienceWelcome(false)
    } else {
      setUserState('creator')
    }
    // Reset chat state on demo switch so tutorial replays correctly
    setChatFirstTimeExperience(true)
    setChatMessages([])
    setAddedLegacyItemIds([])
    setLegacyItemStatuses({})
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
    promptCards: demoConfig.promptCards,
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
    addedLegacyItemIds,
    addLegacyItem,
    legacyItemStatuses,
    updateLegacyItemStatus,
    hasInviteToken,
    setHasInviteToken,
    userState,
    setUserState,
    audienceCreatorName,
    setAudienceCreatorName,
    hasSeenAudienceWelcome,
    setHasSeenAudienceWelcome,
    audienceMembers,
    addAudienceMember,
  }), [state, activeDemoId, onboardingKey, demoConfig, hasCompletedFirstModule, module2Runs, module1Completions, lifeChapters, chatFirstTimeExperience, chatMessages, addedLegacyItemIds, legacyItemStatuses, hasInviteToken, userState, audienceCreatorName, hasSeenAudienceWelcome, audienceMembers])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
