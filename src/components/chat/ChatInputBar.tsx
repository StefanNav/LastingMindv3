import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Square } from 'lucide-react'

interface ChatInputBarProps {
  onSend: (text: string) => void
  placeholder?: string
  disabled?: boolean
}

export function ChatInputBar({ onSend, placeholder = 'Ask your LastingMind anything…', disabled = false }: ChatInputBarProps) {
  const [text, setText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (trimmed) {
      onSend(trimmed)
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingSeconds(0)
    intervalRef.current = setInterval(() => {
      setRecordingSeconds((s) => s + 1)
    }, 1000)

    // Simulate recording for 3 seconds then auto-stop
    setTimeout(() => {
      stopRecording()
    }, 3000)
  }

  const stopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRecording(false)
    setRecordingSeconds(0)
    // Simulate a transcribed voice message
    const mockTranscription = 'That\'s a great question. Let me think about that and share what comes to mind.'
    onSend(mockTranscription)
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="border-t border-border/50 bg-[var(--lm-bg-primary)] px-3 pb-5 pt-2">
      <AnimatePresence mode="wait">
        {isRecording ? (
          <motion.div
            key="recording"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-full bg-red-50 px-4 py-2.5"
          >
            <div className="size-2.5 animate-pulse rounded-full bg-red-500" />
            <span className="flex-1 text-[14px] font-medium text-red-600">
              Recording… {formatTime(recordingSeconds)}
            </span>
            <button
              type="button"
              onClick={stopRecording}
              className="flex size-9 items-center justify-center rounded-full bg-red-500"
            >
              <Square className="size-4 text-white" fill="white" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="flex items-end gap-2"
          >
            <div className="flex flex-1 items-center gap-1 rounded-full border border-border bg-white px-4 py-2">
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
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
                onClick={startRecording}
                disabled={disabled}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lm-green transition-transform active:scale-95 disabled:opacity-50"
              >
                <Mic className="size-4.5 text-white" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
