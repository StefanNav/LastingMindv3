import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { GuidedChatBubble } from './GuidedChatBubble'
import { ThinkingDots } from '@/components/ui/ThinkingDots'
import { Leaf } from 'lucide-react'
import type { GuidedMessage } from '@/types'

interface GuidedChatThreadProps {
  messages: GuidedMessage[]
  isThinking?: boolean
}

export function GuidedChatThread({ messages, isThinking = false }: GuidedChatThreadProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    })
  }

  useEffect(() => {
    scrollToBottom()
    // Also scroll after a short delay to catch post-animation layout shifts
    const t = setTimeout(scrollToBottom, 350)
    return () => clearTimeout(t)
  }, [messages.length, isThinking])

  return (
    <div ref={containerRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto py-3" style={{ scrollbarWidth: 'none' }}>
      {messages.length === 0 && !isThinking && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your conversation will appear here.
          </p>
        </div>
      )}

      <AnimatePresence>
        {messages.map((msg) => (
          <GuidedChatBubble key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      {/* Thinking indicator */}
      {isThinking && (
        <div className="flex gap-2 px-4 py-1.5">
          <div className="relative mt-1 shrink-0">
            <div className="flex size-8 items-center justify-center rounded-full border border-lm-green/20 bg-primary/10">
              <Leaf className="size-4 text-lm-green" />
            </div>
          </div>
          <div className="flex items-center rounded-2xl rounded-bl-md bg-lm-bg-card px-4 py-3 shadow-card">
            <ThinkingDots />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
