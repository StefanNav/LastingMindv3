import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { buildInitialChapters, createBlankChapter, SUGGESTED_CHAPTERS } from '@/data/lifeChaptersData'
import { ChapterCard } from '@/components/life-chapters/ChapterCard'
import type { LifeChapter } from '@/types'

export function DefineChaptersPage() {
  const navigate = useNavigate()
  const { saveLifeChapters, lifeChapters: savedChapters } = useApp()

  const [chapters, setChapters] = useState<LifeChapter[]>(() =>
    savedChapters.length > 0 ? savedChapters : buildInitialChapters()
  )
  const [undoChapter, setUndoChapter] = useState<{ chapter: LifeChapter; index: number } | null>(null)
  const [undoTimer, setUndoTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [newChapterId, setNewChapterId] = useState<string | null>(null)

  // Descriptions for the suggested chapters (shown as hints)
  const descriptionMap = new Map(
    SUGGESTED_CHAPTERS.map((s) => [s.defaultTitle, s.description])
  )

  const allTitlesPresent = chapters.length > 0 && chapters.every((ch) => ch.title.trim().length > 0)

  const handleUpdate = useCallback((updated: LifeChapter) => {
    setChapters((prev) => prev.map((ch) => (ch.id === updated.id ? updated : ch)))
  }, [])

  const handleDelete = useCallback((id: string) => {
    setChapters((prev) => {
      const idx = prev.findIndex((ch) => ch.id === id)
      if (idx === -1) return prev
      const removed = prev[idx]
      const next = prev.filter((ch) => ch.id !== id)

      // Clear any existing undo
      if (undoTimer) clearTimeout(undoTimer)

      setUndoChapter({ chapter: removed, index: idx })
      const timer = setTimeout(() => {
        setUndoChapter(null)
      }, 4000)
      setUndoTimer(timer)

      return next
    })
  }, [undoTimer])

  const handleUndo = useCallback(() => {
    if (!undoChapter) return
    if (undoTimer) clearTimeout(undoTimer)

    setChapters((prev) => {
      const next = [...prev]
      const insertIdx = Math.min(undoChapter.index, next.length)
      next.splice(insertIdx, 0, undoChapter.chapter)
      return next
    })
    setUndoChapter(null)
    setUndoTimer(null)
  }, [undoChapter, undoTimer])

  const handleAddChapter = useCallback(() => {
    const blank = createBlankChapter()
    setNewChapterId(blank.id)
    setChapters((prev) => [...prev, blank])
  }, [])

  // Clear newChapterId after render so autoFocus fires once
  useEffect(() => {
    if (newChapterId) {
      const timer = setTimeout(() => setNewChapterId(null), 100)
      return () => clearTimeout(timer)
    }
  }, [newChapterId])

  const handleConfirm = useCallback(() => {
    saveLifeChapters(chapters)
    navigate('/life-chapters')
  }, [chapters, saveLifeChapters, navigate])

  const handleBack = useCallback(() => {
    navigate('/home')
  }, [navigate])

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

      <div className="relative z-10 flex min-h-full flex-col pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-14 pb-2">
          <button
            type="button"
            onClick={handleBack}
            className="shrink-0 rounded-full p-1 text-foreground transition-colors hover:bg-muted"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h2 className="flex-1 text-center font-display text-xl font-semibold text-foreground pr-7">
            Your Life Chapters
          </h2>
        </div>

        {/* Intro block */}
        <div className="flex flex-col gap-2 px-6 pt-4 pb-6">
          <p className="font-display text-2xl font-semibold text-foreground">
            Shape your story
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We've suggested some chapters to get you started. Edit them to match your life — add, rename, or remove any that don't fit. You can always change these later.
          </p>
        </div>

        {/* Chapter list */}
        {chapters.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-12 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Add at least one chapter to continue
            </p>
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={chapters}
            onReorder={setChapters}
            className="flex flex-col gap-3 px-4"
          >
            {chapters.map((chapter, i) => (
              <Reorder.Item
                key={chapter.id}
                value={chapter}
                className="list-none"
                dragListener={true}
                whileDrag={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
              >
                <ChapterCard
                  chapter={chapter}
                  index={i}
                  totalCount={chapters.length}
                  autoFocus={chapter.id === newChapterId}
                  onUpdate={handleUpdate}
                  onDelete={() => handleDelete(chapter.id)}
                />
                {/* Hint text for suggested chapters */}
                {descriptionMap.has(chapter.title) && (
                  <p className="mt-1 px-1 text-xs text-muted-foreground/60 italic">
                    {descriptionMap.get(chapter.title)}
                  </p>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}

        {/* Add chapter button */}
        <div className="px-4 pt-4">
          <button
            type="button"
            onClick={handleAddChapter}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-border py-3 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
          >
            <Plus className="size-4" />
            Add a chapter
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 z-20 border-t border-border/50 bg-[var(--lm-bg-primary)]/95 px-4 py-4 backdrop-blur-sm">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!allTitlesPresent}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          Start telling my story
        </button>
      </div>

      {/* Undo toast */}
      <AnimatePresence>
        {undoChapter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <p className="text-sm text-background">
                Chapter removed
              </p>
              <button
                type="button"
                onClick={handleUndo}
                className="text-sm font-semibold text-primary-foreground underline underline-offset-2"
              >
                Undo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
