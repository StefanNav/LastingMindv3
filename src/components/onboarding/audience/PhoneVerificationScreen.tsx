import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface PhoneVerificationScreenProps {
  phoneNumber: string
  creatorName: string
  onVerified: () => void
  onWrongNumber: () => void
  onBack?: () => void
}

export function PhoneVerificationScreen({
  phoneNumber: _phoneNumber,
  creatorName,
  onVerified,
  onWrongNumber,
  onBack,
}: PhoneVerificationScreenProps) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const [error, setError] = useState('')
  const [canResend, setCanResend] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true)
      return
    }
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  // Auto-submit when all 6 digits filled
  const handleAutoSubmit = useCallback((newDigits: string[]) => {
    if (newDigits.every((d) => d.length === 1)) {
      // Mock: any 6-digit code is valid
      setError('')
      setTimeout(() => onVerified(), 300)
    }
  }, [onVerified])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    setError('')

    const newDigits = [...digits]

    // Handle paste of full code
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('')
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || ''
      }
      setDigits(newDigits)
      const nextFocus = Math.min(pasted.length, 5)
      inputRefs.current[nextFocus]?.focus()
      handleAutoSubmit(newDigits)
      return
    }

    newDigits[index] = value
    setDigits(newDigits)

    // Auto-advance to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    handleAutoSubmit(newDigits)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setCanResend(false)
    setResendTimer(30)
    setDigits(Array(6).fill(''))
    setError('')
    inputRefs.current[0]?.focus()
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
            Enter your code
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
          >
            Once verified, you'll be connected to {creatorName}'s LastingMind.
          </motion.p>
        </div>

        {/* OTP inputs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 px-4"
        >
          <div className="flex justify-center gap-2">
            {digits.map((digit, i) => {
              const firstEmpty = digits.findIndex((d) => !d)
              const pulse = !digit && focusedIndex === null && i === firstEmpty
              return (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={() => setFocusedIndex(i)}
                  onBlur={() => setFocusedIndex(null)}
                  autoFocus={i === 0}
                  className={`h-[52px] w-[44px] rounded-lg border bg-background text-center font-sans text-[22px] font-semibold text-foreground outline-none transition-colors focus:border-lm-green focus:ring-1 focus:ring-lm-green/30 ${
                    error ? 'border-destructive' : 'border-lm-border'
                  }${pulse ? ' animate-pulse-glow' : ''}`}
                />
              )
            })}
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-center font-sans text-[13px] text-destructive"
            >
              {error}
            </motion.p>
          )}

          {/* Resend + wrong number links */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResend}
              className="font-sans text-[14px] font-medium text-lm-green transition-colors disabled:text-[var(--lm-text-secondary)]"
            >
              {canResend ? 'Resend code' : `Resend code in ${resendTimer}s`}
            </button>
            <button
              type="button"
              onClick={onWrongNumber}
              className="font-sans text-[14px] font-medium text-[var(--lm-text-secondary)] transition-colors hover:text-foreground"
            >
              Wrong number?
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
