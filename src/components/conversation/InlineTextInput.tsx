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
        <p className="text-[14px] font-semibold leading-[1.2] tracking-wide text-[#7b7b7b]">
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
          className="w-full resize-none border-0 bg-transparent text-[18px] font-normal leading-[1.5] text-[#2f3228] outline-none placeholder:text-[#2f3228]/40"
          rows={4}
        />
      </div>

      {/* Compact toolbar */}
      <div className="flex items-center justify-between border-t border-black/16 px-[10px] py-[10px]">
        <button
          type="button"
          onClick={onToggleInputMode}
          className="flex items-center gap-[2px] rounded-[4px] bg-[#e7ebd9] px-[10px] py-[6px]"
        >
          <span className="text-[14px] font-normal leading-[1.2] text-[#283227]">
            Speak
          </span>
          <Mic className="size-4 text-[#283227]" />
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="flex items-center gap-[2px] rounded-[4px] bg-lm-green px-[10px] py-[6px] disabled:opacity-40"
        >
          <span className="text-[14px] font-normal leading-[1.2] text-white">
            Submit
          </span>
          <ArrowUp className="size-4 text-white" />
        </button>
      </div>
    </motion.div>
  )
}
