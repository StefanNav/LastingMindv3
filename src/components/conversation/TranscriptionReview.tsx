import { motion } from 'framer-motion'
import { Mic, ChevronRight } from 'lucide-react'

interface TranscriptionReviewProps {
  onSayMore: () => void
  onContinue: () => void
}

export function TranscriptionReview({ onSayMore, onContinue }: TranscriptionReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-[20px] border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4"
    >
      {/* Action buttons */}
      <div className="flex w-full gap-2">
        <button
          type="button"
          onClick={onSayMore}
          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] px-5 py-4"
        >
          <Mic className="size-6 text-[#283227]" />
          <span className="text-[16px] font-medium leading-[1.2] text-[#283227]">
            Say more
          </span>
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="flex flex-1 items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-5 py-4"
        >
          <span className="text-[16px] font-medium leading-[1.2] text-white">
            Continue
          </span>
          <ChevronRight className="size-6 text-white" />
        </button>
      </div>
    </motion.div>
  )
}
