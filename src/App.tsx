import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { MobileShell } from '@/components/shared/MobileShell'
import { AppProvider } from '@/app/AppProvider'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { HomePage } from '@/pages/HomePage'
import { SessionPage } from '@/pages/SessionPage'
import { SuccessPage } from '@/pages/SuccessPage'
import { FamilyPage } from '@/pages/FamilyPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { ModuleIntroPage } from '@/pages/ModuleIntroPage'
import { Module2IntroPage } from '@/pages/Module2IntroPage'
import { GuidedConversationPage } from '@/pages/GuidedConversationPage'
import { conversationConfigs, foundationIntroData } from '@/data/mock'
import { PageTransition } from '@/animations/PageTransition'
import type { ModuleCompletionState } from '@/types'

function ConversationRoute() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const config = categoryId ? conversationConfigs[categoryId] : undefined
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

  return (
    <GuidedConversationPage
      config={config}
      onComplete={() => {
        const completionState: ModuleCompletionState = {
          categoryId,
          moduleNumber: 1,
          moduleTitle: config.moduleTitle,
          categoryLabel: introData?.categoryLabel ?? categoryId,
          starEarned: false,
          totalStars: 0,
          totalStarsNeeded: 6,
        }
        navigate('/success', { state: completionState })
      }}
      onBack={() => navigate(`/intro/${categoryId}`)}
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
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/session" element={<SessionPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/family" element={<FamilyPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/intro/:categoryId" element={<ModuleIntroPage />} />
              <Route path="/intro2/:categoryId" element={<Module2IntroPage />} />
              <Route path="/conversation/:categoryId" element={<ConversationRoute />} />
            </Routes>
          </AnimatePresence>
        </MobileShell>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
