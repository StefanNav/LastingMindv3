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
      className="flex flex-col items-center gap-[13px] border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4"
    >
      <div className="flex w-full gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer here..."
          rows={3}
          className="flex-1 resize-none rounded-[10px] border border-[var(--lm-border)] bg-white p-3 font-sans text-[16px] leading-[1.4] text-[var(--lm-text-primary)] placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="flex size-[48px] shrink-0 items-center justify-center self-end rounded-[10px] bg-lm-green disabled:opacity-40"
        >
          <Send className="size-5 text-white" />
        </button>
      </div>

      <button
        type="button"
        onClick={onToggleInputMode}
        className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] p-[10px]"
      >
        <Mic className="size-6 text-[#283227]" />
        <span className="text-center text-[16px] font-medium leading-[1.2] text-[#283227]">
          Prefer to talk? Switch to voice
        </span>
      </button>
    </motion.div>
  )
}
