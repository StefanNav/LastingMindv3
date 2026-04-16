import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mic, Square } from 'lucide-react'

interface AnswerInputProps {
  mockAnswer: string
  onSubmit: (answer: string) => void
  onSkip?: () => void
}

export function AnswerInput({ mockAnswer, onSubmit, onSkip }: AnswerInputProps) {
  const [text, setText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const recordingTimer = useRef<ReturnType<typeof setInterval> | null>(null)

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
    setText((prev) => (prev ? `${prev} ${mockAnswer}` : mockAnswer))
    setRecordingSeconds(0)
  }, [mockAnswer])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim())
      setText('')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Textarea — always editable */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your answer here…"
        rows={4}
        className="w-full resize-none rounded-[10px] border border-border bg-white px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-lm-green/40"
        autoFocus
      />

      {/* Action buttons */}
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
            {text.trim() ? 'Hold to say more' : 'Hold to speak'}
          </button>
          {text.trim() && (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex w-full items-center justify-center rounded-[10px] bg-lm-green px-5 py-3 text-[15px] font-semibold text-white transition-colors active:scale-[0.98]"
            >
              Submit
            </button>
          )}
        </>
      )}

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
