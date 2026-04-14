import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Pause, CircleStop } from 'lucide-react'

interface VoiceRecordingProps {
  onStop: () => void
  isPaused?: boolean
  onPauseChange?: (paused: boolean) => void
}

function useWaveformBars(count: number) {
  const [bars, setBars] = useState<number[]>(() =>
    Array.from({ length: count }, () => Math.random() * 30 + 6),
  )
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBars(Array.from({ length: count }, () => Math.random() * 34 + 6))
    }, 120)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [count])

  return bars
}

function useTimer(isPaused: boolean) {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function VoiceRecording({ onStop, isPaused: controlledPaused, onPauseChange }: VoiceRecordingProps) {
  const [localPaused, setLocalPaused] = useState(false)
  const isPaused = controlledPaused ?? localPaused
  const setIsPaused = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === 'function' ? v(isPaused) : v
    setLocalPaused(next)
    onPauseChange?.(next)
  }
  const bars = useWaveformBars(40)
  const time = useTimer(isPaused)

  return (
    <div className="flex flex-col items-center gap-3 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-8 pt-6">
      {/* Recording label */}
      <p className="text-lg font-medium leading-tight text-foreground">
        {isPaused ? 'Recording Paused' : 'Recording your answer...'}
      </p>

      {/* Waveform + timer */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-[45px] items-center justify-center gap-[5px]">
          {bars.map((height, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-lm-green-dark/70"
              animate={{ height: isPaused ? 6 : height }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
            />
          ))}
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="size-3 rounded-full bg-red-600" />
          <span className="text-center text-[18px] font-medium leading-[20px] text-lm-green-dark">
            {time}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex w-full gap-2">
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
          onClick={onStop}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#d40016] px-5 py-3 text-sm font-semibold text-white transition-colors active:scale-[0.98]"
        >
          <CircleStop className="size-5" />
          Press to Stop
        </button>
      </div>
    </div>
  )
}
