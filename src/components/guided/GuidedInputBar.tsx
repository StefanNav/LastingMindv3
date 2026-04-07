import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Square } from 'lucide-react'

interface GuidedInputBarProps {
  inputMode: 'voice' | 'text'
  isRecording: boolean
  onSend: (text: string) => void
  onStartRecording: () => void
  onStopRecording: () => void
  onSetInputMode: (mode: 'voice' | 'text') => void
  disabled?: boolean
}

export function GuidedInputBar({
  inputMode,
  isRecording,
  onSend,
  onStartRecording,
  onStopRecording,
  onSetInputMode,
  disabled = false,
}: GuidedInputBarProps) {
  const [text, setText] = useState('')
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (trimmed) {
      onSend(trimmed)
      setText('')
      onSetInputMode('voice')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleStartRecording = () => {
    onStartRecording()
    setRecordingSeconds(0)
    intervalRef.current = setInterval(() => {
      setRecordingSeconds((s) => s + 1)
    }, 1000)

    // Auto-stop after 3 seconds (mock)
    setTimeout(() => {
      handleStopRecording()
    }, 3000)
  }

  const handleStopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setRecordingSeconds(0)
    onStopRecording()
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="border-t border-border/50 bg-[var(--lm-bg-primary)] px-3 pb-5 pt-3">
      <AnimatePresence mode="wait">
        {/* ── Recording state ── */}
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
                Recording… {formatTime(recordingSeconds)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleStopRecording}
              className="flex size-14 items-center justify-center rounded-full bg-red-500 shadow-lg transition-transform active:scale-95"
            >
              <Square className="size-5 text-white" fill="white" />
            </button>
          </motion.div>

        /* ── Voice mode (default) ── */
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
              onClick={handleStartRecording}
              disabled={disabled}
              className="flex size-16 items-center justify-center rounded-full bg-lm-green shadow-lg transition-transform active:scale-95 disabled:opacity-50"
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

        /* ── Text mode ── */
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer here…"
                disabled={disabled}
                autoFocus
                className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
            </div>

            {text.trim() ? (
              <button
                type="button"
                onClick={handleSubmit}
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
  )
}
