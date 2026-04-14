import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { HomeHeader } from '@/components/home/HomeHeader'
import { PromptCard } from '@/components/home/PromptCard'
import { PhaseToggle } from '@/components/home/PhaseToggle'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
import { HorizontalActivityCard } from '@/components/cards/HorizontalActivityCard'
import { LeaveSomethingBehindCard } from '@/components/cards/LeaveSomethingBehindCard'
import { CategoryBottomSheet } from '@/components/sheets/CategoryBottomSheet'
import { ChapterBottomSheet } from '@/components/sheets/ChapterBottomSheet'
import { LockedFeatureCard } from '@/components/home/LockedFeatureCard'
import { LockedFeatureSheet } from '@/components/sheets/LockedFeatureSheet'
import type { LockedFeature } from '@/components/sheets/LockedFeatureSheet'
import { LegacyBottomSheet } from '@/components/sheets/LegacyBottomSheet'
import { DefineChaptersCard } from '@/components/cards/DefineChaptersCard'
import { module2IntroData } from '@/data/mock'
import { phase4Categories, availableLegacyItems } from '@/data/phase4Data'
import { useApp } from '@/app/AppProvider'
import type { Category, DemoPromptCard, LifeChapter } from '@/types'

export function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { homePhases, categoryDetails, promptCards, treeImage, activeDemoId, addedLegacyItemIds, addLegacyItem, legacyItemStatuses, foundationStars, hasDefinedChapters, lifeChapters } = useApp()
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const activePhase = homePhases[activePhaseIndex]
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const isSheetOpen = selectedCategory !== null
  const [selectedFeature, setSelectedFeature] = useState<LockedFeature | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<LifeChapter | null>(null)
  const [legacySheetOpen, setLegacySheetOpen] = useState(false)

  // Check if any chapter session has been started (for voice clone unlock)
  const lifeStoryUnderway = lifeChapters.some((ch) => ch.step1Status !== 'not_started')

  useEffect(() => {
    setActivePhaseIndex(0)
    setSelectedCategory(null)
    setSelectedFeature(null)
    setSelectedChapter(null)
    setLegacySheetOpen(false)
  }, [activeDemoId])

  useEffect(() => {
    const state = location.state as { openCategory?: string; activePhase?: string } | null
    if (state?.activePhase) {
      const idx = homePhases.findIndex((p) => p.id === state.activePhase)
      if (idx >= 0) setActivePhaseIndex(idx)
    }
    if (state?.openCategory) {
      const allCategories = homePhases.flatMap((p) => p.categories)
      const match = allCategories.find((c) => c.id === state.openCategory)
      if (match) setSelectedCategory(match)
    }
    if (state?.openCategory || state?.activePhase) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, navigate, location.pathname])

  const handleCategoryClick = useCallback((category: Category) => {
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

  const handlePromptCardTap = useCallback((card: DemoPromptCard) => {
    const detail = categoryDetails[card.categoryId]
    const isModule2 = detail?.modules?.[1]?.id === card.moduleId && module2IntroData[card.categoryId]
    if (isModule2) {
      navigate(`/intro2/${card.categoryId}`)
    } else {
      navigate(`/intro/${card.categoryId}`)
    }
  }, [navigate, categoryDetails])

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
        <div className="relative z-[60]">
          <HomeHeader />
        </div>

        {/* ── Hero heading ── */}
        <div className="relative z-10 flex flex-col items-center gap-5 px-4 pt-1">
          <p className="w-full text-center font-display text-[27px] font-normal leading-[1.2] text-foreground">
            Continue your Journey, Alex
          </p>

          {/* ── Prompt Card Carousel ── */}
          <PromptCard
            cards={promptCards}
            onCardTap={handlePromptCardTap}
          />
        </div>

        {/* ── Tree image ── */}
        <div className="relative z-[2] mt-[58px] h-[316px] w-full overflow-hidden">
          {/* Gradient band — sits behind tree, covers the seam */}
          <div
            className="absolute bottom-[25px] left-1/2 -translate-x-1/2 h-[80px] w-[calc(100%+400px)] z-[1] blur-[6px]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(253,247,234,0.8) 40%, rgba(253,247,234,1) 100%)',
            }}
          />
          {/* Tree — absolutely positioned so it never affects layout below */}
          <img
            src={treeImage}
            alt="Legacy tree"
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-[2] object-contain ${
              treeImage.includes('TreeStage1') ? 'h-[240px] w-[354px]' : 'h-[316px] w-[466px]'
            }`}
          />
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
            labelColor={activePhase.id === 'keep-growing' ? 'text-lm-green' : undefined}
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
            {/* ── Phase 4: Keep Growing — horizontal activity cards ── */}
            {activePhase.id === 'keep-growing' ? (
              <div className="flex flex-col gap-3">
                {phase4Categories.map((cat) => (
                  <HorizontalActivityCard
                    key={cat.id}
                    title={cat.title}
                    subtitle={cat.subtitle}
                    icon={cat.icon}
                    iconColor={cat.iconColor}
                    image={cat.image}
                    onClick={() => navigate(`/phase4/${cat.id}`)}
                  />
                ))}
              </div>
            ) : activePhase.id === 'your-legacy' ? (
              /* ── Phase 3: Leave Your Legacy — Wisdom + Greatest Memories + Leave Something Behind + added items ── */
              <div className="flex flex-col gap-4">
                {/* Category cards (Wisdom & Advice + Greatest Memories) */}
                {activePhase.categories.map((category) => (
                  <CategoryNodeCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}

                {/* Section divider */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-px flex-1 bg-lm-gold/30" />
                  <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                    Leave Your Legacy
                  </p>
                  <div className="h-px flex-1 bg-lm-gold/30" />
                </div>

                {/* Leave Something Behind card */}
                <LeaveSomethingBehindCard onClick={() => setLegacySheetOpen(true)} />

                {/* User-added legacy item cards */}
                {addedLegacyItemIds.map((itemId) => {
                  const item = availableLegacyItems.find((li) => li.id === itemId)
                  if (!item) return null
                  return (
                    <HorizontalActivityCard
                      key={item.id}
                      title={item.name}
                      subtitle={item.description}
                      icon={item.icon}
                      iconColor={item.iconColor}
                      image={item.image}
                      status={legacyItemStatuses[item.id] ?? 'not_started'}
                      onClick={() => navigate(`/legacy/${item.id}`)}
                    />
                  )
                })}
              </div>
            ) : activePhase.id === 'life-story' ? (
              /* ── Phase 2: Life Story — chapter-based layout ── */
              <div className="flex flex-col gap-4">
                {!hasDefinedChapters ? (
                  <>
                    {/* Placeholder card */}
                    <div className="flex items-center justify-center rounded-[10px] border-2 border-dashed border-lm-border/50 px-5 py-3.5">
                      <p className="whitespace-nowrap text-center text-[13px] text-muted-foreground">
                        Your chapter categories will show here after you define them.
                      </p>
                    </div>

                    {/* Define Your Life Chapters card — only interactive when Phase 1 complete */}
                    <DefineChaptersCard
                      mode="define"
                      onClick={foundationStars >= 6 ? () => navigate('/life-chapters/define') : undefined}
                    />
                  </>
                ) : (
                  <>
                    {/* Chapter cards */}
                    {lifeChapters.map((chapter) => {
                      const chapterAsCategory: Category = {
                        id: chapter.id,
                        title: chapter.title,
                        image: '/images/Life chapters 1.png',
                        imageHeight: 156,
                        imageWidth: 252,
                        status: chapter.starsEarned >= 3 ? 'flourishing' : chapter.starsEarned >= 2 ? 'budding' : chapter.starsEarned >= 1 ? 'growing' : chapter.step1Status !== 'not_started' ? 'started' : 'not_started',
                        totalModules: 2,
                      }
                      return (
                        <CategoryNodeCard
                          key={chapter.id}
                          category={chapterAsCategory}
                          onClick={() => setSelectedChapter(chapter)}
                        />
                      )
                    })}

                    {/* Edit chapters card (de-emphasised) */}
                    <DefineChaptersCard
                      mode="edit"
                      onClick={() => navigate('/life-chapters/define')}
                    />
                  </>
                )}
              </div>
            ) : (
              /* ── Phase 1: standard category grid ── */
              activePhase.categories.map((category) => (
                <CategoryNodeCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category)}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Locked feature cards (Phase 1) ── */}
        {activePhase.id === 'foundation' && (
          <div className="relative z-[6] flex flex-col gap-4 px-4 pb-8 mt-4">
            {/* Section divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-lm-gold/30" />
              <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                {foundationStars >= 6 ? "You've Unlocked" : 'Earn 6 Stars to Unlock'}
              </p>
              <div className="h-px flex-1 bg-lm-gold/30" />
            </div>

            <LockedFeatureCard
              image="/images/onboarding/SplashPageTree.png"
              title="Chat with your LastingMind"
              subtitle="Your LastingMind is the legacy you are creating."
              unlocked={foundationStars >= 6}
              onClick={() => setSelectedFeature({
                id: 'chat-lastingmind',
                image: '/images/onboarding/SplashPageTree.png',
                title: 'Chat with your LastingMind',
                description: 'Once unlocked, you can have a real conversation with your LastingMind — ask it questions, explore your stories, and see how well it knows you.',
                unlockMessage: 'Earn at least 1 star in every Phase 1 category to unlock Chat. Complete both modules in a category to earn your first star.',
                unlocked: foundationStars >= 6,
                unlockedDescription: 'Your LastingMind learns from every story you share. Start a conversation with it to see how well it knows you — ask about your memories, values, or anything on your mind.',
                ctaLabel: 'Start a Conversation',
              })}
            />
            <LockedFeatureCard
              image="/images/Audience.png"
              title="Invite loved ones to meet your LastingMind"
              subtitle="Invite them to start asking questions."
              unlocked={foundationStars >= 6}
              onClick={() => setSelectedFeature({
                id: 'invite-audience',
                image: '/images/Audience.png',
                title: 'Invite loved ones to meet your LastingMind',
                description: 'Once unlocked, you can invite loved ones to interact with your LastingMind — they\'ll be able to ask questions, explore your stories, and connect with the legacy you\'re building.',
                unlockMessage: 'Earn at least 1 star in every Phase 1 category to unlock Audience Invites. Complete both modules in a category to earn your first star.',
                unlocked: foundationStars >= 6,
                unlockedDescription: 'Invite your family and friends to interact with your LastingMind. They can ask it questions, explore your stories, and feel closer to who you are — even when you\'re not in the room.',
                ctaLabel: 'Invite Someone',
              })}
            />
          </div>
        )}

        {/* ── After Life Story — Voice Clone card ── */}
        {activePhase.id === 'life-story' && (
          <div className="relative z-[6] flex flex-col gap-4 px-4 pb-8 mt-4">
            {/* Section divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-lm-gold/30" />
              <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                After Life Story
              </p>
              <div className="h-px flex-1 bg-lm-gold/30" />
            </div>

            <LockedFeatureCard
              image="/images/RecordVoice.png"
              title="Give your LastingMind your voice"
              subtitle="When your life story is underway, record once so narration sounds like you."
              unlocked={lifeStoryUnderway}
              onClick={() => setSelectedFeature({
                id: 'voice-clone',
                image: '/images/RecordVoice.png',
                title: 'Give your LastingMind your voice',
                description: 'Record a voice sample and your LastingMind will use it to narrate your stories, memories, and letters in your own voice — so your family hears you, not a machine.',
                unlockMessage: 'Begin at least one chapter conversation to unlock Voice Clone.',
                unlocked: lifeStoryUnderway,
                unlockedDescription: 'Your life story is underway. Record a voice sample so your stories are narrated in your own voice.',
                ctaLabel: 'Record Voice Sample',
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
        onAction={(featureId) => {
          setSelectedFeature(null)
          if (featureId === 'chat-lastingmind') navigate('/chat')
          if (featureId === 'invite-audience') navigate('/loved-ones')
        }}
      />

      <CategoryBottomSheet
        isOpen={isSheetOpen}
        category={selectedCategory}
        detail={selectedCategory ? categoryDetails[selectedCategory.id] ?? null : null}
        onClose={handleSheetClose}
        onBeginModule={handleBeginModule}
        onContinueFoundation={handleContinueFoundation}
      />

      <ChapterBottomSheet
        isOpen={selectedChapter !== null}
        chapter={selectedChapter}
        onClose={() => setSelectedChapter(null)}
        onBeginStep={(chapterId, stepType) => {
          setSelectedChapter(null)
          navigate(`/chapter/${chapterId}/${stepType}`)
        }}
      />

      <LegacyBottomSheet
        isOpen={legacySheetOpen}
        onClose={() => setLegacySheetOpen(false)}
        addedItemIds={addedLegacyItemIds}
        onAddItem={addLegacyItem}
      />
    </PageTransition>
  )
}
