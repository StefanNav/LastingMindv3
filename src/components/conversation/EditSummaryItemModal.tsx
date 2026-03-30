import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EditSummaryItemModalProps {
  isOpen: boolean
  initialName?: string
  initialRelationship?: string
  title: string
  onSave: (name: string, relationship: string) => void
  onCancel: () => void
}

export function EditSummaryItemModal({
  isOpen,
  initialName = '',
  initialRelationship = '',
  title,
  onSave,
  onCancel,
}: EditSummaryItemModalProps) {
  const [name, setName] = useState(initialName)
  const [relationship, setRelationship] = useState(initialRelationship)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setName(initialName)
      setRelationship(initialRelationship)
      setTimeout(() => nameRef.current?.focus(), 100)
    }
  }, [isOpen, initialName, initialRelationship])

  const canSave = name.trim().length > 0 && relationship.trim().length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-6 flex w-full max-w-[340px] flex-col gap-5 rounded-[16px] bg-[var(--lm-bg-primary)] p-6 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-display text-[22px] font-semibold leading-[1.3] text-[#2f3228]">
              {title}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold leading-[1.2] text-[#5d6056]">
                  Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Mitchell"
                  className="rounded-[8px] border border-black/20 bg-white px-3 py-3 text-[16px] leading-[1.3] text-[#2f3228] outline-none focus:border-lm-green"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold leading-[1.2] text-[#5d6056]">
                  Relationship
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Daughter"
                  className="rounded-[8px] border border-black/20 bg-white px-3 py-3 text-[16px] leading-[1.3] text-[#2f3228] outline-none focus:border-lm-green"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex flex-1 items-center justify-center rounded-[10px] border border-black/20 px-5 py-3.5"
              >
                <span className="text-[16px] font-medium leading-[1.2] text-[#5d6056]">
                  Cancel
                </span>
              </button>
              <button
                type="button"
                disabled={!canSave}
                onClick={() => onSave(name.trim(), relationship.trim())}
                className="flex flex-1 items-center justify-center rounded-[10px] bg-lm-green px-5 py-3.5 disabled:opacity-40"
              >
                <span className="text-[16px] font-medium leading-[1.2] text-white">
                  Save
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
