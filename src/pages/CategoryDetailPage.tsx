import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { getCategoryDetailData } from '@/data/rewardCardCollectionData'
import { getCategoryEntries } from '@/data/categoryDetailEntries'
import { BackButton } from '@/components/shared/BackButton'
import { SectionDivider } from '@/components/shared/SectionDivider'
import { StaticRewardCard } from '@/components/profile/RewardCardCarousel'
import { CategoryEntryCard } from '@/components/profile/CategoryEntryCard'
import { CategoryDetailMenuSheet } from '@/components/profile/CategoryDetailMenuSheet'
import { FamilyWebDisplay } from '@/components/profile/FamilyWebDisplay'
import { FriendCardList } from '@/components/profile/FriendCardList'
import { PersonDetailSheet } from '@/components/profile/PersonDetailSheet'
import type { PersonEntry } from '@/types'

export function CategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const { activeDemoId, audienceCreatorName } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set())
  const [selectedPerson, setSelectedPerson] = useState<PersonEntry | null>(null)

  if (!categoryId) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">Category not found.</p>
        </div>
      </PageTransition>
    )
  }

  const { cards, summary } = getCategoryDetailData(activeDemoId, categoryId)
  const { supportingText, entries } = getCategoryEntries(activeDemoId, categoryId)
  const hasCards = cards.length > 0

  // Category type flags
  const isFamily = categoryId === 'cat-family'
  const isFriends = categoryId === 'cat-friends'
  const isPersonCategory = isFamily || isFriends
  const isCareerEduCategory = categoryId === 'cat-career' || categoryId === 'cat-education'
  const hasTwoSections = isPersonCategory || isCareerEduCategory

  // Split people (no storyTitle) from stories (with storyTitle)
  const memberEntries = hasTwoSections
    ? entries.filter((e) => {
        if (e.kind === 'person') return !e.storyTitle
        if (e.kind === 'career-education') return !e.storyTitle
        return false
      })
    : []
  const storyEntries = hasTwoSections
    ? entries.filter((e) => {
        if (e.kind === 'person') return !!e.storyTitle
        if (e.kind === 'career-education') return !!e.storyTitle
        return false
      })
    : entries

  // Person members cast for Family/Friends components
  const personMembers = memberEntries.filter((e): e is PersonEntry => e.kind === 'person')

  const memberSectionLabel = isFamily
    ? 'Family Members'
    : isFriends
      ? 'Friends'
      : categoryId === 'cat-career' ? 'Positions' : 'Schools'

  // Creator first name for center of family web
  const creatorFirstName = audienceCreatorName.split(' ')[0] ?? 'You'

  const toggleEdit = useCallback((entryId: string) => {
    setEditingIds((prev) => {
      const next = new Set(prev)
      if (next.has(entryId)) {
        next.delete(entryId)
      } else {
        next.add(entryId)
      }
      return next
    })
  }, [])

  const editAll = useCallback(() => {
    setEditingIds(new Set(entries.map((e) => e.entryId)))
  }, [entries])

  const handlePersonTap = useCallback((entry: PersonEntry) => {
    setSelectedPerson(entry)
  }, [])

  return (
    <PageTransition>
      <div className="bg-[var(--lm-bg-primary)]">
        {/* Background image — sticky within scroll container */}
        <div className="pointer-events-none sticky top-0 z-0 h-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-[100vh] w-full object-cover"
          />
        </div>

        <div className="relative z-10 flex flex-col gap-5 p-6 pt-14">
          {/* Header: back + title + menu */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton onClick={() => navigate('/profile')} ariaLabel="Back to profile" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {summary.categoryLabel}
              </h2>
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

          {/* Supporting text */}
          <p className="text-sm leading-snug text-muted-foreground">
            {supportingText}
          </p>

          {/* ── YOUR CARDS ── */}
          {hasCards && (
            <>
              <div className="mt-2" />
              <SectionDivider label="Your Cards" variant="gold" />
              <div className="-mx-6 overflow-x-auto">
                <div
                  className="grid auto-cols-[260px] grid-flow-col gap-3 px-6"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="[&>.reward-card]:h-full [&>.reward-card]:justify-between"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <StaticRewardCard card={card} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── FAMILY WEB (cat-family only) ── */}
          {isFamily && (
            <>
              <div className="mt-2" />
              <SectionDivider label="Family Members" variant="gold" />
              {personMembers.length > 0 ? (
                <>
                  <p className="text-center text-sm text-muted-foreground">
                    Tap a name to read about them
                  </p>
                  <FamilyWebDisplay
                    members={personMembers}
                    creatorFirstName={creatorFirstName}
                    onMemberTap={handlePersonTap}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm text-center">
                  <p className="text-sm text-muted-foreground">
                    No family members added yet.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── FRIENDS CARDS (cat-friends only) ── */}
          {isFriends && (
            <>
              <div className="mt-2" />
              <SectionDivider label="Friends" variant="gold" />
              {personMembers.length > 0 ? (
                <FriendCardList
                  friends={personMembers}
                  onFriendTap={handlePersonTap}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm text-center">
                  <p className="text-sm text-muted-foreground">
                    No friends added yet.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── MEMBERS / POSITIONS section (Career, Education only) ── */}
          {isCareerEduCategory && (
            <>
              <div className="mt-2" />
              <SectionDivider label={memberSectionLabel} variant="gold" />
              {memberEntries.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {memberEntries.map((entry) => (
                    <CategoryEntryCard
                      key={entry.entryId}
                      entry={entry}
                      isEditing={editingIds.has(entry.entryId)}
                      onToggleEdit={() => toggleEdit(entry.entryId)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm text-center">
                  <p className="text-sm text-muted-foreground">
                    No {memberSectionLabel.toLowerCase()} added yet.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── STORIES / ENTRIES section ── */}
          <div className="mt-2" />
          <SectionDivider label={hasTwoSections ? 'Stories' : 'Your Entries'} variant="gold" />

          {(hasTwoSections ? storyEntries : entries).length > 0 ? (
            <div className="flex flex-col gap-3">
              {(hasTwoSections ? storyEntries : entries).map((entry) => (
                <CategoryEntryCard
                  key={entry.entryId}
                  entry={entry}
                  isEditing={editingIds.has(entry.entryId)}
                  onToggleEdit={() => toggleEdit(entry.entryId)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm text-center">
              <p className="text-sm text-muted-foreground">
                {hasTwoSections ? 'No stories shared yet.' : 'Nothing here yet.'}
              </p>
            </div>
          )}

          {/* Bottom padding for nav bar */}
          <div className="pb-4" />
        </div>
      </div>

      {/* Menu bottom sheet */}
      <CategoryDetailMenuSheet
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onEditAll={editAll}
      />

      {/* Person detail bottom sheet (Family & Friends) */}
      <PersonDetailSheet
        isOpen={!!selectedPerson}
        person={selectedPerson}
        categoryLabel={summary.categoryLabel}
        onClose={() => setSelectedPerson(null)}
      />
    </PageTransition>
  )
}
