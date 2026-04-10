import { motion } from 'framer-motion'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function ChatPreviewSlide() {
  return (
    <motion.div
      className="flex w-full flex-col gap-4 rounded-2xl border border-lm-border/50 bg-lm-bg-card p-4 shadow-card"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUp} className="flex items-start justify-end gap-2">
        <div className="rounded-2xl rounded-tr-md bg-muted px-3 py-2">
          <p className="font-sans text-[13px] leading-relaxed text-foreground">
            What were you like in your twenties?
          </p>
        </div>
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-lm-gold text-[8px] font-bold text-white">
          SN
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-start gap-2">
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-lm-green text-[8px] font-bold text-white">
          LM
        </div>
        <div className="flex flex-col gap-1 rounded-2xl rounded-tl-md bg-background px-3 py-2 shadow-sm">
          <p className="font-sans text-[11px] font-semibold text-lm-green">
            LastingMind
          </p>
          <p className="font-sans text-[13px] leading-relaxed text-foreground">
            I was adventurous, strong-willed, and always curious about the world. I loved music, laughed easily, and had a way of making people feel at home.
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-start justify-end gap-2">
        <div className="rounded-2xl rounded-tr-md bg-muted px-3 py-2">
          <p className="font-sans text-[13px] leading-relaxed text-foreground">
            Tell me about your family traditions.
          </p>
        </div>
        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-lm-gold text-[8px] font-bold text-white">
          SN
        </div>
      </motion.div>
    </motion.div>
  )
}
