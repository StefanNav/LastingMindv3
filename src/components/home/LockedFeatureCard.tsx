import { LockKeyhole } from 'lucide-react'

interface LockedFeatureCardProps {
  image: string
  title: string
  subtitle: string
  onClick?: () => void
}

export function LockedFeatureCard({ image, title, subtitle, onClick }: LockedFeatureCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-[10px] bg-lm-bg-card/30 px-5 py-4 shadow-card text-left transition-transform active:scale-[0.97] opacity-70">
      <div className="relative flex size-14 shrink-0 items-center justify-center rounded-xl bg-lm-green/10">
        <img
          src={image}
          alt=""
          className="size-9 object-contain"
        />
        <div className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-[#e7ebd9] shadow-sm">
          <LockKeyhole className="size-3 text-lm-green-dark/60" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[15px] font-semibold leading-tight text-lm-green-dark">
          {title}
        </p>
        <p className="text-[13px] leading-snug text-[var(--lm-text-secondary)]">
          {subtitle}
        </p>
      </div>
    </button>
  )
}
