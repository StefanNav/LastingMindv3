import { motion } from 'framer-motion'

const sizes = {
  sm: 'size-[6px]',
  md: 'size-[10px]',
} as const

interface ThinkingDotsProps {
  size?: keyof typeof sizes
}

export function ThinkingDots({ size = 'sm' }: ThinkingDotsProps) {
  return (
    <div className="flex gap-[3px]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizes[size]} rounded-full bg-lm-green-dark`}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
