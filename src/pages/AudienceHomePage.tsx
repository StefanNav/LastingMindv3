import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, MessageCircle, Sparkles, Send, MoreHorizontal, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { mockLovedOnes } from '@/data/lovedOnesData'
import { useApp } from '@/app/AppProvider'
import { Button } from '@/components/ui/button'
import { AudienceMenuSheet } from '@/components/profile/AudienceMenuSheet'
import { ManageCreatorsSheet } from '@/components/sheets/ManageCreatorsSheet'
import type { LovedOneCreator } from '@/types'

function CreatorCard({ creator }: { creator: LovedOneCreator }) {
  const navigate = useNavigate()
  const initial = creator.name.charAt(0).toUpperCase()

  const actions = [
    { icon: Mic, label: 'Test voice', path: 'voice' },
    { icon: MessageCircle, label: `Chat with ${creator.name.split(' ')[0]}`, path: 'chat' },
    { icon: Sparkles, label: 'View legacy', path: 'legacy' },
    { icon: Send, label: 'Send questions', path: 'questions' },
  ]

  return (
    <div className="flex flex-col gap-5 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm">
      {/* Identity block */}
      <div className="flex items-stretch gap-3">
        <div className="flex shrink-0 flex-col items-center justify-between">
          {creator.avatarUrl ? (
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="size-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <span className="text-base font-bold text-primary">{initial}</span>
            </div>
          )}
          <p className="mt-1 text-[10px] font-semibold text-muted-foreground">{creator.relationship}</p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-lg font-normal leading-tight text-foreground">{creator.name}</p>
            <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>{creator.entryCount} entries</span>
              <span className="flex items-center gap-0.5"><Star className="size-3" fill="var(--lm-gold-star)" stroke="var(--lm-gold-star)" strokeWidth={1.5} /> {creator.starCount}</span>
            </div>
          </div>
          <p className="text-sm leading-snug text-foreground/80">{creator.bio}</p>
        </div>
      </div>

      {/* Action buttons — 2×2 grid */}
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.path}
            type="button"
            onClick={() => navigate(`/loved-ones/${creator.id}/${action.path}`)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-transparent px-3 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5 active:scale-[0.97]"
          >
            <action.icon className="size-3.5 shrink-0" />
            <span className="truncate">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function StartYourOwnCard() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-4 rounded-[10px] bg-lm-bg-card/40 p-6 shadow-card backdrop-blur-sm text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-lm-green/10">
        <img src="/images/onboarding/SplashPageTree.png" alt="Tree" className="size-10 object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Preserve your own story
        </h3>
        <p className="text-sm leading-snug text-muted-foreground">
          Your family might want to hear from you too. Start building your LastingMind.
        </p>
      </div>
      <Button
        onClick={() => navigate('/onboarding')}
        className="h-[46px] w-full rounded-xl bg-lm-green text-[15px] font-semibold text-white transition-transform active:scale-[0.97] active:brightness-90"
      >
        Get started
      </Button>
    </div>
  )
}

function WelcomeToast({ creatorName, onDismiss }: { creatorName: string; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onClick={onDismiss}
      className="absolute left-4 right-4 top-14 z-40 cursor-pointer rounded-xl bg-lm-green px-4 py-3 shadow-lg"
    >
      <p className="text-center text-[14px] font-medium text-white">
        You're connected to {creatorName}'s LastingMind
      </p>
    </motion.div>
  )
}

export function AudienceHomePage() {
  const { audienceCreatorName, hasSeenAudienceWelcome, setHasSeenAudienceWelcome } = useApp()
  const [showToast, setShowToast] = useState(!hasSeenAudienceWelcome)
  const [menuOpen, setMenuOpen] = useState(false)
  const [manageOpen, setManageOpen] = useState(false)
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())
  const creators = mockLovedOnes.filter((c) => !removedIds.has(c.id))

  const dismissToast = () => {
    setShowToast(false)
    setHasSeenAudienceWelcome(true)
  }

  return (
    <PageTransition>
      {/* Background image */}
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-[100vh] w-full object-cover"
        />
      </div>

      {/* Welcome toast */}
      <AnimatePresence>
        {showToast && (
          <WelcomeToast creatorName={audienceCreatorName} onDismiss={dismissToast} />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col gap-5 p-6 pt-14">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-semibold text-foreground">Loved Ones</h2>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="mt-0.5 shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
            aria-label="More options"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        {/* Legacy Creators section */}
        <div className="mt-2 flex items-center gap-3">
          <div className="h-px flex-1 bg-lm-gold/30" />
          <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
            Legacy Creators
          </p>
          <div className="h-px flex-1 bg-lm-gold/30" />
        </div>

        <div className="flex flex-col gap-4">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>

        {/* Start Your Own section */}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-lm-gold/30" />
          <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
            Start Your Own
          </p>
          <div className="h-px flex-1 bg-lm-gold/30" />
        </div>

        <StartYourOwnCard />

        <div className="pb-4" />
      </div>

      <AudienceMenuSheet
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onManageCreators={() => setManageOpen(true)}
      />
      <ManageCreatorsSheet
        isOpen={manageOpen}
        onClose={() => setManageOpen(false)}
        creators={creators}
        onRemove={(id) => setRemovedIds((prev) => new Set(prev).add(id))}
      />
    </PageTransition>
  )
}
