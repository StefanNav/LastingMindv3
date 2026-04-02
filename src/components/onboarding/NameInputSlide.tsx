import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface NameInputSlideProps {
  heading: string
  subtitle: string
  onNext: (firstName: string, lastName: string) => void
  initialFirstName?: string
  initialLastName?: string
}

export function NameInputSlide({
  heading,
  subtitle,
  onNext,
  initialFirstName = '',
  initialLastName = '',
}: NameInputSlideProps) {
  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)

  const canContinue = firstName.trim().length > 0

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-36 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 px-4"
      >
        <p className="mb-3 font-sans text-[15px] font-medium text-foreground">
          What's your name?
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-[42px] rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-[42px] rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30"
          />
        </div>

        <Button
          onClick={() => onNext(firstName.trim(), lastName.trim())}
          disabled={!canContinue}
          className="mt-4 h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90 disabled:opacity-40"
        >
          Continue
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative w-full overflow-hidden"
        style={{ height: '45%' }}
      >
        <img
          src="/images/onboarding/sprount-2.png"
          alt=""
          className="absolute bottom-0 left-0 w-full object-cover object-bottom"
        />
      </motion.div>
    </div>
  )
}
