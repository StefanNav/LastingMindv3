import { motion } from 'framer-motion'

interface TreePlaceholderProps {
  growthLevel: number
}

export function TreePlaceholder({ growthLevel }: TreePlaceholderProps) {
  const trunkHeight = 40 + growthLevel * 15
  const canopySize = 60 + growthLevel * 20

  return (
    <div className="flex flex-col items-center justify-end">
      {/* Canopy */}
      <motion.div
        className="rounded-full bg-primary/20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          width: canopySize,
          height: canopySize,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* Trunk */}
      <motion.div
        className="rounded-b bg-primary/40"
        initial={{ height: 0 }}
        animate={{ height: trunkHeight }}
        style={{ width: 8 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}
