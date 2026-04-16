import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExplainAnswerModal } from './ExplainAnswerModal'
import { ProvideNewAnswerModal } from './ProvideNewAnswerModal'
import { ResponseActionBar } from './ResponseActionBar'
import type { ChatMessage } from '@/types'

interface ChatBubbleProps {
  message: ChatMessage
  avatarUrl?: string | null
  creatorName?: string
  showAnnotations?: boolean
  isAudience?: boolean
}

function getInitials(name?: string) {
  if (!name) return 'AM'
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')
}

export function ChatBubble({ message, avatarUrl, creatorName, showAnnotations = true, isAudience = false }: ChatBubbleProps) {
  const isUser = message.sender === 'user'
  const initials = getInitials(creatorName)
  const [explainOpen, setExplainOpen] = useState(false)
  const [newAnswerVariant, setNewAnswerVariant] = useState<'replace' | 'gap' | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col px-4 py-1.5 ${isUser ? 'items-end' : 'items-start'}`}
    >
      {/* Avatar — only for LastingMind messages */}
      {!isUser && (
        <div className="relative mb-1 shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="LastingMind"
              className="size-8 rounded-full object-cover border border-lm-green/20"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-lm-green/20">
              <span className="text-xs font-bold text-primary">{initials}</span>
            </div>
          )}
        </div>
      )}

      {/* Bubble content */}
      <div className={`flex max-w-[88%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-3.5 py-2.5 ${
            isUser
              ? 'rounded-br-md bg-lm-green text-white'
              : 'rounded-bl-md bg-lm-bg-card shadow-card'
          }`}
        >
          <p className={`text-[15px] leading-[1.5] ${isUser ? 'text-white' : 'text-foreground'}`}>
            {message.content}
          </p>
        </div>

        {/* Action row — icons + answer action */}
        {!isUser && (
          <div className="flex items-center gap-2">
            {!isAudience && (
              <button
                type="button"
                onClick={() => setNewAnswerVariant('gap')}
                className="rounded-full border border-lm-green/30 bg-lm-green/8 px-3 py-1 text-[11px] font-semibold text-lm-green transition-colors hover:bg-lm-green/15 active:scale-[0.97]"
              >
                Add a response
              </button>
            )}
            <ResponseActionBar />
          </div>
        )}

        {/* Explain answer label */}
        {!isUser && message.sourceEntry && (
          <button
            type="button"
            onClick={() => setExplainOpen(true)}
            className="px-1 text-[12px] font-medium text-lm-gold transition-colors hover:text-lm-gold-muted"
          >
            {isAudience ? 'Where this answer came from ›' : 'Explain answer ›'}
          </button>
        )}

        {/* Tutorial annotation */}
        {showAnnotations && message.annotation && (
          <p className="max-w-[90%] px-1 text-[12px] italic leading-snug text-muted-foreground">
            {message.annotation}
          </p>
        )}
      </div>

      {/* Modals */}
      {!isUser && message.excerpts && (
        <ExplainAnswerModal
          isOpen={explainOpen}
          onClose={() => setExplainOpen(false)}
          excerpts={message.excerpts}
          onToast={setToastMessage}
          isAudience={isAudience}
          creatorFirstName={creatorName?.split(' ')[0]}
        />
      )}
      {!isUser && !isAudience && (
        <ProvideNewAnswerModal
          isOpen={newAnswerVariant !== null}
          onClose={() => setNewAnswerVariant(null)}
          onToast={setToastMessage}
          variant={newAnswerVariant ?? 'replace'}
        />
      )}

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-lm-green/90 px-5 py-3 shadow-lg"
          >
            <p className="whitespace-nowrap text-[13px] font-semibold text-white">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
