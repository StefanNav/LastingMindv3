import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AudienceChatIntroScreenProps {
  creatorName: string
  creatorFirstName: string
  avatarUrl: string | null
  onContinue: () => void
}

export function AudienceChatIntroScreen({
  creatorName,
  creatorFirstName,
  avatarUrl,
  onContinue,
}: AudienceChatIntroScreenProps) {
  const navigate = useNavigate()
  const initial = creatorName.charAt(0).toUpperCase()

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        {/* Back button */}
        <div className="flex shrink-0 items-center px-4 pt-[62px] pb-3">
          <button
            type="button"
            onClick={() => navigate('/audience-home')}
            className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
          >
            <ArrowLeft className="size-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={creatorName}
                className="size-28 rounded-full border-2 border-lm-green/20 object-cover"
              />
            ) : (
              <div className="flex size-28 items-center justify-center rounded-full border-2 border-lm-green/20 bg-primary/10">
                <span className="text-4xl font-bold text-primary">{initial}</span>
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-lm-green">
              <MessageCircle className="size-4 text-white" />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Talk with {creatorFirstName}
            </h2>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-muted-foreground">
              This is a digital version of {creatorFirstName}, built from the stories, memories, and
              values {creatorFirstName} has shared. You can ask questions, revisit memories, or
              simply have a conversation.
            </p>
            <p className="max-w-[280px] text-[13px] leading-relaxed text-muted-foreground/70">
              The more {creatorFirstName} shares over time, the richer these conversations become.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="w-full max-w-[280px]"
          >
            <Button
              onClick={onContinue}
              className="h-[50px] w-full rounded-xl bg-lm-green text-[15px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
            >
              Start conversation
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
