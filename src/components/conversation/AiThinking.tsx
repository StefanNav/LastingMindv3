import { motion } from 'framer-motion'
import { ThinkingDots } from '@/components/ui/ThinkingDots'

export function AiThinking() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-4 border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4"
    >
      <div className="flex items-center gap-2 rounded-[10px] bg-white/90 px-5 py-[10px] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)]">
        <span className="text-[18px] font-medium leading-[1.2] text-foreground">
          Thinking
        </span>
        <ThinkingDots />
      </div>
    </motion.div>
  )
}
