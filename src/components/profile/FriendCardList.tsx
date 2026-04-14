import { motion } from 'framer-motion'
import type { PersonEntry } from '@/types'

interface FriendCardListProps {
  friends: PersonEntry[]
  onFriendTap: (entry: PersonEntry) => void
}

export function FriendCardList({ friends, onFriendTap }: FriendCardListProps) {
  if (friends.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      {friends.map((friend, i) => (
        <motion.button
          key={friend.entryId}
          type="button"
          onClick={() => onFriendTap(friend)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i }}
          className="flex flex-col gap-1 rounded-[10px] bg-lm-bg-card/40 px-5 py-4 text-left shadow-card backdrop-blur-sm transition-transform active:scale-[0.98]"
        >
          <p className="font-display text-lg font-normal leading-tight text-foreground">
            {friend.fullName ?? friend.name}
          </p>
          <p className="text-sm font-medium text-lm-gold-muted">
            {friend.dateLabel ?? friend.relationshipLabel}
          </p>
        </motion.button>
      ))}
    </div>
  )
}
