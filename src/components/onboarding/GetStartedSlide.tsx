import { motion } from 'framer-motion'
import { BackButton } from '@/components/shared/BackButton'
import { Button } from '@/components/ui/button'

interface GetStartedSlideProps {
  onStart: () => void
  onBack?: () => void
}

export function GetStartedSlide({ onStart, onBack }: GetStartedSlideProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Background */}
      <img
        src="/images/onboarding/OnboardingBackground.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {onBack && (
        <div className="absolute top-[62px] left-4 z-20">
          <BackButton onClick={onBack} />
        </div>
      )}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
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
          Your LastingMind is ready
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
        className="relative z-10 px-4 pb-4 pt-2"
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
