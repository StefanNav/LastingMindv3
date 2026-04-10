import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'

interface VoiceIdleStateProps {
  onBeginRecording: () => void
}

export function VoiceIdleState({ onBeginRecording }: VoiceIdleStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-1 flex-col items-center justify-center gap-5"
    >
      <button
        type="button"
        onClick={onBeginRecording}
        className="flex size-20 items-center justify-center rounded-full bg-lm-green shadow-lg transition-transform active:scale-95"
      >
        <Mic className="size-8 text-white" />
      </button>
      <p className="max-w-[220px] text-center text-[15px] font-medium leading-[1.4] text-muted-foreground">
        Press to respond, we'll capture everything you say
      </p>
    </motion.div>
  )
}
