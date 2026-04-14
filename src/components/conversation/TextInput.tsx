import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mic } from 'lucide-react'

interface TextInputProps {
  onSubmit: (text: string) => void
  onToggleInputMode: () => void
}

export function TextInput({ onSubmit, onToggleInputMode }: TextInputProps) {
  const [text, setText] = useState('')

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-3 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-8 pt-4"
    >
      <div className="flex w-full gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here..."
          rows={3}
          className="flex-1 resize-none rounded-[10px] border border-border bg-background p-3 font-sans text-base leading-snug text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="flex size-12 shrink-0 items-center justify-center self-end rounded-lg bg-primary transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
        >
          <Send className="size-5 text-primary-foreground" />
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleInputMode}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent p-2.5 transition-colors hover:bg-muted/50 active:scale-[0.98]"
      >
        <Mic className="size-5 text-foreground" />
        <span className="text-center text-sm font-medium text-foreground">
          Prefer to talk? Switch to voice
        </span>
      </button>
    </motion.div>
  )
}
