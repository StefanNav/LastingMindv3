import { BackButton } from '@/components/shared/BackButton'

interface ReflectionHeaderProps {
  moduleTitle: string
  onBack: () => void
}

export function ReflectionHeader({ moduleTitle, onBack }: ReflectionHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-[62px]">
      <BackButton onClick={onBack} />
      <p className="font-display text-lg font-semibold leading-tight text-foreground">
        {moduleTitle}
      </p>
      <div className="w-8" />
    </div>
  )
}
