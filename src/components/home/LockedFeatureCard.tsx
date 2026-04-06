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
      className="flex items-center gap-4 rounded-[10px] bg-lm-bg-card/40 px-5 py-4 shadow-card backdrop-blur-sm opacity-70 w-full text-left transition-transform active:scale-[0.97]">
      <img
        src={image}
        alt=""
        className="h-[60px] w-[60px] shrink-0 object-contain"
      />
      <div className="flex flex-col gap-1">
        <p className="font-display text-[16px] font-semibold leading-tight text-foreground">
          {title}
        </p>
        <p className="text-[13px] leading-snug text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </button>
  )
}
