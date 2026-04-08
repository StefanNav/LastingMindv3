import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Star } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { useApp } from '@/app/AppProvider'

export function ChatLockedPage() {
  const navigate = useNavigate()
  const { foundationStars } = useApp()

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex size-20 items-center justify-center rounded-full bg-lm-bg-card shadow-card"
          >
            <Lock className="size-9 text-lm-neutral-warm" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 font-display text-[26px] font-semibold leading-tight text-foreground"
          >
            Chat with your LastingMind
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-muted-foreground"
          >
            Complete your Foundation to unlock this feature. Your LastingMind needs to know enough about you before it can start talking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-5 flex items-center gap-1.5 rounded-full bg-lm-bg-card px-4 py-2 shadow-card"
          >
            <Star className="size-4" fill="var(--lm-gold-star)" stroke="var(--lm-gold-star)" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-foreground">
              {foundationStars} of 6 stars earned
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative z-10 px-4 pb-4 pt-2"
        >
          <Button
            onClick={() => navigate('/home')}
            className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
          >
            Continue building your Foundation
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  )
}
