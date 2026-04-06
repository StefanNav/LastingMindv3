import { useState, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { getProfileData } from '@/data/profileData'
import { IdentityBlock } from '@/components/profile/IdentityBlock'
import { StatsRow } from '@/components/profile/StatsRow'
import { ProfileSectionLabel } from '@/components/profile/ProfileSectionLabel'
import { ProfileFoundationGrid } from '@/components/profile/ProfileFoundationGrid'
import { LifeStorySection } from '@/components/profile/LifeStorySection'
import { ProfileLegacyGrid } from '@/components/profile/ProfileLegacyGrid'
import { BiographyCTA } from '@/components/profile/BiographyCTA'
import { ProfileMenuSheet } from '@/components/profile/ProfileMenuSheet'

export function MemoryProfilePage() {
  const { activeDemoId, lifeChapters } = useApp()
  const profile = getProfileData(activeDemoId)
  const [menuOpen, setMenuOpen] = useState(false)

  // Prefer runtime chapters (user-defined) over demo data
  const resolvedChapters = useMemo(() => {
    if (lifeChapters.length > 0) {
      return lifeChapters.map((ch, i) => {
        const parts: string[] = []
        if (ch.startYear !== null) parts.push(String(ch.startYear))
        if (ch.endYear !== null) parts.push(ch.endYear === 'Present' ? 'Present' : String(ch.endYear))
        return {
          chapterNumber: i + 1,
          dateRange: parts.join(' – '),
          title: ch.title,
        }
      })
    }
    return profile.lifeChapters
  }, [lifeChapters, profile.lifeChapters])

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
        {/* Menu button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
            aria-label="More options"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </div>

        {/* Identity block */}
        <IdentityBlock user={profile.user} />

        {/* Stats row */}
        <StatsRow profile={profile} />

        {/* ── Foundation ── */}
        <div className="mt-2" />
        <ProfileSectionLabel label="Foundation" variant="gold" />
        <ProfileFoundationGrid categories={profile.foundationCategories} />

        {/* ── Life Story ── */}
        <div className="mt-2" />
        <ProfileSectionLabel label="Life Story" variant="gold" />
        <LifeStorySection
          chapters={resolvedChapters}
          phase1Complete={profile.phase1Complete}
        />

        {/* ── Legacy ── */}
        <div className="mt-2" />
        <ProfileSectionLabel label="Legacy" variant="gold" />
        <ProfileLegacyGrid
          modules={profile.legacyModules}
          phase1Complete={profile.phase1Complete}
        />

        {/* Biography CTA */}
        <BiographyCTA
          biographyReady={profile.biographyReady}
          phase1Complete={profile.phase1Complete}
        />

        {/* Bottom padding for nav bar */}
        <div className="pb-4" />
      </div>
      </div>

      {/* Menu bottom sheet */}
      <ProfileMenuSheet isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </PageTransition>
  )
}
