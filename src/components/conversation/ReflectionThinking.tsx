import { motion } from 'framer-motion'
import { ThinkingDots } from '@/components/ui/ThinkingDots'

export function ReflectionThinking() {
  return (
    <>
      {/* Center area — thinking dots */}
      <div className="flex flex-1 items-center justify-center">
        <ThinkingDots size="md" />
      </div>

      {/* Bottom bar — "AI is thinking" */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center justify-center border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 py-[30px]"
      >
        <div className="flex items-center gap-[10px] p-[10px]">
          <span className="text-[18px] font-medium leading-[1.2] text-foreground">
            Thinking
          </span>
          <ThinkingDots />
        </div>
      </motion.div>
    </>
  )
}
