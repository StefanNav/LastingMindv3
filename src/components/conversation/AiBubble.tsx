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
      className="mx-[15px] rounded-[15px] bg-white/90 px-[10px] py-5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)]"
    >
      {messages.map((msg, i) => (
        <p
          key={i}
          className="font-display text-[20px] font-semibold leading-[28px] tracking-[0.45px] text-[#3e2f26]"
          style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100", marginTop: i > 0 ? '10px' : 0 }}
        >
          {msg}
        </p>
      ))}
    </motion.div>
  )
}
