import { motion } from 'framer-motion'
import { RewardPrimaryCTA } from './RewardCTAs'

interface EncouragementScreenProps {
  headline: string
  treeImage: string
  onContinue: () => void
}

export function EncouragementScreen({
  headline,
  treeImage,
  onContinue,
}: EncouragementScreenProps) {
  return (
    <motion.div
      key="encouragement"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline */}
      <div className="px-6 pt-[80px]">
        <p className="font-display text-2xl font-semibold leading-tight text-foreground text-center">
          {headline}
        </p>
      </div>

      {/* Tree image */}
      <div className="flex flex-1 items-center justify-center">
        <div className="h-[248px] w-full max-w-[403px] overflow-hidden">
          <img
            src={treeImage}
            alt="Your growing tree"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Continue button */}
      <div className="px-4 pb-[30px] pt-4 mt-auto">
        <RewardPrimaryCTA label="Continue" onClick={onContinue} />
      </div>
    </motion.div>
  )
}
