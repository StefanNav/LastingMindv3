import { cn } from '@/lib/utils'
import {
  BookOpen, Eye, Users, Sparkles, Heart, Mail, Mic, Video,
  Flag, ScrollText, BookHeart, FileText, Puzzle,
} from 'lucide-react'
import type { LegacyItemStatus } from '@/types'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Eye,
  Users,
  Sparkles,
  Heart,
  Mail,
  Mic,
  Video,
  Flag,
  ScrollText,
  BookHeart,
  FileText,
  PuzzlePiece: Puzzle,
}

const statusLabelMap: Record<LegacyItemStatus, string> = {
  not_started: 'Not started',
  in_progress: 'In progress',
  complete: 'Complete',
}

const statusColorMap: Record<LegacyItemStatus, string> = {
  not_started: 'text-[var(--lm-text-tertiary)]',
  in_progress: 'text-lm-gold',
  complete: 'text-lm-green',
}

interface HorizontalActivityCardProps {
  title: string
  subtitle: string
  icon: string
  iconColor: string
  image?: string
  lastActivity?: string
  status?: LegacyItemStatus
  onClick?: () => void
}

export function HorizontalActivityCard({
  title,
  subtitle,
  icon,
  iconColor,
  image,
  lastActivity,
  status,
  onClick,
}: HorizontalActivityCardProps) {
  const IconComponent = ICON_MAP[icon]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-[10px] bg-lm-bg-card/30 px-5 py-4 shadow-card text-left',
        'transition-transform active:scale-[0.97]',
      )}
    >
      {/* Image or icon placeholder */}
      {image ? (
        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl overflow-hidden">
          <img src={image} alt="" className="size-14 object-contain" />
        </div>
      ) : (
        <div className={cn('flex size-14 shrink-0 items-center justify-center rounded-xl', iconColor)}>
          {IconComponent ? (
            <IconComponent className="size-7" />
          ) : (
            <Sparkles className="size-7" />
          )}
        </div>
      )}

      {/* Text block */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[15px] font-semibold leading-tight text-lm-green-dark">
          {title}
        </p>
        <p className="text-[13px] leading-snug text-[var(--lm-text-secondary)]">
          {subtitle}
        </p>
        {lastActivity && (
          <p className="mt-0.5 text-[11px] text-[var(--lm-text-tertiary)]">
            {lastActivity}
          </p>
        )}
        {status && (
          <p className={cn('mt-0.5 text-[11px] font-medium', statusColorMap[status])}>
            {statusLabelMap[status]}
          </p>
        )}
      </div>
    </button>
  )
}
