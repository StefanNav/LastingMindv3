import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { RewardPrimaryCTA } from './RewardCTAs'

/**
 * Star threshold for unlocking Voice Clone in Phase 2.
 * TBD — update this constant once the exact number is decided.
 */
export const PHASE2_VOICE_CLONE_STAR_THRESHOLD = 2

interface Phase2VoiceCloneUnlockScreenProps {
  onContinue: () => void
}

export function Phase2VoiceCloneUnlockScreen({ onContinue }: Phase2VoiceCloneUnlockScreenProps) {
  return (
    <motion.div
      key="phase2-voice-unlock"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-full flex-col items-center bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Spacer */}
      <div className="flex-1" />

      {/* Gold divider */}
      <div className="flex w-full items-center gap-3 px-6">
        <div className="h-px flex-1 bg-lm-gold/30" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold"
        >
          New Unlock
        </motion.p>
        <div className="h-px flex-1 bg-lm-gold/30" />
      </div>

      {/* Unlock content */}
      <div className="flex flex-col items-center gap-6 px-8 pt-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex size-20 items-center justify-center rounded-full bg-primary/10"
        >
          <Mic className="size-10 text-lm-green" />
        </motion.div>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-display text-2xl font-semibold leading-tight text-foreground text-center"
        >
          Give your LastingMind your voice.
        </motion.p>

        {/* Supporting */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-[15px] font-medium leading-snug text-muted-foreground text-center"
        >
          Record a voice sample and your LastingMind will narrate your stories, memories, and letters in your own voice — so your family hears you, not a machine.
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
        className="w-full px-4 pb-[30px] pt-4 mt-auto"
      >
        <RewardPrimaryCTA label="Continue" onClick={onContinue} />
      </motion.div>
    </motion.div>
  )
}
