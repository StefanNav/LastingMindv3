import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { defaultConversationStarters } from '@/data/chatData'

interface ConversationStarterProps {
  avatarUrl?: string | null
  creatorName?: string
  onSelect: (question: string) => void
  starters?: string[]
}

function getInitials(name?: string) {
  if (!name) return 'AM'
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')
}

export function ConversationStarter({ avatarUrl, creatorName, onSelect, starters }: ConversationStarterProps) {
  const initials = getInitials(creatorName)

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 overflow-y-auto px-6">
      {/* Large avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={creatorName || 'Legacy Creator'}
            className="size-24 rounded-full object-cover border-2 border-lm-green/20"
          />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full bg-primary/10 border-2 border-lm-green/20">
            <span className="text-3xl font-bold text-primary">{initials}</span>
          </div>
        )}
        {/* Leaf badge */}
        <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-lm-green">
          <Leaf className="size-3.5 text-white" />
        </div>
      </motion.div>

      {/* Starter cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex w-full flex-col gap-3"
      >
        {(starters ?? defaultConversationStarters).map((question, i) => (
          <motion.button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            className="w-full rounded-[12px] bg-lm-bg-card px-4 py-4 text-left shadow-card transition-all hover:bg-primary/5 active:scale-[0.98]"
          >
            <p className="text-[15px] font-medium leading-[1.4] text-foreground">
              {question}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
