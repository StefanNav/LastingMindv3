import { useNavigate } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { BackButton } from '@/components/shared/BackButton'

interface AudienceChatHeaderProps {
  creatorFirstName: string
  onMenuOpen: () => void
}

export function AudienceChatHeader({ creatorFirstName, onMenuOpen }: AudienceChatHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-[var(--lm-bg-primary)]/80 px-4 pb-3 pt-[62px] backdrop-blur-sm">
      <BackButton onClick={() => navigate('/audience-home')} />

      <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
        {creatorFirstName}'s LastingMind
      </p>

      <button
        type="button"
        onClick={onMenuOpen}
        className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
        aria-label="More options"
      >
        <MoreHorizontal className="size-5" />
      </button>
    </div>
  )
}
