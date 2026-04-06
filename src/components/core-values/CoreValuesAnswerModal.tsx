import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Keyboard, Pause, CircleStop, Send, ChevronRight, X } from 'lucide-react'
import type { CoreValuesCategory, CoreValuesInputMode } from '@/types/coreValues'

type ModalStep = 'idle' | 'recording' | 'transcribed'

interface CoreValuesAnswerModalProps {
  category: CoreValuesCategory
  inputMode: CoreValuesInputMode
  onToggleMode: () => void
  onSubmit: (answer: string) => void
  onDismiss: () => void
}

function useLiveTranscription(mockAnswer: string, isRecording: boolean, isPaused: boolean) {
  const [displayed, setDisplayed] = useState('')
  const words = useRef<string[]>([])
  const indexRef = useRef(0)

  useEffect(() => {
    if (isRecording && !isPaused) {
      words.current = mockAnswer.split(' ')
      const interval = setInterval(() => {
        if (indexRef.current < words.current.length) {
          setDisplayed((prev) =>
            prev ? `${prev} ${words.current[indexRef.current]}` : words.current[indexRef.current],
          )
          indexRef.current += 1
        }
      }, 320)
      return () => clearInterval(interval)
    }
  }, [isRecording, isPaused, mockAnswer])

  const reset = () => {
    setDisplayed('')
    indexRef.current = 0
  }

  return { displayed, reset }
}

function useCompactWaveform(count: number, active: boolean) {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: count }, () => Math.random() * 16 + 4),
  )
  useEffect(() => {
    if (!active) return
    const interval = setInterval(() => {
      setBars(Array.from({ length: count }, () => Math.random() * 18 + 4))
    }, 120)
    return () => clearInterval(interval)
  }, [count, active])
  return bars
}

