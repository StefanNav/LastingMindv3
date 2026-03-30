import { motion } from 'framer-motion'

export function ReflectionThinking() {
  return (
    <>
      {/* Center area — dashed circle spinner */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative size-[161px]">
          {/* Dashed circle */}
          <motion.svg
            className="size-full"
            viewBox="0 0 161 161"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="80.5"
              cy="80.5"
              r="72"
              fill="none"
              stroke="#33602b"
              strokeWidth="1"
              strokeDasharray="4 8"
              strokeLinecap="round"
            />
          </motion.svg>
          {/* Orbiting green dot */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: 161, height: 161, marginLeft: -80.5, marginTop: -80.5 }}
          >
            <div className="absolute right-[-3px] top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-lm-green shadow-[0px_2px_4px_rgba(0,0,0,0.15),0_0_10px_3px_rgba(50,117,30,0.4)]" />
          </motion.div>
        </div>
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
          <span className="text-[18px] font-medium leading-[1.2] text-[var(--lm-text-primary)]">
            AI is thinking
          </span>
          <div className="flex h-[14px] w-[30px] items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="size-[8px] rounded-full bg-lm-green-dark"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
