import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Mic, Square } from 'lucide-react'

type ModalVariant = 'replace' | 'gap'

const VARIANT_COPY: Record<ModalVariant, { title: string; description: string; placeholder: string; button: string; toast: string }> = {
  replace: {
    title: 'Provide a new answer',
    description: 'Not happy with that answer? Give your own. This will be used the next time this question is asked.',
    placeholder: 'Type your answer here…',
    button: 'Save answer',
    toast: 'New answer saved',
  },
  gap: {
    title: 'Add your response',
    description: 'Your LastingMind didn\u2019t have enough to answer this one. Share your response and it\u2019ll be used next time this comes up.',
    placeholder: 'Type your response here…',
    button: 'Save response',
    toast: 'Response saved',
  },
}

interface ProvideNewAnswerModalProps {
  isOpen: boolean
  onClose: () => void
  onToast: (message: string) => void
  variant?: ModalVariant
}

const DRAG_CLOSE_THRESHOLD = 100

const SIMULATED_TRANSCRIPTS = [
  'I think the answer is more about how I felt at the time than what actually happened.',
  'Looking back, I would say that experience taught me to trust my instincts more.',
  'It\'s something I\'ve been thinking about for a while and I finally feel ready to put it into words.',
]

export function ProvideNewAnswerModal({ isOpen, onClose, onToast, variant = 'replace' }: ProvideNewAnswerModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const [answerText, setAnswerText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const recordingTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const transcriptIndex = useRef(0)

  const startRecording = useCallback(() => {
    setIsRecording(true)
    setRecordingSeconds(0)
    recordingTimer.current = setInterval(() => {
      setRecordingSeconds((s) => s + 1)
    }, 1000)
  }, [])

  const stopRecording = useCallback(() => {
    setIsRecording(false)
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current)
      recordingTimer.current = null
    }
    const transcript = SIMULATED_TRANSCRIPTS[transcriptIndex.current % SIMULATED_TRANSCRIPTS.length]
    transcriptIndex.current += 1
    setAnswerText((prev) => (prev ? `${prev} ${transcript}` : transcript))
    setRecordingSeconds(0)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const sheetVariants = useMemo(() => ({
    hidden: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    exit: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: 'easeIn' as const },
    },
  }), [shouldReduceMotion])

  const backdropVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
  }), [shouldReduceMotion])

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y > DRAG_CLOSE_THRESHOLD || info.velocity.y > 500) {
        onClose()
      }
    },
    [onClose],
  )

  const copy = VARIANT_COPY[variant]

  const handleSave = () => {
    setAnswerText('')
    onClose()
    onToast(copy.toast)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="new-answer-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="new-answer-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ willChange: 'transform' }}
          >
            {/* Drag handle + close */}
            <div className="relative flex shrink-0 items-center justify-center px-4 pb-2 pt-4">
              <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex size-6 items-center justify-center"
              >
                <X className="size-5 text-foreground/60" />
              </button>
            </div>

            <div className="flex flex-col gap-5 overflow-y-auto px-6 pb-10 pt-1" style={{ scrollbarWidth: 'none' }}>
              {/* Header */}
              <p className="font-display text-lg font-semibold text-foreground">
                {copy.title}
              </p>

              {/* Context line */}
              <p className="text-[14px] leading-[1.5] text-muted-foreground">
                {copy.description}
              </p>

              {/* Text area + action */}
              <div className="flex flex-col gap-3">
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder={copy.placeholder}
                  rows={4}
                  className="w-full resize-none rounded-[10px] border border-border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lm-green/40"
                />
                {answerText.trim() ? (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex w-full items-center justify-center rounded-[10px] bg-lm-green px-5 py-3 text-[15px] font-semibold text-white transition-colors active:scale-[0.98]"
                  >
                    {copy.button}
                  </button>
                ) : isRecording ? (
                  <button
                    type="button"
                    onMouseUp={stopRecording}
                    onTouchEnd={stopRecording}
                    className="relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-[10px] bg-red-500/10 px-5 py-3 text-[15px] font-semibold text-red-600 transition-colors"
                    aria-label="Release to stop recording"
                  >
                    <motion.div
                      className="absolute inset-0 bg-red-500/5"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="relative flex items-center gap-2.5">
                      <Square className="size-3.5 fill-current" />
                      <span>Recording {formatTime(recordingSeconds)}</span>
                    </span>
                    <span className="relative text-[13px] font-normal text-red-400">Release to stop</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onMouseDown={startRecording}
                    onTouchStart={startRecording}
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-lm-green/10 px-5 py-3 text-[15px] font-semibold text-lm-green transition-colors active:scale-[0.98]"
                    aria-label="Hold to record voice input"
                  >
                    <Mic className="size-4.5" />
                    Hold to speak
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
