import { motion } from 'framer-motion'

interface SuggestionChipsProps {
  suggestions: string[]
  onSelect: (text: string) => void
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  if (suggestions.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-wrap gap-2 px-4 py-2"
    >
      {suggestions.map((text) => (
        <button
          key={text}
          type="button"
          onClick={() => onSelect(text)}
          className="rounded-full border border-border bg-lm-bg-card px-3.5 py-2 text-[13px] font-medium text-primary transition-colors hover:bg-primary/5 active:scale-[0.97]"
        >
          {text}
        </button>
      ))}
    </motion.div>
  )
}
