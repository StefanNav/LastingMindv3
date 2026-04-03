import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Type, ArrowUp, Square } from 'lucide-react'
import type { FavouritesInputMode } from '@/types/favourites'

interface SlotAnswerInputProps {
  inputMode: FavouritesInputMode
  onToggleMode: () => void
  onSubmit: (answer: string) => void
  mockAnswer: string
}

export function SlotAnswerInput({ inputMode, onToggleMode, onSubmit, mockAnswer }: SlotAnswerInputProps) {
  const [text, setText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Focus text input when switching to text mode
  useEffect(() => {
    if (inputMode === 'text') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [inputMode])

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingDuration(0)
      timerRef.current = setInterval(() => setRecordingDuration((d) => d + 1), 1000)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRecording])

  const handleVoiceStart = () => {
    setIsRecording(true)
  }

  const handleVoiceStop = () => {
    setIsRecording(false)
    // Mock transcription: auto-populate with mock answer
    setText(mockAnswer)
  }

  const handleSubmit = () => {
    const value = text.trim()
    if (value) {
      onSubmit(value)
      setText('')
      setIsRecording(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && text.trim()) {
      handleSubmit()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-3"
    >
      {/* Mode toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onToggleMode}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
            inputMode === 'voice'
              ? 'bg-lm-green/10 text-lm-green'
              : 'bg-transparent text-[var(--lm-text-secondary)]'
          }`}
        >
          <Mic className="size-3.5" />
          Voice
        </button>
        <button
          type="button"
          onClick={onToggleMode}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
            inputMode === 'text'
              ? 'bg-lm-green/10 text-lm-green'
              : 'bg-transparent text-[var(--lm-text-secondary)]'
          }`}
        >
          <Type className="size-3.5" />
          Type
        </button>
      </div>

      <AnimatePresence mode="wait">
        {inputMode === 'voice' ? (
          <motion.div
            key="voice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2"
          >
            {!isRecording && !text && (
              <button
                type="button"
                onClick={handleVoiceStart}
                className="flex size-14 items-center justify-center rounded-full bg-lm-green shadow-md transition-transform active:scale-95"
              >
                <Mic className="size-6 text-white" />
              </button>
            )}

            {isRecording && (
              <div className="flex flex-col items-center gap-2">
                {/* Recording waves placeholder */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-lm-green"
                      animate={{
                        height: [8, 20 + Math.random() * 12, 8],
                      }}
                      transition={{
                        duration: 0.6 + Math.random() * 0.4,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <p className="text-[12px] text-[var(--lm-text-secondary)]">
                  {recordingDuration}s — Tap to stop
                </p>
                <button
                  type="button"
                  onClick={handleVoiceStop}
                  className="flex size-12 items-center justify-center rounded-full bg-red-500 shadow-md"
                >
                  <Square className="size-4 fill-white text-white" />
                </button>
              </div>
            )}

            {/* Show transcribed text + submit */}
            {text && !isRecording && (
              <div className="flex w-full flex-col gap-2">
                <div className="rounded-xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)] p-3">
                  <p className="text-[14px] leading-[1.4] text-foreground">{text}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setText(''); setIsRecording(false) }}
                    className="flex-1 rounded-lg border border-[var(--lm-border)] px-4 py-2.5 text-[14px] font-semibold text-foreground"
                  >
                    Re-record
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 rounded-lg bg-lm-green px-4 py-2.5 text-[14px] font-semibold text-white"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your answer…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-[44px] w-full rounded-full border border-[var(--lm-border)] bg-[var(--lm-bg-card)] pl-4 pr-12 text-[14px] text-foreground outline-none placeholder:text-[var(--lm-text-secondary)] focus:border-lm-green focus:ring-1 focus:ring-lm-green/30"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-lm-green text-white disabled:opacity-30"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
