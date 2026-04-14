import { motion } from 'framer-motion'

interface AiBubbleProps {
  messages: string[]
}

export function AiBubble({ messages }: AiBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mx-[15px] my-[10px]"
    >
      <div className="flex flex-col gap-[10px] rounded-[8px] bg-[var(--lm-bg-reflection)] px-4 py-2 shadow-reflection">
        <p className="text-sm font-semibold leading-tight text-muted-foreground">
          Open Reflection
        </p>
        {messages.map((msg, i) => (
          <p
            key={i}
            className="text-base font-normal leading-relaxed text-foreground"
            style={{ marginTop: i > 0 ? '10px' : 0 }}
          >
            {msg}
          </p>
        ))}
      </div>
      {/* Triangle pointer with matching shadow */}
      <svg
        className="ml-5"
        width="20"
        height="10"
        viewBox="0 0 20 10"
        style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.12))' }}
      >
        <polygon points="0,0 10,10 20,0" fill="var(--lm-bg-reflection)" />
      </svg>
    </motion.div>
  )
}
