import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Pause, CircleStop, Send, ChevronRight } from 'lucide-react'

interface AnswerInputProps {
  mockAnswer: string
  onSubmit: (answer: string) => void
  onSkip?: () => void
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

type InputStep = 'idle' | 'recording' | 'transcribed'

export function AnswerInput({ mockAnswer, onSubmit, onSkip }: AnswerInputProps) {
  const [step, setStep] = useState<InputStep>('idle')
  const [isPaused, setIsPaused] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [text, setText] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const isRecording = step === 'recording'
  const bars = useCompactWaveform(20, isRecording && !isPaused)
  const { displayed: liveText, reset: resetLive } = useLiveTranscription(
    mockAnswer,
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
    setStep('recording')
    setIsPaused(false)
    setSeconds(0)
  }

  const handleStopRecording = () => {
    setStep('transcribed')
    setText(mockAnswer)
  }

  const handleSubmitText = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
      setStep('idle')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitText()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Text input with inline mic button */}
      <div className="relative min-h-[100px] overflow-hidden rounded-[10px] border border-border bg-background">
        {/* Live transcription overlay — shown during recording */}
        {isRecording && (
          <div className="p-3 pr-12 text-sm leading-relaxed text-foreground">
            {liveText || (
              <span className="text-muted-foreground">Listening...</span>
            )}
            <motion.span
              className="ml-0.5 inline-block h-[18px] w-[2px] translate-y-[3px] bg-lm-green"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
        )}

        {/* Transcribed text — shown after recording stops */}
        {step === 'transcribed' && (
          <p className="p-3 pr-12 text-sm leading-relaxed text-foreground">
            {text}
          </p>
        )}

        {/* Textarea — shown in idle state */}
        {step === 'idle' && (
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="w-full min-h-[100px] resize-none border-0 bg-transparent p-3 pr-12 font-sans text-sm leading-relaxed text-foreground outline-none"
            autoFocus
          />
        )}

        {/* Mic button — always visible, positioned at right of input */}
        {!isRecording && step !== 'transcribed' && (
          <button
            type="button"
            onClick={handleStartRecording}
            className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-lm-green/10 p-2.5 transition-colors hover:bg-lm-green/20 active:bg-lm-green/30"
          >
            <Mic className="size-5 text-lm-green" />
          </button>
        )}
      </div>

      {/* Recording bar — fixed height so layout doesn't shift */}
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

      {/* Action buttons */}
      <AnimatePresence mode="wait">
        {/* Idle — submit button */}
        {step === 'idle' && (
          <motion.div
            key="idle-btns"
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              <Send className="size-5" />
              Submit
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
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
            >
              <Pause className="size-5" />
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              type="button"
              onClick={handleStopRecording}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#d40016] px-5 py-3 text-sm font-semibold text-white transition-colors active:scale-[0.98]"
            >
              <CircleStop className="size-5" />
              Stop
            </button>
          </motion.div>
        )}

        {/* Transcribed review */}
        {step === 'transcribed' && (
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
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
            >
              <Mic className="size-5" />
              Say more
            </button>
            <button
              type="button"
              onClick={() => onSubmit(text.trim())}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
            >
              Continue
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip link */}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="mx-auto text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip
        </button>
      )}
    </div>
  )
}
