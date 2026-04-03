import { useEffect, useRef } from 'react'

const SPARK_COLORS = ['#5A9A38', '#8CC858', '#C49428', '#3A7030', '#78B848', '#A8D870']
const SPARK_COUNT = 8

interface SparkParticlesProps {
  trigger: number
}

export function SparkParticles({ trigger }: SparkParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (trigger === 0) return
    const el = containerRef.current
    if (!el) return

    for (let i = 0; i < SPARK_COUNT; i++) {
      const sp = document.createElement('div')
      const size = 2 + Math.random() * 3
      const color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)]
      sp.style.cssText =
        `position:absolute;border-radius:50%;pointer-events:none;` +
        `left:${20 + Math.random() * 260}px;bottom:${10 + Math.random() * 60}px;` +
        `width:${size}px;height:${size}px;background:${color};`

      el.appendChild(sp)

      const tx = (Math.random() - 0.5) * 60
      const ty = 150 + Math.random() * 100

      const anim = sp.animate(
        [
          { opacity: 0, transform: 'translate(0,0) scale(0)' },
          { opacity: 0.8, transform: `translate(${tx * 0.1}px,${-ty * 0.1}px) scale(1)`, offset: 0.1 },
          { opacity: 0.6, transform: `translate(${tx * 0.5}px,${-ty * 0.5}px) scale(0.7)`, offset: 0.5 },
          { opacity: 0, transform: `translate(${tx}px,${-ty}px) scale(0)` },
        ],
        {
          duration: 1200 + Math.random() * 400,
          delay: Math.random() * 200,
          easing: 'ease-out',
        },
      )
      anim.onfinish = () => sp.remove()
    }
  }, [trigger])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 10 }}
    />
  )
}
