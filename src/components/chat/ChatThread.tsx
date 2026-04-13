import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChatBubble } from './ChatBubble'
import { ThinkingDots } from '@/components/ui/ThinkingDots'
import type { ChatMessage } from '@/types'

interface ChatThreadProps {
  messages: ChatMessage[]
  avatarUrl?: string | null
  creatorName?: string
  isThinking?: boolean
  showAnnotations?: boolean
  onAddResponse?: () => void
}

function getInitials(name?: string) {
  if (!name) return 'AM'
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')
}

export function ChatThread({ messages, avatarUrl, creatorName, isThinking = false, showAnnotations = true, onAddResponse }: ChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, isThinking])

  // Group messages by day for date dividers
  const groupedMessages = messages.reduce<{ date: string; messages: ChatMessage[] }[]>((acc, msg) => {
    const dateStr = new Date(msg.timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    const lastGroup = acc[acc.length - 1]
    if (lastGroup && lastGroup.date === dateStr) {
      lastGroup.messages.push(msg)
    } else {
      acc.push({ date: dateStr, messages: [msg] })
    }
    return acc
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto py-3" style={{ scrollbarWidth: 'none' }}>
      {messages.length === 0 && !isThinking && (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Your conversation will appear here.
          </p>
        </div>
      )}

      <AnimatePresence>
        {groupedMessages.map((group) => (
          <div key={group.date}>
            <div className="flex items-center gap-3 px-6 py-3">
              <div className="h-px flex-1 bg-border/50" />
              <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
                {group.date}
              </span>
              <div className="h-px flex-1 bg-border/50" />
            </div>
            {group.messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} avatarUrl={avatarUrl} creatorName={creatorName} showAnnotations={showAnnotations} onAddResponse={onAddResponse} />
            ))}
          </div>
        ))}
      </AnimatePresence>

      {/* Thinking indicator */}
      {isThinking && (
        <div className="flex gap-2 px-4 py-1.5">
          <div className="relative mt-1 shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="LastingMind"
                className="size-8 rounded-full object-cover border border-lm-green/20"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 border border-lm-green/20">
                <span className="text-xs font-bold text-primary">{getInitials(creatorName)}</span>
              </div>
            )}
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
