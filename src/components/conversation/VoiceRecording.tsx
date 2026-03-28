import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Pause, CircleStop } from 'lucide-react'

interface VoiceRecordingProps {
  onStop: () => void
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

function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function VoiceRecording({ onStop }: VoiceRecordingProps) {
  const bars = useWaveformBars(40)
  const time = useTimer()
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="flex flex-col items-center gap-5 border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4">
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
          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] border border-[#283227] px-5 py-4"
        >
          <Pause className="size-6 text-[#283227]" />
          <span className="text-[18px] font-medium leading-[1.2] text-[#283227]">
            {isPaused ? 'Resume' : 'Pause'}
          </span>
        </button>
        <button
          type="button"
          onClick={onStop}
          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-[#d40016] px-5 py-4"
        >
          <CircleStop className="size-6 text-white" />
          <span className="text-[18px] font-medium leading-[1.2] text-white">
            Press to Stop
          </span>
        </button>
      </div>
    </div>
  )
}
