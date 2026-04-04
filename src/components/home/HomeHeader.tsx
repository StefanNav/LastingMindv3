import { useApp } from '@/app/AppProvider'

export function HomeHeader() {
  const { foundationStars, streak } = useApp()

  return (
    <div className="flex items-center justify-center gap-6 px-6 pb-[10px] pt-[54px]">
      {/* Streak badge */}
      <div className="flex items-center gap-1.5">
        <img src="/images/Leaf.svg" alt="" className="h-[16px] w-[14px]" />
        <p className="text-[16px] font-semibold leading-[1.2] text-lm-text-primary">
          {streak}
        </p>
      </div>

      {/* Stars badge */}
      <div className="flex items-center gap-1.5">
        <img src="/images/Star.svg" alt="" className="h-[16px] w-[17px]" />
        <p className="text-[16px] font-semibold leading-[1.2] text-lm-text-primary">
          {foundationStars}
        </p>
      </div>
    </div>
  )
}
