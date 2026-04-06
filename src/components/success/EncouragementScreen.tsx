import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface EncouragementScreenProps {
  headline: string
  treeImage: string
  onContinue: () => void
}

export function EncouragementScreen({
  headline,
  treeImage,
  onContinue,
}: EncouragementScreenProps) {
  return (
    <motion.div
      key="encouragement"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline */}
      <div className="px-4 pt-[81px]">
        <p className="font-display text-[26px] font-semibold leading-[1.2] text-foreground text-center">
          {headline}
        </p>
      </div>

      {/* Tree image */}
      <div className="flex flex-1 items-center justify-center">
        <div className="h-[248px] w-full max-w-[403px] overflow-hidden">
          <img
            src={treeImage}
            alt="Your growing tree"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Continue button */}
      <div className="border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 py-[30px]">
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full flex-col items-center gap-2.5 rounded-[10px] bg-lm-green px-10 py-4"
        >
          <ArrowRight className="size-6 text-white" />
          <span className="text-[18px] font-medium leading-[1.2] text-white">
            Continue
          </span>
        </button>
      </div>
    </motion.div>
  )
}
