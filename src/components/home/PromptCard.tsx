import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PromptCardProps {
  categoryTag: string
  question: string
  totalPrompts?: number
  activePromptIndex?: number
  onStartModule?: () => void
}

export function PromptCard({
  categoryTag,
  question,
  totalPrompts = 8,
  activePromptIndex = 0,
  onStartModule,
}: PromptCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Outer card */}
      <div className="w-full rounded-[10px] border border-lm-border-subtle bg-lm-bg-card p-2">
        {/* Inner bordered area */}
        <div className="flex flex-col items-center gap-4 rounded-[10px] border border-lm-border px-2 py-2.5">
          {/* Content */}
          <div className="flex w-full flex-col gap-2.5">
            {/* Category tag */}
            <div className="flex items-center gap-1 rounded-2xl">
              <Star className="size-4 text-lm-gold-star" fill="var(--lm-gold-star)" />
              <p className="text-[10px] font-black uppercase leading-none tracking-[1px] text-lm-gold-muted">
                {categoryTag}
              </p>
            </div>
            {/* Question */}
            <p className="w-full text-center font-display text-[16px] font-medium leading-[1.2] text-foreground">
              {question}
            </p>
          </div>
          {/* Start Module button */}
          <button
            type="button"
            onClick={onStartModule}
            className="rounded-[4px] bg-lm-green px-4 py-2"
          >
            <p className="text-[14px] font-normal leading-[1.2] text-white">
              Start Module
            </p>
          </button>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2.5">
        {Array.from({ length: totalPrompts }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'rounded-full',
              i === activePromptIndex
                ? 'h-1.5 w-5 bg-lm-green'
                : 'size-1.5 bg-lm-neutral-warm/35',
            )}
          />
        ))}
      </div>
    </div>
  )
}
