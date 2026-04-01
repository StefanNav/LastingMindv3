import { motion } from 'framer-motion'

export function FamilyDetailSlide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex h-[100px] w-[94px] items-center justify-center">
        <img
          src="/images/Family 1.png"
          alt="Family"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="font-sans text-[16px] font-semibold text-foreground">
          Family
        </span>
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-[50px] w-[50px] items-center justify-center"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="text-lm-gold"
              >
                <path
                  d="M20 2l5.09 10.31L36.18 14l-8.09 7.88L29.82 33 20 27.69 10.18 33l1.73-11.12L3.82 14l11.09-1.69L20 2z"
                  fill="currentColor"
                  opacity={i <= 2 ? 1 : 0.25}
                />
              </svg>
            </div>
          ))}
        </div>
        <span className="font-sans text-[13px] text-[var(--lm-text-secondary)]">
          Growing
        </span>
      </div>
    </motion.div>
  )
}
