import { useState, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Camera, X, ImagePlus, Trash2 } from 'lucide-react'
import type { MemoryProfileUser } from '@/types'

interface IdentityBlockProps {
  user: MemoryProfileUser
}

const DRAG_CLOSE_THRESHOLD = 100

export function IdentityBlock({ user }: IdentityBlockProps) {
  const initial = user.name.charAt(0).toUpperCase()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const displayUrl = previewUrl ?? user.avatarUrl

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    // Reset input so the same file can be re-selected
    e.target.value = ''
  }

  const handleChoosePhoto = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = () => {
    setPreviewUrl(null)
    setSheetOpen(false)
  }

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
        setSheetOpen(false)
      }
    },
    [],
  )

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {/* Avatar with camera badge */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="relative"
          aria-label="Change profile photo"
        >
          {displayUrl ? (
            <img
              src={displayUrl}
              alt={user.name}
              className="size-20 rounded-full object-cover border-2 border-lm-green/20"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 border-2 border-lm-green/20">
              <span className="text-2xl font-bold text-primary">{initial}</span>
            </div>
          )}
          {/* Camera badge */}
          <div className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full border border-border/50 bg-[var(--lm-bg-primary)] shadow-sm">
            <Camera className="size-3 text-muted-foreground" />
          </div>
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Name */}
        <p className="font-display text-2xl font-semibold leading-tight text-foreground">
          {user.name}
        </p>

        {/* Age */}
        <p className="text-sm font-medium text-muted-foreground">{user.age}</p>

        {/* Tagline */}
        <p className="text-center text-sm italic leading-snug text-muted-foreground">
          {user.tagline}
        </p>
      </div>

      {/* ── Change photo bottom sheet ── */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="photo-backdrop"
              className="fixed inset-0 z-40 bg-black/50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSheetOpen(false)}
              style={{ willChange: 'opacity' }}
            />

            {/* Sheet */}
            <motion.div
              key="photo-panel"
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
                  onClick={() => setSheetOpen(false)}
                  className="absolute right-4 top-4 flex size-6 items-center justify-center"
                >
                  <X className="size-5 text-foreground/60" />
                </button>
              </div>

              {/* Content */}
              <div className="flex flex-col items-center gap-5 px-6 pb-10 pt-2">
                {/* Preview */}
                {displayUrl ? (
                  <img
                    src={displayUrl}
                    alt={user.name}
                    className="size-24 rounded-full object-cover border-2 border-lm-green/20"
                  />
                ) : (
                  <div className="flex size-24 items-center justify-center rounded-full bg-primary/10 border-2 border-lm-green/20">
                    <span className="text-3xl font-bold text-primary">{initial}</span>
                  </div>
                )}

                <p className="text-sm font-semibold text-foreground">Profile Photo</p>

                {/* Action buttons */}
                <div className="flex w-full flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleChoosePhoto}
                    className="flex items-center gap-3 rounded-[10px] bg-foreground/[0.04] px-4 py-3.5 text-left transition-colors hover:bg-muted active:bg-muted"
                  >
                    <ImagePlus className="size-5 text-foreground/70" />
                    <span className="text-[15px] font-medium text-foreground">Choose Photo</span>
                  </button>

                  {displayUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="flex items-center gap-3 rounded-[10px] bg-foreground/[0.04] px-4 py-3.5 text-left transition-colors hover:bg-muted active:bg-muted"
                    >
                      <Trash2 className="size-5 text-foreground/70" />
                      <span className="text-[15px] font-medium text-foreground">Remove Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
