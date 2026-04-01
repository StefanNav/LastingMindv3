import { motion } from 'framer-motion'
import type { FamilyWebMember } from '@/types'
import { cn } from '@/lib/utils'

interface FamilyWebPickerProps {
  webMembers: FamilyWebMember[]
  selectedId: string | null
  onSelect: (id: string) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export function FamilyWebPicker({ webMembers, selectedId, onSelect }: FamilyWebPickerProps) {
  return (
    <div className="-mx-4 border-y border-lm-border-subtle bg-lm-bg-card px-4 py-5">
      <motion.div
        className="flex flex-wrap items-start justify-center gap-x-4 gap-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {webMembers.map((member) => {
          const isSelected = selectedId === member.id
          const initials = `${member.firstName[0]}${member.lastName[0]}`
          const count = member.entryCount ?? 0

          return (
            <motion.button
              key={member.id}
              type="button"
              variants={itemVariants}
              onClick={() => onSelect(member.id)}
              className="flex w-[72px] flex-col items-center gap-1.5"
            >
              {/* Initials circle with entry count badge */}
              <div className="relative">
                <motion.div
                  animate={isSelected ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={cn(
                    'flex size-10 items-center justify-center rounded-full transition-colors duration-200',
                    isSelected
                      ? 'border-2 border-lm-green bg-[#e7ebd9] shadow-[0_0_10px_rgba(50,117,30,0.25)]'
                      : 'border border-dashed border-[var(--lm-text-secondary)] bg-[#fffcf5]',
                  )}
                >
                  <p
                    className={cn(
                      'font-display text-[20px] font-bold leading-none',
                      isSelected ? 'text-lm-green' : 'text-[var(--lm-text-secondary)]',
                    )}
                  >
                    {initials}
                  </p>
                </motion.div>

                {/* Entry count badge */}
                {count > 0 && (
                  <div
                    className={cn(
                      'absolute -right-1 -top-1 flex size-[18px] items-center justify-center rounded-full text-[10px] font-bold leading-none',
                      isSelected
                        ? 'bg-lm-green text-white'
                        : 'bg-[var(--lm-neutral-warm)] text-white',
                    )}
                  >
                    {count}
                  </div>
                )}
              </div>

              {/* Name + relationship */}
              <div className="flex flex-col items-center gap-[2px]">
                <p
                  className={cn(
                    'max-w-full truncate text-center text-[14px] font-bold leading-none',
                    isSelected ? 'text-lm-green' : 'text-foreground',
                  )}
                >
                  {member.firstName} {member.lastName[0]}.
                </p>
                <p className="text-center text-[12px] font-medium leading-[1.2] text-[var(--lm-text-secondary)]">
                  {member.relationship}
                </p>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
