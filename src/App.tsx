import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
            </Routes>
          </AnimatePresence>
        </MobileShell>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
