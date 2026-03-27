import { motion } from 'framer-motion'

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
        <span className="text-[18px] font-medium leading-[1.2] text-[var(--lm-text-primary)]">
          AI is thinking
        </span>
        <div className="flex gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="size-[6px] rounded-full bg-lm-green-dark"
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
      </div>
    </motion.div>
  )
}
