import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mic, Square, Send, X, Pencil, Plus, Leaf } from 'lucide-react'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import type { CapturedPerson } from '@/types'
import type { CaptureInputMode } from '@/hooks/useCircleCapture'

interface NameCaptureScreenProps {
  groupLabel: string
  groupPrompt: string
  currentGroupIndex: number
  totalGroups: number
  currentGroupNames: CapturedPerson[]
  hasSubmittedNames: boolean
  inputMode: CaptureInputMode
  isRecording: boolean
  isLastGroup: boolean
  onSetInputMode: (mode: CaptureInputMode) => void
  onStartRecording: () => void
  onStopRecording: () => void
  onSubmitTextNames: (text: string) => void
  onEditPersonName: (personId: string, newName: string) => void
  onRemovePersonFromGroup: (personId: string) => void
  onAddPersonToGroup: (name: string) => void
  onNext: () => void
  onSkip: () => void
  onBack: () => void
}

function useRecordingTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active) {
      setSeconds(0)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [active])

  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function NameCaptureScreen({
  groupLabel,
  groupPrompt,
  currentGroupIndex,
  totalGroups,
  currentGroupNames,
  hasSubmittedNames,
  inputMode,
  isRecording,
  isLastGroup,
  onSetInputMode,
  onStartRecording,
  onStopRecording,
  onSubmitTextNames,
  onEditPersonName,
  onRemovePersonFromGroup,
  onAddPersonToGroup,
  onNext,
  onSkip,
  onBack,
}: NameCaptureScreenProps) {
  const [textValue, setTextValue] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [newName, setNewName] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  const recordingTime = useRecordingTimer(isRecording)

  // Auto-scroll thread when names change
  useEffect(() => {
    if (threadRef.current) {
      requestAnimationFrame(() => {
        threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' })
      })
    }
  }, [currentGroupNames.length, hasSubmittedNames])

  const handleTextSubmit = () => {
    const trimmed = textValue.trim()
    if (trimmed) {
      onSubmitTextNames(trimmed)
      setTextValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTextSubmit()
    }
  }

  const startEdit = (person: CapturedPerson) => {
    setEditingId(person.id)
    setEditValue(person.name)
    setTimeout(() => editInputRef.current?.focus(), 50)
  }

  const commitEdit = () => {
    if (editingId && editValue.trim()) {
      onEditPersonName(editingId, editValue.trim())
    }
    setEditingId(null)
    setEditValue('')
  }

  const handleAddNew = () => {
    if (newName.trim()) {
      onAddPersonToGroup(newName.trim())
      setNewName('')
      setAddingNew(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 flex-col border-b border-border/50 bg-[var(--lm-bg-primary)]/80 px-4 pb-3 pt-[62px] backdrop-blur-sm">
        {/* Top row: back button + progress */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
          >
            <ArrowLeft className="size-5 text-white" />
          </button>
          <span className="text-[13px] font-medium text-muted-foreground">
            Group {currentGroupIndex + 1} of {totalGroups}
          </span>
        </div>
        {/* Group label */}
        <p className="mt-4 text-center font-display text-[18px] font-semibold leading-[1.2] text-foreground">
          {groupLabel}
        </p>
      </div>

      {/* Chat thread area */}
      <div ref={threadRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto py-3" style={{ scrollbarWidth: 'none' }}>
        {/* LM prompt bubble */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex gap-2 px-4 py-1.5"
        >
          <div className="relative mt-1 shrink-0">
            <div className="flex size-8 items-center justify-center rounded-full border border-lm-green/20 bg-primary/10">
              <Leaf className="size-4 text-lm-green" />
            </div>
          </div>
          <div className="flex max-w-[78%] flex-col items-start gap-1">
            <div className="rounded-2xl rounded-bl-md bg-lm-bg-card px-3.5 py-2.5 shadow-card">
              <p className="text-[15px] leading-[1.5] text-foreground">
                {groupPrompt}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Names list — appears in the thread after capture */}
        {hasSubmittedNames && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 flex flex-col gap-2 px-4"
          >
            {currentGroupNames.map((person) => (
              <div
                key={person.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
              >
                {editingId === person.id ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                    className="flex-1 bg-transparent text-[15px] text-foreground focus:outline-none"
                  />
                ) : (
                  <span className="flex-1 text-[15px] font-medium text-foreground">
                    {person.name}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(person)}
                  className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Pencil className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onRemovePersonFromGroup(person.id)}
                  className="rounded p-1 text-muted-foreground transition-colors hover:text-red-500"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}

            {/* Add another */}
            {addingNew ? (
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-lm-green/50 bg-primary/5 px-4 py-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNew()}
                  placeholder="Name"
                  autoFocus
                  className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddNew}
                  disabled={!newName.trim()}
                  className="text-sm font-medium text-lm-green transition-colors disabled:opacity-50"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => { setAddingNew(false); setNewName('') }}
                  className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingNew(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-[14px] font-medium text-muted-foreground transition-colors hover:border-lm-green hover:text-lm-green"
              >
                <Plus className="size-4" />
                Add another
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Bottom-pinned input / CTA area ── */}
      {hasSubmittedNames && !isRecording ? (
        /* After names captured — CTA + skip */
        <div className="border-t border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-2 pt-4">
          <PrimaryCTA onClick={onNext}>
            {isLastGroup ? 'Review my list' : 'Next'}
          </PrimaryCTA>
        </div>
      ) : (
        /* Input bar — matches GuidedInputBar pattern */
        <div className="border-t border-border/50 bg-[var(--lm-bg-primary)] px-3 pb-5 pt-3">
          <AnimatePresence mode="wait">
            {/* Recording state */}
            {isRecording ? (
              <motion.div
                key="recording"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-3 py-2"
              >
                <div className="flex items-center gap-3 rounded-full bg-red-50 px-5 py-2.5">
                  <div className="size-2.5 animate-pulse rounded-full bg-red-500" />
                  <span className="text-[14px] font-medium text-red-600">
                    Recording… {recordingTime}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onStopRecording}
                  className="flex size-14 items-center justify-center rounded-full bg-red-500 shadow-lg transition-transform active:scale-95"
                >
                  <Square className="size-5 text-white" fill="white" />
                </button>
              </motion.div>

            /* Voice mode (default) */
            ) : inputMode === 'voice' ? (
              <motion.div
                key="voice"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-2.5 py-2"
              >
                <button
                  type="button"
                  onClick={onStartRecording}
                  className="flex size-16 items-center justify-center rounded-full bg-lm-green shadow-lg transition-transform active:scale-95"
                >
                  <Mic className="size-7 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onSetInputMode('text')
                    setTimeout(() => inputRef.current?.focus(), 50)
                  }}
                  className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Prefer to type?
                </button>
              </motion.div>

            /* Text mode */
            ) : (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-end gap-2"
              >
                <div className="flex flex-1 items-center gap-1 rounded-full border border-border bg-white px-4 py-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type names, separated by commas…"
                    autoFocus
                    className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>

                {textValue.trim() ? (
                  <button
                    type="button"
                    onClick={handleTextSubmit}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lm-green transition-transform active:scale-95"
                  >
                    <Send className="size-4.5 text-white" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSetInputMode('voice')}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lm-green/15 transition-transform active:scale-95"
                  >
                    <Mic className="size-4.5 text-lm-green" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Skip link — always outside the input/CTA box */}
      {!isRecording && (
        <div className="bg-[var(--lm-bg-primary)] px-5 pb-6 pt-1">
          <button
            type="button"
            onClick={onSkip}
            className="w-full text-center text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip this group
          </button>
        </div>
      )}
    </div>
  )
}
