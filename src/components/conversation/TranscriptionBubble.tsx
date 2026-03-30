import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FileText, Check } from 'lucide-react'

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
      className="mx-[15px] flex flex-col gap-[10px] items-center justify-center rounded-[15px] bg-white/90 px-[10px] py-5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)]"
    >
      {label && (
        <p className="text-center text-[12px] font-semibold leading-[1.2] tracking-wide text-[#7b7b7b]">
          {label}
        </p>
      )}

      {showDotsIndicator && !label && (
        <div className="flex gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="size-[6px] rounded-full bg-lm-green-dark"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editedText}
          onChange={(e) => {
            setEditedText(e.target.value)
            autoResize()
          }}
          className="w-full resize-none border-0 border-b border-[#3e2f26]/20 bg-transparent pb-4 font-display text-[20px] font-semibold leading-[28px] tracking-[0.45px] text-[#3e2f26] outline-none"
          style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
        />
      ) : (
        <p
          className="font-display text-[20px] font-semibold leading-[28px] tracking-[0.45px] text-[#3e2f26] w-full"
          style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
        >
          {displayText}
        </p>
      )}

      {showTapToEdit && !isEditing && (
        <button
          type="button"
          onClick={handleStartEdit}
          className="flex w-full items-center gap-1"
        >
          <FileText className="size-[18px] text-[#3e2f26]" />
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
    </motion.div>
  )
}
