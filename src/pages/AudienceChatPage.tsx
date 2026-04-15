import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageTransition } from '@/animations/PageTransition'
import { AudienceChatIntroScreen } from '@/components/chat/AudienceChatIntroScreen'
import { AudienceChatHeader } from '@/components/chat/AudienceChatHeader'
import { ChatThread } from '@/components/chat/ChatThread'
import { ChatInputBar } from '@/components/chat/ChatInputBar'
import { ChatMenuSheet } from '@/components/chat/ChatMenuSheet'
import { SuggestedCategoriesSheet } from '@/components/chat/SuggestedCategoriesSheet'
import { ConversationStarter } from '@/components/chat/ConversationStarter'
import { useAudienceChatEngine } from '@/hooks/useAudienceChatEngine'
import { audienceConversationStarters } from '@/data/audienceChatData'
import { mockLovedOnes } from '@/data/lovedOnesData'

type ScreenState = 'intro' | 'chat'

export function AudienceChatPage() {
  const { creatorId } = useParams<{ creatorId: string }>()
  const [screen, setScreen] = useState<ScreenState>('intro')
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const engine = useAudienceChatEngine()

  const creator = mockLovedOnes.find((c) => c.id === creatorId)
  const creatorName = creator?.name ?? 'your loved one'
  const creatorFirstName = creatorName.split(' ')[0]
  const avatarUrl = creator?.avatarUrl ?? null

  const handleSend = (text: string) => {
    engine.sendMessage(text)
  }

  const hasMessages = engine.messages.length > 0 || engine.isThinking

  if (screen === 'intro') {
    return (
      <PageTransition>
        <AudienceChatIntroScreen
          creatorName={creatorName}
          creatorFirstName={creatorFirstName}
          avatarUrl={avatarUrl}
          onContinue={() => setScreen('chat')}
        />
      </PageTransition>
    )
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
          <AudienceChatHeader
            creatorFirstName={creatorFirstName}
            onMenuOpen={() => setMenuOpen(true)}
          />

          {hasMessages ? (
            <ChatThread
              messages={engine.messages}
              avatarUrl={avatarUrl}
              creatorName={creatorName}
              isThinking={engine.isThinking}
              showAnnotations={false}
              isAudience={true}
            />
          ) : (
            <ConversationStarter
              avatarUrl={avatarUrl}
              creatorName={creatorName}
              onSelect={handleSend}
              starters={audienceConversationStarters}
            />
          )}

          <ChatInputBar
            onSend={handleSend}
            placeholder={`Ask ${creatorFirstName} anything…`}
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
          onSelectQuestion={handleSend}
        />
      </div>
    </PageTransition>
  )
}