export function CoreValuesAnswerModal({
  category,
  inputMode,
  onToggleMode,
  onSubmit,
  onDismiss,
}: CoreValuesAnswerModalProps) {
  const [modalStep, setModalStep] = useState<ModalStep>('idle')
  const [isPaused, setIsPaused] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [text, setText] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isRecording = modalStep === 'recording'
  const bars = useCompactWaveform(20, isRecording && !isPaused)
  const { displayed: liveText, reset: resetLive } = useLiveTranscription(
    category.mockAnswer,
    isRecording,
    isPaused,
  )

  // Recording timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }
    if (timerRef.current) clearInterval(timerRef.current)
  }, [isRecording, isPaused])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeLabel = `${mins}:${secs.toString().padStart(2, '0')}`

  const handleStartRecording = () => {
    resetLive()
    setModalStep('recording')
    setIsPaused(false)
    setSeconds(0)
  }

  const handleStopRecording = () => {
    setModalStep('transcribed')
    setText(category.mockAnswer)
  }

  const handleSubmitText = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
      setModalStep('idle')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitText()
    }
  }

  const isTextMode = modalStep === 'idle' && inputMode === 'text'
  const showPlaceholder = modalStep === 'idle' && inputMode === 'voice'
  const showLive = isRecording
  const showTranscribed = modalStep === 'transcribed'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
          mass: 0.9,
        }}
        className="flex w-full max-w-[400px] flex-col gap-4 rounded-xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)] px-5 py-5"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      >
        {/* Header — category label + close button */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold uppercase tracking-[0.5px] text-lm-green">
              {category.categoryName}
            </span>
            <p className="font-display text-[20px] font-normal leading-[1.3] text-foreground">
              {category.question}
            </p>
          </div>
          <button
            type="button"
            onClick={onDismiss}
            className="ml-3 mt-1 flex shrink-0 items-center justify-center rounded-full bg-black/5 p-1.5"
          >
            <X className="size-4 text-[var(--lm-text-secondary)]" />
          </button>
        </div>

        {/* Answer box — persistent across all states */}
        <div className="relative min-h-[100px] overflow-hidden rounded-[10px] border border-[var(--lm-border)] bg-white p-3">
          {showPlaceholder && (
            <p className="text-[15px] leading-[1.5] text-[var(--lm-text-secondary)]">
              Your answer will appear here...
            </p>
          )}

          {showLive && (
            <div className="text-[15px] leading-[1.5] text-[var(--lm-text-primary)]">
              {liveText || (
                <span className="text-[var(--lm-text-secondary)]">Listening...</span>
              )}
              <motion.span
                className="ml-0.5 inline-block h-[18px] w-[2px] translate-y-[3px] bg-lm-green"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              />
            </div>
          )}

          {showTranscribed && (
            <p className="text-[15px] leading-[1.5] text-[var(--lm-text-primary)]">
              {text}
            </p>
          )}

          {isTextMode && (
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer here..."
              className="absolute inset-0 w-full resize-none border-0 bg-transparent p-3 font-sans text-[15px] leading-[1.5] text-[var(--lm-text-primary)] outline-none placeholder:text-[var(--lm-text-secondary)]"
              autoFocus
            />
          )}
        </div>

        {/* Recording bar slot — fixed height so the modal never resizes */}
        <div className="flex h-[28px] items-center justify-center">
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="size-2.5 rounded-full bg-red-600" />
              <span className="text-[14px] font-semibold tabular-nums text-lm-green-dark">
                {timeLabel}
              </span>
              <div className="flex h-[20px] items-center gap-[3px]">
                {bars.map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-[2px] rounded-full bg-lm-green-dark/60"
                    animate={{ height: isPaused ? 4 : height }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action buttons — animated transitions */}
        <AnimatePresence mode="wait">
          {/* Voice idle */}
          {modalStep === 'idle' && inputMode === 'voice' && (
            <motion.div
              key="voice-idle-btns"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-col gap-2"
            >
              <button
                type="button"
                onClick={handleStartRecording}
                className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4"
              >
                <Mic className="size-5 text-white" />
                <span className="text-[16px] font-medium leading-[1.2] text-white">
                  Press to Talk
                </span>
              </button>
              <button
                type="button"
                onClick={onToggleMode}
                className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] px-5 py-4"
              >
                <Keyboard className="size-5 text-[#283227]" />
                <span className="text-center text-[14px] font-medium leading-[1.2] text-[#283227]">
                  Prefer to type? Switch to text
                </span>
              </button>
            </motion.div>
          )}

          {/* Recording controls */}
          {isRecording && (
            <motion.div
              key="recording-btns"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex w-full gap-2"
            >
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] border border-[#283227] px-5 py-4"
              >
                <Pause className="size-5 text-[#283227]" />
                <span className="text-[16px] font-medium leading-[1.2] text-[#283227]">
                  {isPaused ? 'Resume' : 'Pause'}
                </span>
              </button>
              <button
                type="button"
                onClick={handleStopRecording}
                className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-[#d40016] px-5 py-4"
              >
                <CircleStop className="size-5 text-white" />
                <span className="text-[16px] font-medium leading-[1.2] text-white">
                  Stop
                </span>
              </button>
            </motion.div>
          )}

          {/* Transcribed review */}
          {modalStep === 'transcribed' && (
            <motion.div
              key="transcribed-btns"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex w-full gap-2"
            >
              <button
                type="button"
                onClick={handleStartRecording}
                className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] px-5 py-4"
              >
                <Mic className="size-5 text-[#283227]" />
                <span className="text-[16px] font-medium leading-[1.2] text-[#283227]">
                  Say more
                </span>
              </button>
              <button
                type="button"
                onClick={() => onSubmit(text.trim())}
                className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4"
              >
                <span className="text-[16px] font-medium leading-[1.2] text-white">
                  Save answer
                </span>
                <ChevronRight className="size-5 text-white" />
              </button>
            </motion.div>
          )}

          {/* Text mode */}
          {isTextMode && (
            <motion.div
              key="text-btns"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex flex-col gap-2"
            >
              <button
                type="button"
                onClick={handleSubmitText}
                disabled={!text.trim()}
                className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4 disabled:opacity-40"
              >
                <Send className="size-5 text-white" />
                <span className="text-[16px] font-medium leading-[1.2] text-white">
                  Save answer
                </span>
              </button>
              <button
                type="button"
                onClick={onToggleMode}
                className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] px-5 py-4"
              >
                <Mic className="size-5 text-[#283227]" />
                <span className="text-center text-[14px] font-medium leading-[1.2] text-[#283227]">
                  Prefer to talk? Switch to voice
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
