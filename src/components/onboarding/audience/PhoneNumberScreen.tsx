import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PhoneNumberScreenProps {
  onNext: (phoneNumber: string) => void
  onBack?: () => void
}

export function PhoneNumberScreen({ onNext, onBack }: PhoneNumberScreenProps) {
  const [phone, setPhone] = useState('')

  // Simple US phone format — strip non-digits, validate length
  const [hasFocused, setHasFocused] = useState(false)
  const digitsOnly = phone.replace(/\D/g, '')
  const isValid = digitsOnly.length >= 10
  const showPulse = !hasFocused && digitsOnly.length === 0

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

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
          <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5" aria-label="Go back">
            <ArrowLeft className="size-6 text-white" />
          </button>
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
            What's your phone number?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
          >
            We'll use this to verify your account and keep your connection secure.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 px-4"
        >
          <div className="flex items-center gap-2">
            {/* Country code */}
            <div className="flex h-[42px] shrink-0 items-center rounded-lg border border-lm-border bg-background px-3">
              <span className="font-sans text-[15px] text-foreground">🇺🇸 +1</span>
            </div>
            {/* Phone number input */}
            <input
              type="tel"
              placeholder="(555) 000-0000"
              value={phone}
              onChange={handleChange}
              onFocus={() => setHasFocused(true)}
              onBlur={() => { if (!digitsOnly) setHasFocused(false) }}
              autoFocus
              className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${showPulse ? ' animate-pulse-glow' : ''}`}
            />
          </div>
        </motion.div>

        <div className="flex-1" />

        {/* CTA */}
        <div className="px-4 pb-[50px] pt-2">
          <Button
            onClick={() => onNext(digitsOnly)}
            disabled={!isValid}
            className="h-[54px] w-full rounded-[4px] bg-lm-green text-[18px] font-medium text-white transition-transform active:scale-[0.97] active:brightness-90 disabled:opacity-40"
          >
            Send code
          </Button>
        </div>
      </div>
    </div>
  )
}
