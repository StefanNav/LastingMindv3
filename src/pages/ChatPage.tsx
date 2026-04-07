import { useState } from 'react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { getProfileData } from '@/data/profileData'
import { ChatLockedPage } from './ChatLockedPage'
import { ChatTutorialIntro } from '@/components/chat/ChatTutorialIntro'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatThread } from '@/components/chat/ChatThread'
import { ChatInputBar } from '@/components/chat/ChatInputBar'
import { SuggestionChips } from '@/components/chat/SuggestionChips'
import { ChatMenuSheet } from '@/components/chat/ChatMenuSheet'
import { SuggestedCategoriesSheet } from '@/components/chat/SuggestedCategoriesSheet'
import { useChatTutorial } from '@/hooks/useChatTutorial'
import { useChatEngine } from '@/hooks/useChatEngine'

function TutorialChat({ avatarUrl, onTutorialComplete }: { avatarUrl: string | null; onTutorialComplete: () => void }) {
  const tutorial = useChatTutorial()
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const inputDisabled = tutorial.phase === 'exchange1_lm_question' ||
    tutorial.phase === 'exchange1_waiting_chip' ||
    tutorial.phase === 'exchange1_lm_responding' ||
    tutorial.phase === 'exchange1_lm_done' ||
    tutorial.phase === 'exchange2_lm_followup'

  const handleSend = (text: string) => {
    if (tutorial.phase === 'exchange2_done') {
      tutorial.handleFreeFormMessage(text)
      onTutorialComplete()
    }
  }

  return (
    <PageTransition>
      <div className="flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <ChatHeader onMenuOpen={() => setMenuOpen(true)} />

          <ChatThread
            messages={tutorial.messages}
            avatarUrl={avatarUrl}
            isThinking={tutorial.isThinking}
          />

          {/* Suggestion chip for Exchange 1 */}
          {tutorial.suggestionChip && (
            <SuggestionChips
              suggestions={[tutorial.suggestionChip]}
              onSelect={tutorial.handleChipTap}
            />
          )}

          <ChatInputBar
            onSend={handleSend}
            placeholder={tutorial.inputPlaceholder}
            disabled={inputDisabled}
          />
        </div>

        <ChatMenuSheet
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onShowCategories={() => setCategoriesOpen(true)}
        />
        <SuggestedCategoriesSheet
          isOpen={categoriesOpen}
          onClose={() => setCategoriesOpen(false)}
          onSelectQuestion={(q: string) => {
            setCategoriesOpen(false)
            handleSend(q)
          }}
        />
      </div>
    </PageTransition>
  )
}

function FreeFormChat({ avatarUrl }: { avatarUrl: string | null }) {
  const engine = useChatEngine()
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const handleSend = (text: string) => {
    engine.sendMessage(text)
  }

  return (
    <PageTransition>
      <div className="flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <ChatHeader onMenuOpen={() => setMenuOpen(true)} />

          <ChatThread
            messages={engine.messages}
            avatarUrl={avatarUrl}
            isThinking={engine.isThinking}
            showAnnotations={false}
          />

          {engine.suggestedQuestions.length > 0 && !engine.isThinking && (
            <SuggestionChips
              suggestions={engine.suggestedQuestions}
              onSelect={handleSend}
            />
          )}

          <ChatInputBar onSend={handleSend} />
        </div>

        <ChatMenuSheet
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onShowCategories={() => setCategoriesOpen(true)}
        />
        <SuggestedCategoriesSheet
          isOpen={categoriesOpen}
          onClose={() => setCategoriesOpen(false)}
          onSelectQuestion={handleSend}
        />
      </div>
    </PageTransition>
  )
}

export function ChatPage() {
  const { activeDemoId, chatFirstTimeExperience } = useApp()
  const profile = getProfileData(activeDemoId)
  const [showTutorialIntro, setShowTutorialIntro] = useState(chatFirstTimeExperience)
  const [tutorialActive, setTutorialActive] = useState(false)

  // Locked state — Phase 1 not complete
  if (!profile.phase1Complete) {
    return <ChatLockedPage />
  }

  // Tutorial intro — first time
  if (chatFirstTimeExperience && showTutorialIntro && !tutorialActive) {
    return (
      <PageTransition>
        <div className="flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
          <div className="pointer-events-none absolute inset-0 z-0">
            <img
              src="/images/onboarding/OnboardingBackground.png"
              alt=""
              className="h-full w-full object-cover opacity-40"
            />
          </div>
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <ChatTutorialIntro onStart={() => {
              setShowTutorialIntro(false)
              setTutorialActive(true)
            }} />
          </div>
        </div>
      </PageTransition>
    )
  }

  // Tutorial chat — scripted first conversation
  if (chatFirstTimeExperience && tutorialActive) {
    return (
      <TutorialChat
        avatarUrl={profile.user.avatarUrl}
        onTutorialComplete={() => {
          setTutorialActive(false)
        }}
      />
    )
  }

  // Free-form chat — return visits
  return <FreeFormChat avatarUrl={profile.user.avatarUrl} />
}
