import { ArrowRight } from 'lucide-react'
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
      <div className="w-full rounded-[10px] bg-lm-bg-card/80 p-2">
        {/* Inner bordered area */}
        <div className="flex flex-col items-center rounded-[10px] px-2 py-2.5">
          {/* Category tag */}
          <div className="flex w-full items-center gap-1 rounded-2xl">
            <p className="text-[10px] font-bold uppercase leading-none tracking-[1px] text-lm-gold">
              {categoryTag}
            </p>
          </div>
          {/* Question */}
          <p className="mt-5 w-full text-center text-[16px] font-medium leading-[1.2] text-foreground">
            {question}
          </p>
          {/* Start Module button */}
          <button
            type="button"
            onClick={onStartModule}
            className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-transparent px-3 py-2.5 text-[13px] font-medium text-primary active:scale-[0.97]"
          >
            <span>Start Module</span>
            <ArrowRight className="size-3.5 shrink-0" strokeWidth={2} />
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
