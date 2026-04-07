import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ChatTutorialIntroProps {
  onStart: () => void
}

export function ChatTutorialIntro({ onStart }: ChatTutorialIntroProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.img
          src="/images/treeFinal.png"
          alt=""
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 h-[180px] object-contain"
        />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground"
        >
          Meet your LastingMind
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 max-w-[310px] font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
        >
          Your LastingMind has been learning from everything you've shared. Ask it anything about your life, your stories, your family. Let's see what it knows.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-4 pb-4 pt-2"
      >
        <Button
          onClick={onStart}
          className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
        >
          Start the conversation
        </Button>
      </motion.div>
    </div>
  )
}
