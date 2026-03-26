import Lottie from 'lottie-react'
import type { CSSProperties } from 'react'

interface LottiePlayerProps {
  animationData: Record<string, unknown>
  loop?: boolean
  autoplay?: boolean
  style?: CSSProperties
  className?: string
}

export function LottiePlayer({
  animationData,
  loop = true,
  autoplay = true,
  style,
  className,
}: LottiePlayerProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
      className={className}
    />
  )
}
