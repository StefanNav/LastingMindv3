import { useState, useRef, useCallback } from 'react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { getProfileData } from '@/data/profileData'
import { ChatLockedPage } from './ChatLockedPage'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatThread } from '@/components/chat/ChatThread'
import { ChatInputBar } from '@/components/chat/ChatInputBar'
import { SuggestionChips } from '@/components/chat/SuggestionChips'
import { ChatMenuSheet } from '@/components/chat/ChatMenuSheet'
import { SuggestedCategoriesSheet } from '@/components/chat/SuggestedCategoriesSheet'
import { ConversationStarter } from '@/components/chat/ConversationStarter'
import { useChatEngine } from '@/hooks/useChatEngine'

export function ChatPage() {
  const { activeDemoId } = useApp()
  const profile = getProfileData(activeDemoId)
  const engine = useChatEngine()
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [isAddingResponse, setIsAddingResponse] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddResponse = useCallback(() => {
    setIsAddingResponse(true)
    inputRef.current?.focus()
  }, [])

  // Locked state — Phase 1 not complete
  if (!profile.phase1Complete) {
    return <ChatLockedPage />
  }

  const handleSend = (text: string) => {
    engine.sendMessage(text)
    setIsAddingResponse(false)
  }

  const hasMessages = engine.messages.length > 0 || engine.isThinking

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

          {hasMessages ? (
            <>
              <ChatThread
                messages={engine.messages}
                avatarUrl={profile.user.avatarUrl}
                creatorName={profile.user.name}
                isThinking={engine.isThinking}
                showAnnotations={false}
                onAddResponse={handleAddResponse}
              />

              {!isAddingResponse && engine.suggestedQuestions.length > 0 && !engine.isThinking && (
                <SuggestionChips
                  suggestions={engine.suggestedQuestions}
                  onSelect={handleSend}
                />
              )}
            </>
          ) : (
            <ConversationStarter
              avatarUrl={profile.user.avatarUrl}
              creatorName={profile.user.name}
              onSelect={handleSend}
            />
          )}

          {isAddingResponse && (
            <div className="px-4 py-2">
              <p className="text-[13px] text-muted-foreground">
                Share your response — it’ll be saved for next time this comes up.
              </p>
            </div>
          )}

          <ChatInputBar onSend={handleSend} externalInputRef={inputRef} />
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
