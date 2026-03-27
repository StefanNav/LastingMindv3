import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface FinishFooterProps {
  onSaveAndFinish: () => void
}

export function FinishFooter({ onSaveAndFinish }: FinishFooterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col items-center gap-[13px] border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4"
    >
      <p className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-body-alt)]">
        You can always return to say more.{' '}
      </p>
      <button
        type="button"
        onClick={onSaveAndFinish}
        className="flex w-full flex-col items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-10 py-4"
      >
        <ArrowRight className="size-6 text-white" />
        <span className="text-[18px] font-medium leading-[1.2] text-white">
          Save &amp; Finish
        </span>
      </button>
    </motion.div>
  )
}
