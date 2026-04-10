import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PrivacyPromiseSlideProps {
  onContinue: () => void
  onBack?: () => void
}

export function PrivacyPromiseSlide({ onContinue, onBack }: PrivacyPromiseSlideProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <img
        src="/images/onboarding/OnboardingBackground.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {onBack && (
        <div className="absolute top-[62px] left-4 z-20">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
            aria-label="Go back"
          >
            <ArrowLeft className="size-6 text-white" />
          </button>
        </div>
      )}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.img
          src="/images/onboarding/Lock_Security.png"
          alt=""
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 h-[120px] w-[120px] object-contain"
        />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground"
        >
          What you share here is yours
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-3 max-w-[320px] font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
        >
          Your stories, your memories, your voice. No one sees them unless you choose to share. You're always in control of who has access.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative z-10 px-4 pb-4 pt-2"
      >
        <Button
          onClick={onContinue}
          className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white active:scale-[0.97] active:brightness-90 transition-transform"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  )
}
