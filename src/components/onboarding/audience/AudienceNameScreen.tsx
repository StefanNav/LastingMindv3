import { useState } from 'react'
import { motion } from 'framer-motion'
import { BackButton } from '@/components/shared/BackButton'
import { Button } from '@/components/ui/button'

interface AudienceNameScreenProps {
  onNext: (firstName: string, lastName: string) => void
  onBack?: () => void
  initialFirstName?: string
  initialLastName?: string
}

export function AudienceNameScreen({
  onNext,
  onBack,
  initialFirstName = '',
  initialLastName = '',
}: AudienceNameScreenProps) {
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)

  const [pulseTarget, setPulseTarget] = useState<'first' | 'last' | 'none'>('first')

  const canContinue = firstName.trim().length > 0 && lastName.trim().length > 0

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

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="px-4 pt-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground"
          >
            What's your name?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
          >
            Welcome to LastingMind. Let's get you set up so you can start connecting with the people who matter to you.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-8 px-4"
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setPulseTarget('none')}
              onBlur={() => {
                if (!firstName.trim()) setPulseTarget('first')
                else setPulseTarget(lastName.trim() ? 'none' : 'last')
              }}
              autoFocus
              className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'first' ? ' animate-pulse-glow' : ''}`}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => setPulseTarget('none')}
              onBlur={() => {
                if (!lastName.trim()) setPulseTarget('last')
                else setPulseTarget('none')
              }}
              className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'last' ? ' animate-pulse-glow' : ''}`}
            />
          </div>
        </motion.div>

        <div className="flex-1" />

        {/* CTA */}
        <div className="px-4 pb-[50px] pt-2">
          <Button
            onClick={() => onNext(firstName.trim(), lastName.trim())}
            disabled={!canContinue}
            className="h-[54px] w-full rounded-[4px] bg-lm-green text-[18px] font-medium text-white transition-transform active:scale-[0.97] active:brightness-90 disabled:opacity-40"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
