import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { HomeHeader } from '@/components/home/HomeHeader'
import { PromptCard } from '@/components/home/PromptCard'
import { PhaseToggle } from '@/components/home/PhaseToggle'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
import { CategoryBottomSheet } from '@/components/sheets/CategoryBottomSheet'
import { LockedFeatureCard } from '@/components/home/LockedFeatureCard'
import { LockedFeatureSheet } from '@/components/sheets/LockedFeatureSheet'
import type { LockedFeature } from '@/components/sheets/LockedFeatureSheet'
import { LifeChaptersSheet } from '@/components/sheets/LifeChaptersSheet'
import { module2IntroData } from '@/data/mock'
import { useApp } from '@/app/AppProvider'
import type { Category } from '@/types'

export function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { homePhases, categoryDetails, promptCard, treeImage, activeDemoId } = useApp()
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const activePhase = homePhases[activePhaseIndex]
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const isSheetOpen = selectedCategory !== null
  const [selectedFeature, setSelectedFeature] = useState<LockedFeature | null>(null)
  const [lifeChaptersSheetCategory, setLifeChaptersSheetCategory] = useState<Category | null>(null)

  useEffect(() => {
    setActivePhaseIndex(0)
    setSelectedCategory(null)
    setSelectedFeature(null)
    setLifeChaptersSheetCategory(null)
  }, [activeDemoId])

  useEffect(() => {
    const state = location.state as { openCategory?: string } | null
    if (state?.openCategory) {
      const allCategories = homePhases.flatMap((p) => p.categories)
      const match = allCategories.find((c) => c.id === state.openCategory)
      if (match) setSelectedCategory(match)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate, location.pathname])

  const handleCategoryClick = useCallback((category: Category) => {
    if (category.id === 'cat-life-chapters' && category.status !== 'locked') {
      setLifeChaptersSheetCategory(category)
      return
    }
    setSelectedCategory(category)
  }, [])

  const handleSheetClose = useCallback(() => {
    setSelectedCategory(null)
  }, [])

  const handleContinueFoundation = useCallback(() => {
    setSelectedCategory(null)
    setActivePhaseIndex(0)
  }, [])

  const handleBeginModule = useCallback((categoryId: string, moduleId: string) => {
    setSelectedCategory(null)
    const detail = categoryDetails[categoryId]
    const isModule2 = detail?.modules?.[1]?.id === moduleId && module2IntroData[categoryId]
    if (isModule2) {
      navigate(`/intro2/${categoryId}`)
    } else {
      navigate(`/intro/${categoryId}`)
    }
  }, [navigate])

  return (
    <PageTransition>
      <div className="relative flex flex-col overflow-x-hidden">
        {/* ── Background image layer ── */}
        <div className="pointer-events-none absolute left-1/2 -top-[65px] h-[687px] w-[1030px] -translate-x-1/2 z-0">
          <img
            src="/images/Background Image.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* ── Header ── */}
        <div className="relative z-10">
          <HomeHeader />
        </div>

        {/* ── Hero heading ── */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 pt-1">
          <p className="w-full text-center font-display text-[27px] font-normal leading-[1.2] text-foreground">
            Continue your Journey, Alex
          </p>

          {/* ── Prompt Card ── */}
          <PromptCard
            categoryTag={promptCard.categoryTag}
            question={promptCard.question}
          />
        </div>

        {/* ── Tree image ── */}
        <div className="relative z-[2] mt-[58px] flex justify-center">
          <div className="relative h-[316px] w-[466px]">
            <img
              src={treeImage}
              alt="Legacy tree"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* ── Phase title with radial gradient ── */}
        <div
          className="relative z-[5] -mt-20 flex h-[121px] items-center justify-center px-4 py-2.5"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at center, rgba(253,247,234,1) 20%, rgba(253,245,226,0.1) 40%, rgba(255,255,255,0) 100%)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={activePhase.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="text-center font-display text-[27px] font-normal leading-[1.2] text-foreground"
            >
              {activePhase.title}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* ── Phase toggle ── */}
        <div className="relative z-[6] -mt-8">
          <PhaseToggle
            label={activePhase.label}
            onPrevious={() => setActivePhaseIndex((i) => i - 1)}
            onNext={() => setActivePhaseIndex((i) => i + 1)}
            hasPrevious={activePhaseIndex > 0}
            hasNext={activePhaseIndex < homePhases.length - 1}
          />
        </div>

        {/* ── Category cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-[6] flex flex-col gap-8 px-4 pt-8 pb-8"
          >
            {activePhase.categories.map((category) => (
              <CategoryNodeCard
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Locked feature cards (Phase 1 only) ── */}
        {activePhase.id === 'foundation' && (
          <div className="relative z-[6] flex flex-col gap-4 px-4 pb-8 mt-4">
            {/* Section divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-lm-gold/30" />
              <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                Earn 6 Stars to Unlock
              </p>
              <div className="h-px flex-1 bg-lm-gold/30" />
            </div>

            <LockedFeatureCard
              image="/images/RecordVoice.png"
              title="Give your LastingMind your voice"
              subtitle="Your family will hear your stories the way only you can tell them."
              onClick={() => setSelectedFeature({
                id: 'voice-clone',
                image: '/images/RecordVoice.png',
                title: 'Give your LastingMind your voice',
                description: 'Record a voice sample and your LastingMind will use it to narrate your stories, memories, and letters in your own voice — so your family hears you, not a machine.',
                unlockMessage: 'Earn at least 1 star in every Phase 1 category to unlock Voice Clone. Complete both modules in a category to earn your first star.',
              })}
            />
            <LockedFeatureCard
              image="/images/Audience.png"
              title="Your family can now meet your LastingMind"
              subtitle="Invite them to start asking questions."
              onClick={() => setSelectedFeature({
                id: 'invite-audience',
                image: '/images/Audience.png',
                title: 'Your family can now meet your LastingMind',
                description: 'Once unlocked, you can invite loved ones to interact with your LastingMind — they\'ll be able to ask questions, explore your stories, and connect with the legacy you\'re building.',
                unlockMessage: 'Earn at least 1 star in every Phase 1 category to unlock Audience Invites. Complete both modules in a category to earn your first star.',
              })}
            />
          </div>
        )}
      </div>

      {/* ── Bottom Sheet ── fixed within MobileShell via transform-gpu containing block */}
      <LockedFeatureSheet
        isOpen={selectedFeature !== null}
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />

      <CategoryBottomSheet
        isOpen={isSheetOpen}
        category={selectedCategory}
        detail={selectedCategory ? categoryDetails[selectedCategory.id] ?? null : null}
        onClose={handleSheetClose}
        onBeginModule={handleBeginModule}
        onContinueFoundation={handleContinueFoundation}
      />

      <LifeChaptersSheet
        isOpen={lifeChaptersSheetCategory !== null}
        category={lifeChaptersSheetCategory}
        onClose={() => setLifeChaptersSheetCategory(null)}
      />
    </PageTransition>
  )
}
