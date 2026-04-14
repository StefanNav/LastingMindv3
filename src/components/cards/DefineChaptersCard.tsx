import { Plus, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DefineChaptersCardProps {
  mode: 'define' | 'edit'
  onClick?: () => void
}

export function DefineChaptersCard({ mode, onClick }: DefineChaptersCardProps) {
  const isEdit = mode === 'edit'
  const isDisabled = !onClick

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'flex w-full items-center gap-4 rounded-[10px] px-5 py-4 text-left',
        'border border-dashed border-lm-border',
        'shadow-card backdrop-blur-sm',
        isDisabled
          ? 'opacity-40 cursor-default'
          : 'transition-transform active:scale-[0.97]',
        isEdit
          ? 'bg-lm-bg-card/10 opacity-70'
          : 'bg-lm-bg-card/20',
      )}
    >
      {/* Icon */}
      <div className={cn(
        'flex size-14 shrink-0 items-center justify-center rounded-xl',
        isEdit ? 'bg-lm-green/5' : 'bg-lm-green/10',
      )}>
        {isEdit ? (
          <Pencil className="size-6 text-lm-green" />
        ) : (
          <Plus className="size-7 text-lm-green" />
        )}
      </div>

      {/* Text block */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className={cn(
          'font-semibold leading-tight text-lm-green-dark',
          isEdit ? 'text-[14px]' : 'text-[15px]',
        )}>
          {isEdit ? 'Edit your chapters' : 'Define your life chapters'}
        </p>
        <p className={cn(
          'leading-snug text-muted-foreground',
          isEdit ? 'text-[12px]' : 'text-[13px]',
        )}>
          {isEdit
            ? 'Tap to add, remove, or rename chapters.'
            : 'Name the chapters of your life — once saved, each one becomes its own story card below.'}
        </p>
      </div>
    </button>
  )
}
