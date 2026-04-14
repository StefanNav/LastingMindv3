import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  onClick: () => void
  ariaLabel?: string
  className?: string
}

export function BackButton({ onClick, ariaLabel = 'Go back', className }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full p-1 text-foreground transition-colors hover:bg-muted',
        className,
      )}
      aria-label={ariaLabel}
    >
      <ArrowLeft className="size-5" />
    </button>
  )
}
