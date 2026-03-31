import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ThinkingDots } from '@/components/ui/ThinkingDots'

interface TranscriptionBubbleProps {
  text: string
  label?: string
  showDotsIndicator?: boolean
  showTapToEdit?: boolean
  onTapToEdit?: () => void
  onEditingChange?: (isEditing: boolean) => void
}

export function TranscriptionBubble({ text, label, showDotsIndicator, showTapToEdit, onEditingChange }: TranscriptionBubbleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(text)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResize = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }, [])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(editedText.length, editedText.length)
      autoResize()
    }
  }, [isEditing, autoResize, editedText.length])

  const handleStartEdit = () => {
    setIsEditing(true)
    onEditingChange?.(true)
  }

  const handleDone = () => {
    setIsEditing(false)
    onEditingChange?.(false)
  }

  const displayText = isEditing ? editedText : editedText

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mx-[15px] my-[10px]"
    >
      <div className="flex flex-col gap-[10px] rounded-[8px] bg-[var(--lm-bg-reflection)] px-4 py-2 shadow-reflection">
        {label && (
          <p className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
            {label}
          </p>
        )}

        {showDotsIndicator && !label && (
          <ThinkingDots />
        )}

        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedText}
            onChange={(e) => {
              setEditedText(e.target.value)
              autoResize()
            }}
            className="w-full resize-none border-0 border-b border-[#3e2f26]/20 bg-transparent pb-4 text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)] outline-none"
          />
        ) : (
          <p className="w-full text-[16px] font-normal leading-[1.5] text-[var(--lm-text-primary)]">
            {displayText}
          </p>
        )}

        {showTapToEdit && !isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="flex w-full items-center gap-1"
          >
            <svg className="size-[18px] text-[#3e2f26]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22h16" />
              <path d="M18 2l4 4L8 20H4v-4L18 2z" />
            </svg>
            <span className="text-[14px] font-medium leading-[20px] text-[#3e2f26]">
              Tap to edit
            </span>
          </button>
        )}

        {isEditing && (
          <button
            type="button"
            onClick={handleDone}
            className="mt-3 flex items-center gap-1 self-end rounded-[6px] bg-lm-green px-3 py-1.5"
          >
            <Check className="size-4 text-white" />
            <span className="text-[14px] font-medium leading-[20px] text-white">
              Done
            </span>
          </button>
        )}
      </div>
      {/* Triangle pointer with matching shadow */}
      <svg
        className="ml-5"
        width="20"
        height="10"
        viewBox="0 0 20 10"
        style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.12))' }}
      >
        <polygon points="0,0 10,10 20,0" fill="var(--lm-bg-reflection)" />
      </svg>
    </motion.div>
  )
}
