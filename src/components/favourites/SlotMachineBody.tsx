import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SlotMachineBodyProps {
  children: ReactNode
  isSpinning: boolean
}

export function SlotMachineBody({ children, isSpinning }: SlotMachineBodyProps) {
  return (
    <motion.div
      className="relative mx-auto w-full overflow-hidden rounded-[40px] border border-[var(--lm-border)] bg-[var(--lm-bg-card)]"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
      animate={
        isSpinning
          ? {
              scale: [1, 1.01, 1],
              transition: { duration: 0.6, repeat: 2, ease: 'easeInOut' },
            }
          : { scale: 1 }
      }
    >
      {/* Machine window inset */}
      <div
        className="relative m-3 overflow-hidden rounded-xl border border-black/8 bg-[var(--lm-bg-primary)]"
        style={{
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}
