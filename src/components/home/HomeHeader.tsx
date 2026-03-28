import { Star } from 'lucide-react'
import { useApp } from '@/app/AppProvider'

export function HomeHeader() {
  const { foundationStars } = useApp()

  return (
    <div className="flex h-[96px] items-center justify-between bg-[var(--lm-bg-header)] px-4 pb-[19px] pt-[68px]">
      {/* LM Logo */}
      <div className="flex w-[70px] items-center">
        <div className="flex size-[30px] items-center justify-center rounded-full border-[0.5px] border-lm-green p-0.5">
          <p className="text-center text-[12px] font-bold leading-[1.2] tracking-[0.12px] text-foreground">
            LM
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-8 flex-1" />

      {/* Right icons */}
      <div className="flex items-center gap-3">
        {/* Star count */}
        <div className="flex h-[30px] items-center justify-center gap-1 rounded-full p-0.5">
          <p className="text-center text-[16px] font-bold leading-[1.2] tracking-[0.12px] text-foreground">
            {foundationStars}
          </p>
          <Star className="size-4 text-lm-gold-star" fill="var(--lm-gold-star)" />
        </div>

        {/* Seed count */}
        <div className="flex h-[30px] shrink-0 items-center justify-center rounded-full p-0.5">
          <p className="whitespace-nowrap text-center text-[16px] font-bold leading-[1.2] tracking-[0.12px] text-foreground">
            🌱4
          </p>
        </div>

        {/* Avatar */}
        <div className="size-[30px] overflow-hidden rounded-full border-[0.5px] border-lm-green">
          <img src="/images/user image.png" alt="Profile" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}
