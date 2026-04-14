import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, ArrowUp } from 'lucide-react'

interface InlineTextInputProps {
  onSubmit: (text: string) => void
  onToggleInputMode: () => void
}

export function InlineTextInput({ onSubmit, onToggleInputMode }: InlineTextInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const autoResize = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-1 flex-col"
    >
      {/* Inline text response area */}
      <div className="flex flex-1 flex-col gap-3 px-[26px] pt-4">
        <p className="text-sm font-semibold leading-tight tracking-wide text-muted-foreground">
          YOUR RESPONSE
        </p>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            autoResize()
          }}
          onKeyDown={handleKeyDown}
          placeholder="Start typing your response..."
          className="w-full resize-none border-0 bg-transparent text-lg font-normal leading-relaxed text-foreground outline-none placeholder:text-foreground/40"
          rows={4}
        />
      </div>

      {/* Compact toolbar */}
      <div className="flex items-center justify-between border-t border-border/50 px-2.5 py-2.5">
        <button
          type="button"
          onClick={onToggleInputMode}
          className="flex items-center gap-1 rounded-lg border border-border bg-transparent px-2.5 py-1.5 transition-colors hover:bg-muted/50 active:scale-[0.98]"
        >
          <span className="text-sm font-normal text-foreground">
            Speak
          </span>
          <Mic className="size-4 text-foreground" />
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="text-sm font-normal text-primary-foreground">
            Submit
          </span>
          <ArrowUp className="size-4 text-primary-foreground" />
        </button>
      </div>
    </motion.div>
  )
}
