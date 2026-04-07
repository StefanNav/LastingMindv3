import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MobileShell } from '@/components/shared/MobileShell'
import { AppProvider } from '@/app/AppProvider'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { HomePage } from '@/pages/HomePage'
import { ChatPage } from '@/pages/ChatPage'
import { SuccessPage } from '@/pages/SuccessPage'
import { LovedOnesPage } from '@/pages/LovedOnesPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { ModuleIntroPage } from '@/pages/ModuleIntroPage'
import { Module2IntroPage } from '@/pages/Module2IntroPage'
import { GuidedConversationPageV2 } from '@/pages/GuidedConversationPageV2'
import { ReflectionPromptPage } from '@/pages/ReflectionPromptPage'
import { ReflectionPage } from '@/pages/ReflectionPage'
import { ReflectionSummaryPage } from '@/pages/ReflectionSummaryPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { FavoritesSummaryPage } from '@/pages/FavoritesSummaryPage'
import { FavoritesMilestonePage } from '@/pages/FavoritesMilestonePage'
import { CoreValuesPage } from '@/pages/CoreValuesPage'
import { CoreValuesSummaryPage } from '@/pages/CoreValuesSummaryPage'
import { MemoryProfilePage } from '@/pages/MemoryProfilePage'
import { DefineChaptersPage } from '@/pages/DefineChaptersPage'
import { LifeChaptersHubPage } from '@/pages/LifeChaptersHubPage'
import { Phase4PlaceholderPage } from '@/pages/Phase4PlaceholderPage'
import { LegacyPlaceholderPage } from '@/pages/LegacyPlaceholderPage'
import { conversationConfigs, foundationIntroData, module2IntroData } from '@/data/mock'
import { guidedConversationConfigs } from '@/data/guidedConversationData'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import type { ModuleCompletionState, RewardCardData } from '@/types'

function KeyedOnboarding() {
  const { onboardingKey } = useApp()
  return <OnboardingPage key={onboardingKey} />
}

function KeyedChatPage() {
  const { activeDemoId } = useApp()
  return <ChatPage key={activeDemoId} />
}

function ConversationRoute() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { hasCompletedFirstModule, markFirstModuleComplete, markModule1Complete } = useApp()
  const config = categoryId ? guidedConversationConfigs[categoryId] : undefined
  const oldConfig = categoryId ? conversationConfigs[categoryId] : undefined
  const introData = categoryId ? foundationIntroData[categoryId] : undefined

  if (!config || !categoryId) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Conversation not found.</p>
        </div>
      </PageTransition>
    )
  }

  const mod2 = categoryId ? module2IntroData[categoryId] : undefined

  return (
    <GuidedConversationPageV2
      config={config}
      onComplete={() => {
        // Build reward card data from conversation summary items
        const summaryItems = oldConfig?.summaryItems ?? []
        const rewardCardData: RewardCardData = {
          categoryImage: introData?.image ?? '',
          categoryLabel: introData?.categoryLabel ?? categoryId,
          moduleTitle: config.moduleTitle,
          items: summaryItems.map((si) => ({
            id: si.id,
            initial: si.name.charAt(0),
            label: si.name.split(' ')[0],
            sublabel: si.label,
          })),
          itemCountLabel: `${summaryItems.length} ${(introData?.categoryLabel ?? categoryId).toLowerCase()} members recorded`,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        }

        const completionState: ModuleCompletionState = {
          categoryId,
          moduleNumber: 1,
          moduleTitle: config.moduleTitle,
          categoryLabel: introData?.categoryLabel ?? categoryId,
          starEarned: false,
          totalStars: 0,
          totalStarsNeeded: 6,
          isFirstModuleEver: !hasCompletedFirstModule,
          rewardCardData,
          nextModule: mod2
            ? { title: mod2.moduleTitle, description: mod2.description, duration: '5min' }
            : undefined,
        }
        markFirstModuleComplete()
        markModule1Complete(categoryId)
        navigate('/success', { state: completionState })
      }}
      onBack={() => navigate(`/intro/${categoryId}`)}
      onExit={() => navigate('/home')}
    />
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MobileShell>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              <Route path="/onboarding" element={<KeyedOnboarding />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/chat" element={<KeyedChatPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/loved-ones" element={<LovedOnesPage />} />
              <Route path="/loved-ones/:creatorId/voice" element={null} />
              <Route path="/loved-ones/:creatorId/chat" element={null} />
              <Route path="/loved-ones/:creatorId/legacy" element={null} />
              <Route path="/loved-ones/:creatorId/questions" element={null} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/intro/:categoryId" element={<ModuleIntroPage />} />
              <Route path="/intro2/:categoryId" element={<Module2IntroPage />} />
              <Route path="/conversation/:categoryId" element={<ConversationRoute />} />
              <Route path="/reflection/:categoryId" element={<ReflectionPromptPage />} />
              <Route path="/reflect/:categoryId" element={<ReflectionPage />} />
              <Route path="/reflection/:categoryId/summary" element={<ReflectionSummaryPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/favorites/summary" element={<FavoritesSummaryPage />} />
              <Route path="/favorites/milestone" element={<FavoritesMilestonePage />} />
              <Route path="/core-values" element={<CoreValuesPage />} />
              <Route path="/core-values/summary" element={<CoreValuesSummaryPage />} />
              <Route path="/profile" element={<MemoryProfilePage />} />
              <Route path="/life-chapters" element={<LifeChaptersHubPage />} />
              <Route path="/life-chapters/define" element={<DefineChaptersPage />} />
              <Route path="/phase4/:categoryId" element={<Phase4PlaceholderPage />} />
              <Route path="/legacy/:itemId" element={<LegacyPlaceholderPage />} />
            </Routes>
          </AnimatePresence>
        </MobileShell>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
