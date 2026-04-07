import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import type { ChatMessage } from '@/types'

interface ChatBubbleProps {
  message: ChatMessage
  avatarUrl?: string | null
  showAnnotations?: boolean
}

export function ChatBubble({ message, avatarUrl, showAnnotations = true }: ChatBubbleProps) {
  const isUser = message.sender === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex gap-2 px-4 py-1.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar — only for LastingMind messages */}
      {!isUser && (
        <div className="relative mt-1 shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="LastingMind"
              className="size-8 rounded-full object-cover border border-lm-green/20"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-lm-green/20">
              <span className="text-xs font-bold text-primary">A</span>
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-lm-green">
            <Leaf className="size-2.5 text-white" />
          </div>
        </div>
      )}

      {/* Bubble content */}
      <div className={`flex max-w-[78%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
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

        {/* Source tag */}
        {message.sourceEntry && (
          <button
            type="button"
            className="px-1 text-[12px] font-medium text-lm-gold transition-colors hover:text-lm-gold-muted"
          >
            {message.sourceEntry}
          </button>
        )}

        {/* Tutorial annotation */}
        {showAnnotations && message.annotation && (
          <p className="max-w-[90%] px-1 text-[12px] italic leading-snug text-muted-foreground">
            {message.annotation}
          </p>
        )}
      </div>
    </motion.div>
  )
}
