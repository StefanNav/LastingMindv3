import { motion } from 'framer-motion'

interface GuidedFollowUpChipsProps {
  chips: string[]
  onSelect: (text: string) => void
}

export function GuidedFollowUpChips({ chips, onSelect }: GuidedFollowUpChipsProps) {
  if (chips.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="px-4 py-2"
    >
      <p className="mb-2 text-[12px] font-medium text-muted-foreground">
        What would you like to explore?
      </p>
      <div className="flex flex-wrap gap-2">
      {chips.map((text) => (
        <button
          key={text}
          type="button"
          onClick={() => onSelect(text)}
          className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-colors active:scale-[0.97] ${
            text === 'Move on'
              ? 'border-border/60 bg-transparent text-muted-foreground hover:bg-muted/50'
              : 'border-border bg-lm-bg-card text-primary hover:bg-primary/5'
          }`}
        >
          {text}
        </button>
      ))}
      </div>
    </motion.div>
  )
}
