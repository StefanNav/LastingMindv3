import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Volume2, RefreshCw } from 'lucide-react'

export function ResponseActionBar() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  const buttons = [
    {
      icon: ThumbsUp,
      label: 'Good answer',
      active: feedback === 'up',
      onClick: () => setFeedback((prev) => (prev === 'up' ? null : 'up')),
    },
    {
      icon: ThumbsDown,
      label: 'Not a good answer',
      active: feedback === 'down',
      onClick: () => setFeedback((prev) => (prev === 'down' ? null : 'down')),
    },
    {
      icon: Volume2,
      label: 'Read aloud',
      active: false,
      onClick: () => {},
    },
    {
      icon: RefreshCw,
      label: 'Try another answer',
      active: false,
      onClick: () => {},
    },
  ]

  return (
    <div className="flex items-center gap-1">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          type="button"
          onClick={btn.onClick}
          aria-label={btn.label}
          className={`flex size-8 items-center justify-center rounded-full transition-all active:scale-[0.92] ${
            btn.active
              ? 'bg-lm-green/10 text-lm-green'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <btn.icon className="size-3.5" />
        </button>
      ))}
    </div>
  )
}
