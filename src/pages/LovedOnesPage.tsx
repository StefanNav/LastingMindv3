import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MessageCircle, Sparkles, Send, MoreHorizontal, UserPlus, Star } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { mockLovedOnes } from '@/data/lovedOnesData'
import { InviteBottomSheet } from '@/components/sheets/InviteBottomSheet'
import { useApp } from '@/app/AppProvider'
import type { LovedOneCreator, AudienceMember } from '@/types'

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
        {/* Avatar column — stretches to match text height */}
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
        {/* Name + stats + bio */}
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

function AudienceMemberRow({ member }: { member: AudienceMember }) {
  return (
    <div className="flex items-center justify-between rounded-[10px] bg-lm-bg-card/40 px-5 py-4 shadow-card backdrop-blur-sm">
      <div>
        <p className="font-display text-lg font-normal leading-tight text-foreground">
          {member.firstName} {member.lastName}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{member.relationship}</p>
      </div>
      {member.status === 'pending' && (
        <span className="shrink-0 rounded-full border border-lm-gold/30 bg-lm-gold/10 px-2.5 py-1 text-[12px] font-semibold text-lm-gold">
          Pending
        </span>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <Sparkles className="size-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">No loved ones yet</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        When someone invites you to view their LastingMind, they'll appear here.
      </p>
    </div>
  )
}

export function LovedOnesPage() {
  const creators = mockLovedOnes
  const { audienceMembers } = useApp()
  const [inviteSheetOpen, setInviteSheetOpen] = useState(false)
  const [toastName, setToastName] = useState<string | null>(null)

  useEffect(() => {
    if (toastName) {
      const timer = setTimeout(() => setToastName(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toastName])

  return (
    <PageTransition>
      {/* Background image — sticky within scroll container */}
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-[100vh] w-full object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-col gap-5 p-6 pt-14">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl font-semibold text-foreground">Loved Ones</h2>
            <p className="text-sm leading-snug text-muted-foreground">
              Legacy Creators build their own stories. Audience Members can view yours.
            </p>
          </div>
          <button
            type="button"
            className="mt-0.5 shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
            aria-label="More options"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        {/* Section label */}
        {creators.length > 0 && (
          <div className="mt-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-lm-gold/30" />
            <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
              Legacy Creators
            </p>
            <div className="h-px flex-1 bg-lm-gold/30" />
          </div>
        )}

        {/* Creator list or empty state */}
        {creators.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        )}

        {/* Audience Members section */}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-lm-gold/30" />
          <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
            Audience Members
          </p>
          <div className="h-px flex-1 bg-lm-gold/30" />
        </div>

        <div className="flex flex-col gap-3">
          {audienceMembers.map((member) => (
            <AudienceMemberRow key={member.id} member={member} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setInviteSheetOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          <UserPlus className="size-4" />
          Invite an Audience Member
        </button>

        <div className="pb-4" />
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-lm-green/90 px-5 py-3 shadow-lg"
          >
            <p className="whitespace-nowrap text-[13px] font-semibold text-white">
              Invite sent to {toastName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <InviteBottomSheet
        isOpen={inviteSheetOpen}
        onClose={() => setInviteSheetOpen(false)}
        onSuccess={(firstName) => setToastName(firstName)}
      />
    </PageTransition>
  )
}
