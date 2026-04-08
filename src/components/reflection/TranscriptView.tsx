import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Check, X } from 'lucide-react'

interface TranscriptViewProps {
  transcript: string
  isEditing: boolean
  onEdit: () => void
  onSaveEdit: (text: string) => void
  onCancelEdit: () => void
  onRecordMore: () => void
  onSubmit: () => void
}

export function TranscriptView({
  transcript,
  isEditing,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onRecordMore,
  onSubmit,
}: TranscriptViewProps) {
  const [editText, setEditText] = useState(transcript)

  const handleStartEdit = () => {
    setEditText(transcript)
    onEdit()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-4"
      style={{ scrollbarWidth: 'none' }}
    >
      <p className="text-[13px] font-medium text-muted-foreground">
        Here's what you said
      </p>

      {isEditing ? (
        <div className="flex flex-col gap-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={8}
            autoFocus
            className="w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-[16px] leading-[1.6] text-foreground focus:outline-none focus:ring-1 focus:ring-lm-green"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              <X className="size-3.5" />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSaveEdit(editText)}
              className="flex items-center gap-1 rounded-lg bg-lm-green px-3 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-lm-green/90"
            >
              <Check className="size-3.5" />
              Done
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-2">
            <p className="flex-1 text-[16px] leading-[1.7] text-foreground">
              {transcript}
            </p>
            <button
              type="button"
              onClick={handleStartEdit}
              className="mt-1 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Pencil className="size-4" />
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={onRecordMore}
              className="flex w-full items-center justify-center rounded-lg border border-border bg-transparent px-6 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
            >
              Record more
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="flex w-full items-center justify-center rounded-lg bg-lm-green px-6 py-3.5 text-[16px] font-semibold text-white transition-transform active:scale-[0.98]"
            >
              Save this reflection
            </button>
          </div>
        </>
      )}
    </motion.div>
  )
}
