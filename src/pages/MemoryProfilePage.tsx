import { useState } from 'react'
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
  const { activeDemoId } = useApp()
  const profile = getProfileData(activeDemoId)
  const [menuOpen, setMenuOpen] = useState(false)

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
          <div className="flex-1" />
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Memory profile
          </h2>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted"
              aria-label="More options"
            >
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        </div>

        {/* Identity block */}
        <IdentityBlock user={profile.user} />

        {/* Stats row */}
        <StatsRow profile={profile} />

        {/* ── Foundation ── */}
        <div className="mt-2" />
        <ProfileSectionLabel label="Foundation" />
        <ProfileFoundationGrid categories={profile.foundationCategories} />

        {/* ── Life Story ── */}
        <div className="mt-2" />
        <ProfileSectionLabel label="Life Story" variant="gold" />
        <LifeStorySection
          chapters={profile.lifeChapters}
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

      {/* Menu bottom sheet */}
      <ProfileMenuSheet isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </PageTransition>
  )
}
