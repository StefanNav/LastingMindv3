import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, HelpCircle, PlusCircle } from 'lucide-react'

interface ChatMenuSheetProps {
  isOpen: boolean
  onClose: () => void
  onShowCategories: () => void
}

const DRAG_CLOSE_THRESHOLD = 100

export function ChatMenuSheet({ isOpen, onClose, onShowCategories }: ChatMenuSheetProps) {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  const sheetVariants = useMemo(() => ({
    hidden: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    exit: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: 'easeIn' as const },
    },
  }), [shouldReduceMotion])

  const backdropVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
  }), [shouldReduceMotion])

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y > DRAG_CLOSE_THRESHOLD || info.velocity.y > 500) {
        onClose()
      }
    },
    [onClose],
  )

  const menuItems = [
    {
      icon: HelpCircle,
      label: 'What can I ask?',
      action: () => {
        onClose()
        onShowCategories()
      },
    },
    {
      icon: PlusCircle,
      label: 'Add more stories',
      action: () => {
        onClose()
        navigate('/home')
      },
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="chat-menu-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          <motion.div
            key="chat-menu-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ willChange: 'transform' }}
          >
            <div className="relative flex shrink-0 items-center justify-center px-4 pb-2 pt-4">
              <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex size-6 items-center justify-center"
              >
                <X className="size-5 text-foreground/60" />
              </button>
            </div>

            <div className="flex flex-col pb-10 pt-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="flex items-center gap-3 px-6 py-3.5 text-left transition-colors hover:bg-muted active:bg-muted"
                >
                  <item.icon className="size-5 text-foreground/70" />
                  <span className="text-[15px] font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
