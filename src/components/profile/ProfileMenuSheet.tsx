import { useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, UserPen, Bell, KeyRound, ShieldCheck, HelpCircle, LogOut } from 'lucide-react'

interface ProfileMenuSheetProps {
  isOpen: boolean
  onClose: () => void
}

const DRAG_CLOSE_THRESHOLD = 100

const menuItems = [
  { icon: UserPen, label: 'Edit profile' },
  { icon: Bell, label: 'Notification preferences' },
  { icon: KeyRound, label: 'Account details' },
  { icon: ShieldCheck, label: 'Privacy & data' },
  { icon: HelpCircle, label: 'Help & support' },
  { icon: LogOut, label: 'Sign out' },
]

export function ProfileMenuSheet({ isOpen, onClose }: ProfileMenuSheetProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="menu-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          {/* Sheet */}
          <motion.div
            key="menu-panel"
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
            {/* Drag handle + close */}
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

            {/* Menu items */}
            <div className="flex flex-col pb-10 pt-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={onClose}
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
