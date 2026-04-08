import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface JournalCanvasProps {
  questionText: string | null
  writtenText: string
  onTextChange: (text: string) => void
  onFinishWriting: () => void
  onSubmit: () => void
}

export function JournalCanvas({
  questionText,
  writtenText,
  onTextChange,
  onFinishWriting,
  onSubmit,
}: JournalCanvasProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showSubmit, setShowSubmit] = useState(false)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const autoResize = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }

  const handleFinish = () => {
    setShowSubmit(true)
    onFinishWriting()
    textareaRef.current?.blur()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-1 flex-col overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Writing surface */}
      <div className="flex flex-1 flex-col gap-4 px-5 pb-4 pt-2">
        {/* Persistent question reference */}
        {questionText && (
          <p className="text-[15px] leading-[1.5] text-muted-foreground">
            {questionText}
          </p>
        )}

        <textarea
          ref={textareaRef}
          value={writtenText}
          onChange={(e) => {
            onTextChange(e.target.value)
            autoResize()
          }}
          placeholder="Start writing your reflection..."
          className="w-full flex-1 resize-none border-0 bg-transparent text-[18px] font-normal leading-[1.7] text-foreground outline-none placeholder:text-foreground/30"
          rows={8}
        />
      </div>

      {/* Bottom action area */}
      <div className="shrink-0 border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-8 pt-4">
        {showSubmit ? (
          <button
            type="button"
            onClick={onSubmit}
            className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Save this reflection
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            disabled={!writtenText.trim()}
            className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98] disabled:opacity-40"
          >
            Finish writing
          </button>
        )}
      </div>
    </motion.div>
  )
}
