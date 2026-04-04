import { useState, useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { HomeHeader } from '@/components/home/HomeHeader'
import { PromptCard } from '@/components/home/PromptCard'
import { PhaseToggle } from '@/components/home/PhaseToggle'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
import { CategoryBottomSheet } from '@/components/sheets/CategoryBottomSheet'
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

  useEffect(() => {
    setActivePhaseIndex(0)
    setSelectedCategory(null)
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
      <div className="relative flex flex-col bg-background overflow-x-hidden">
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
          <p className="w-full text-center font-display text-[26px] font-normal leading-[1.2] text-foreground">
            Continue your Journey, Alex
          </p>

          {/* ── Prompt Card ── */}
          <PromptCard
            categoryTag={promptCard.categoryTag}
            question={promptCard.question}
          />
        </div>

        {/* ── Tree image ── */}
        <div className="relative z-[2] mt-12 flex justify-center">
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
              className="text-center font-display text-[28px] font-normal leading-[1.2] text-foreground"
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
      </div>

      {/* ── Bottom Sheet ── fixed within MobileShell via transform-gpu containing block */}
      <CategoryBottomSheet
        isOpen={isSheetOpen}
        category={selectedCategory}
        detail={selectedCategory ? categoryDetails[selectedCategory.id] ?? null : null}
        onClose={handleSheetClose}
        onBeginModule={handleBeginModule}
        onContinueFoundation={handleContinueFoundation}
      />
    </PageTransition>
  )
}
