import { ArrowLeft } from 'lucide-react'

interface ReflectionHeaderProps {
  moduleTitle: string
  onBack: () => void
}

export function ReflectionHeader({ moduleTitle, onBack }: ReflectionHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-[62px]">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
      >
        <ArrowLeft className="size-5 text-white" />
      </button>
      <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
        {moduleTitle}
      </p>
      <div className="w-8" />
    </div>
  )
}
