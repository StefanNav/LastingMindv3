import { useApp } from '@/app/AppProvider'

export function HomeHeader() {
  const { foundationStars, streak } = useApp()

  return (
    <div className="flex items-center justify-center gap-6 px-6 pb-[10px] pt-[54px]">
      {/* Streak badge */}
      <div className="flex items-center gap-1.5">
        <img src="/images/Leaf.svg" alt="" className="h-[19px] w-[17px]" />
        <p className="text-[16px] font-medium leading-[1.2] text-lm-text-primary">
          {streak} day streak
        </p>
      </div>

      {/* Stars badge */}
      <div className="flex items-center gap-1.5">
        <img src="/images/Star.svg" alt="" className="h-[22px] w-[23px]" />
        <p className="text-[16px] font-medium leading-[1.2] text-lm-text-primary">
          {foundationStars} stars earned
        </p>
      </div>
    </div>
  )
}
