import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import type { GuidedMessage } from '@/types'

interface GuidedChatBubbleProps {
  message: GuidedMessage
}

export function GuidedChatBubble({ message }: GuidedChatBubbleProps) {
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
          <div className="flex size-8 items-center justify-center rounded-full border border-lm-green/20 bg-primary/10">
            <Leaf className="size-4 text-lm-green" />
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
          {/* Voice indicator for voice messages */}
          {isUser && message.inputType === 'voice' && (
            <div className="mb-1 flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full bg-white/60"
                    style={{ height: `${6 + Math.random() * 10}px` }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium text-white/70">0:42</span>
            </div>
          )}
          <p className={`text-[15px] leading-[1.5] ${isUser ? 'text-white' : 'text-foreground'}`}>
            {message.content}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
