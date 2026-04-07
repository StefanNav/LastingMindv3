import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GetStartedSlideProps {
  onStart: () => void
  onBack?: () => void
}

export function GetStartedSlide({ onStart, onBack }: GetStartedSlideProps) {
  return (
    <div className="flex h-full flex-col">
      {onBack && (
        <div className="absolute top-[62px] left-4 z-10">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
            aria-label="Go back"
          >
            <ArrowLeft className="size-6 text-white" />
            <span className="text-[14px] font-semibold leading-[1.2] text-white">
              Back
            </span>
          </button>
        </div>
      )}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.img
          src="/images/treeFinal.png"
          alt=""
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 h-[200px] object-contain"
        />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground"
        >
          Your Lasting Mind is ready
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
        >
          Start building something that lasts.
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
          className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white active:scale-[0.97] active:brightness-90 transition-transform"
        >
          Let's get started
        </Button>
      </motion.div>
    </div>
  )
}
