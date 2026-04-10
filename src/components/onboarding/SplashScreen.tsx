import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface SplashScreenProps {
  onStart: () => void
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Background */}
      <img
        src="/images/onboarding/OnboardingBackground.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center px-4 pt-20"
        >
          <img
            src="/images/onboarding/LM Logo.png"
            alt="LastingMind logo"
            className="h-[104px] w-[133px]"
          />
          <h1 className="mt-0 font-display text-[38px] font-semibold leading-[1.2] tracking-tight text-foreground">
            LastingMind
          </h1>
          <p className="mt-1.5 font-sans text-[18px] font-medium leading-[1.2] text-foreground">
            A legacy your loved ones can return to
          </p>
        </motion.div>

        {/* Tree illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-1 items-start justify-center px-6"
        >
          <img
            src="/images/onboarding/SplashPageTree.png"
            alt=""
            className="h-[338px] w-[348px] object-contain"
          />
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="px-4 pb-[50px] pt-4"
        >
          <Button
            onClick={onStart}
            className="h-[54px] w-full rounded-[4px] bg-lm-green text-[18px] font-medium text-white transition-transform active:scale-[0.97] active:brightness-90"
          >
            Start here
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
