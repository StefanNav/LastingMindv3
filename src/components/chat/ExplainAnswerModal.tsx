import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, Mic, Square } from 'lucide-react'

interface ExplainAnswerModalProps {
  isOpen: boolean
  onClose: () => void
  excerpts: { source: string; text: string }[]
  onToast: (message: string) => void
  isAudience?: boolean
  creatorFirstName?: string
}

const DRAG_CLOSE_THRESHOLD = 100

const SIMULATED_TRANSCRIPTS = [
  'I think the answer is more about how I felt at the time than what actually happened.',
  'Looking back, I would say that experience taught me to trust my instincts more.',
  'It\'s something I\'ve been thinking about for a while and I finally feel ready to put it into words.',
]

export function ExplainAnswerModal({ isOpen, onClose, excerpts, onToast, isAudience = false, creatorFirstName }: ExplainAnswerModalProps) {
  const shouldReduceMotion = useReducedMotion()
  const [additionText, setAdditionText] = useState('')
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
    setAdditionText((prev) => (prev ? `${prev} ${transcript}` : transcript))
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

  const handleSave = () => {
    setAdditionText('')
    onClose()
    onToast('Your response has been saved')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="explain-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="explain-panel"
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
                Where this came from
              </p>

              {/* Intro line */}
              <p className="text-[14px] leading-[1.5] text-muted-foreground">
                {isAudience
                  ? `This answer was shaped by stories and memories ${creatorFirstName ?? 'your loved one'} has shared. Here’s what it’s based on.`
                  : 'This answer was shaped by things you\'ve shared. Here are the relevant excerpts.'}
              </p>

              {/* Excerpt cards */}
              <div className="flex flex-col gap-3">
                {excerpts.map((excerpt, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 rounded-[10px] bg-lm-bg-card p-4 shadow-card"
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-lm-gold">
                      {excerpt.source}
                    </p>
                    <p className="text-[14px] leading-[1.5] text-foreground">
                      {excerpt.text}
                    </p>
                  </div>
                ))}
              </div>

              {!isAudience && (
                <>
                  {/* Divider */}
                  <div className="h-px bg-border/50" />

                  {/* Add more section */}
                  <div className="flex flex-col gap-2">
                    <p className="text-[15px] font-semibold text-foreground">
                      Want to add to this answer?
                    </p>
                    <p className="text-[13px] leading-[1.5] text-muted-foreground">
                      If something is missing or you'd like to give more detail, you can add to it here. Your response will be saved and used to improve future answers.
                    </p>
                  </div>

                  {/* Text area + action */}
                  <div className="flex flex-col gap-3">
                    <textarea
                      value={additionText}
                      onChange={(e) => setAdditionText(e.target.value)}
                      placeholder="Type your addition here…"
                      rows={4}
                      className="w-full resize-none rounded-[10px] border border-border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lm-green/40"
                    />
                    {isRecording ? (
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
                      <>
                        <button
                          type="button"
                          onMouseDown={startRecording}
                          onTouchStart={startRecording}
                          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-lm-green/10 px-5 py-3 text-[15px] font-semibold text-lm-green transition-colors active:scale-[0.98]"
                          aria-label="Hold to record voice input"
                        >
                          <Mic className="size-4.5" />
                          {additionText.trim() ? 'Hold to say more' : 'Hold to speak'}
                        </button>
                        {additionText.trim() && (
                          <button
                            type="button"
                            onClick={handleSave}
                            className="flex w-full items-center justify-center rounded-[10px] bg-lm-green px-5 py-3 text-[15px] font-semibold text-white transition-colors active:scale-[0.98]"
                          >
                            Save
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
