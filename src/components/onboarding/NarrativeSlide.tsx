import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface NarrativeSlideProps {
  heading: string
  subtitle: string
  imageSrc: string
  buttonLabel: string
  onNext: () => void
}

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export function NarrativeSlide({ heading, subtitle, imageSrc, buttonLabel, onNext }: NarrativeSlideProps) {
  return (
    <div className="flex h-full flex-col">
      <motion.div
        className="flex flex-1 flex-col"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-1 flex-col justify-end px-4 pb-6 pt-14 text-center">
          <motion.h1
            variants={fadeUp}
            className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-foreground text-center"
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-sans text-[15px] leading-relaxed text-[var(--lm-text-secondary)]"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          className="relative mt-auto flex items-end justify-center overflow-hidden"
          style={{ height: '45%' }}
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full object-contain object-bottom"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="px-4 pb-4 pt-2"
      >
        <Button
          onClick={onNext}
          className="h-[54px] w-full rounded-xl bg-lm-green text-[16px] font-semibold text-white active:scale-[0.97] active:brightness-90 transition-transform"
        >
          {buttonLabel}
        </Button>
      </motion.div>
    </div>
  )
}
