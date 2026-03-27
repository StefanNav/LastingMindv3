import { motion } from 'framer-motion'
import { FileText, ChevronRight } from 'lucide-react'

interface TranscriptionReviewProps {
  text: string
  onSeeNote: () => void
  onContinue: () => void
}

export function TranscriptionReview({ text, onSeeNote, onContinue }: TranscriptionReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-4 border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4"
    >
      {/* Transcribed text card */}
      <div className="rounded-[15px] bg-white/90 px-[10px] py-5 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.16)]">
        <div className="flex items-center justify-center gap-[10px]">
          <div className="flex size-[30px] items-center justify-center">
            <div className="flex gap-[2px]">
              <div className="h-[10px] w-[3px] rounded-full bg-lm-green-dark/50" />
              <div className="h-[14px] w-[3px] rounded-full bg-lm-green-dark/50" />
              <div className="h-[8px] w-[3px] rounded-full bg-lm-green-dark/50" />
            </div>
          </div>
        </div>
        <p
          className="mt-3 font-display text-[20px] font-semibold leading-[28px] tracking-[0.45px] text-[#3e2f26]"
          style={{ fontVariationSettings: "'opsz' 12, 'wdth' 100" }}
        >
          {text}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={onSeeNote}
          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] border border-[#283227] px-5 py-4"
        >
          <FileText className="size-5 text-[#283227]" />
          <span className="text-[18px] font-medium leading-[1.2] text-[#283227]">
            See Note
          </span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4"
        >
          <span className="text-[18px] font-medium leading-[1.2] text-white">
            Continue
          </span>
          <ChevronRight className="size-5 text-white" />
        </button>
      </div>
    </motion.div>
  )
}
