import { motion } from 'framer-motion'

export function CardBack() {
  return (
    <div className="flex h-[360px] w-[260px] flex-col overflow-hidden rounded-2xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)]"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Green header strip — inspired by reward card */}
      <div className="flex h-[72px] shrink-0 items-center justify-center bg-lm-green">
        <p className="font-display text-[16px] font-semibold leading-[1.2] text-white tracking-wide">
          LastingMind
        </p>
      </div>

      {/* Card body — decorative pattern */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#f7f6f3] px-6">
        {/* Decorative diamond pattern */}
        <div className="flex flex-col items-center gap-2">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-2">
              {Array.from({ length: row === 1 ? 3 : 2 }, (_, i) => (
                <motion.div
                  key={i}
                  className="size-3 rotate-45 rounded-[2px] bg-lm-green/20"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Subtle leaf icon */}
        <div className="flex size-12 items-center justify-center rounded-full bg-lm-green/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-lm-green">
            <path
              d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9C13.5 18.5 12 15.5 12 12c0-3.5 1.5-6.5 4.3-8.1C15 2.3 13.5 2 12 2z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Decorative diamond pattern — mirrored */}
        <div className="flex flex-col items-center gap-2">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-2">
              {Array.from({ length: row === 1 ? 3 : 2 }, (_, i) => (
                <motion.div
                  key={i}
                  className="size-3 rotate-45 rounded-[2px] bg-lm-green/20"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
