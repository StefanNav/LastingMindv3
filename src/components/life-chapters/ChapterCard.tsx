import { useState, useRef, useEffect } from 'react'
import { GripVertical, X } from 'lucide-react'
import type { LifeChapter } from '@/types'

interface ChapterCardProps {
  chapter: LifeChapter
  index: number
  totalCount: number
  autoFocus?: boolean
  onUpdate: (updated: LifeChapter) => void
  onDelete: () => void
}

export function ChapterCard({
  chapter,
  index,
  totalCount,
  autoFocus,
  onUpdate,
  onDelete,
}: ChapterCardProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const [isEditingDates, setIsEditingDates] = useState(false)
  const [startYearInput, setStartYearInput] = useState(
    chapter.startYear !== null ? String(chapter.startYear) : ''
  )
  const [endYearInput, setEndYearInput] = useState(
    chapter.endYear === 'Present' ? '' : chapter.endYear !== null ? String(chapter.endYear) : ''
  )
  const [isPresentEnd, setIsPresentEnd] = useState(chapter.endYear === 'Present')

  useEffect(() => {
    if (autoFocus && titleRef.current) {
      titleRef.current.focus()
    }
  }, [autoFocus])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...chapter, title: e.target.value })
  }

  const handleStartYearBlur = () => {
    const parsed = parseInt(startYearInput, 10)
    const year = !isNaN(parsed) && startYearInput.length === 4 ? parsed : null
    onUpdate({ ...chapter, startYear: year })
  }

  const handleEndYearBlur = () => {
    if (isPresentEnd) {
      onUpdate({ ...chapter, endYear: 'Present' })
      return
    }
    const parsed = parseInt(endYearInput, 10)
    const year = !isNaN(parsed) && endYearInput.length === 4 ? parsed : null
    onUpdate({ ...chapter, endYear: year })
  }

  const togglePresent = () => {
    const next = !isPresentEnd
    setIsPresentEnd(next)
    if (next) {
      setEndYearInput('')
      onUpdate({ ...chapter, endYear: 'Present' })
    } else {
      onUpdate({ ...chapter, endYear: null })
    }
  }

  const closeDateEditor = () => {
    handleStartYearBlur()
    handleEndYearBlur()
    setIsEditingDates(false)
  }

  const dateDisplay = (() => {
    const parts: string[] = []
    if (chapter.startYear !== null) parts.push(String(chapter.startYear))
    if (chapter.endYear !== null) parts.push(chapter.endYear === 'Present' ? 'Present' : String(chapter.endYear))
    return parts.length > 0 ? parts.join(' – ') : 'Add years'
  })()

  const canDelete = totalCount > 1

  return (
    <div className="flex flex-col gap-2 rounded-[10px] bg-lm-bg-card/40 px-4 py-4 shadow-card backdrop-blur-sm">
      {/* Main row: number + title + drag handle */}
      <div className="flex items-center gap-3">
        {/* Chapter number */}
        <p className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          Ch. {index + 1}
        </p>

        {/* Title input */}
        <input
          ref={titleRef}
          type="text"
          value={chapter.title}
          onChange={handleTitleChange}
          placeholder="Chapter title"
          className="min-w-0 flex-1 bg-transparent font-display text-base font-normal leading-tight text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        />

        {/* Delete button */}
        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-30"
          aria-label="Remove chapter"
        >
          <X className="size-4" />
        </button>

        {/* Drag handle */}
        <div className="shrink-0 cursor-grab touch-none text-muted-foreground/50 active:cursor-grabbing">
          <GripVertical className="size-5" />
        </div>
      </div>

      {/* Date range row */}
      {!isEditingDates ? (
        <button
          type="button"
          onClick={() => setIsEditingDates(true)}
          className="self-start text-[13px] font-medium text-primary/80 transition-colors hover:text-primary"
        >
          {dateDisplay}
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Start year"
              value={startYearInput}
              onChange={(e) => setStartYearInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
              onBlur={handleStartYearBlur}
              className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
            />
            <span className="text-sm text-muted-foreground">–</span>
            {isPresentEnd ? (
              <span className="w-20 rounded-md border border-primary/30 bg-primary/5 px-2 py-1.5 text-center text-sm font-medium text-primary">
                Present
              </span>
            ) : (
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="End year"
                value={endYearInput}
                onChange={(e) => setEndYearInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                onBlur={handleEndYearBlur}
                className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
              />
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePresent}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                isPresentEnd
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {isPresentEnd ? '✓ Present' : 'Present'}
            </button>
            <button
              type="button"
              onClick={closeDateEditor}
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
