import { motion } from 'framer-motion'
import { Pencil, X, Plus, ArrowRight } from 'lucide-react'
import type { ConversationSummaryItem } from '@/types'

interface SummaryListProps {
  heading: string
  listLabel: string
  addLabel: string
  items: ConversationSummaryItem[]
  onEdit: (item: ConversationSummaryItem) => void
  onDelete: (id: string) => void
  onAdd: () => void
  onSaveAndFinish: () => void
}

const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function SummaryList({
  heading,
  listLabel,
  addLabel,
  items,
  onEdit,
  onDelete,
  onAdd,
  onSaveAndFinish,
}: SummaryListProps) {
  return (
    <div className="flex h-full flex-col bg-[var(--lm-bg-primary)]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[160px]">
        {/* Heading */}
        <div className="flex items-center justify-center px-4 py-[10px]">
          <p
            className="flex-1 text-center font-display text-[26px] font-normal leading-[1.5] text-[#2f3228]"
          >
            {heading}
          </p>
        </div>

        {/* List section */}
        <div className="flex flex-col gap-4 px-4 pt-4">
          <p className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-body-alt)]">
            {listLabel}
          </p>

          <div className="flex flex-col gap-[10px]">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
                className="flex items-end gap-[10px] rounded-[4px] border border-black/25 bg-white px-3 py-[10px]"
              >
                <div className="flex flex-1 items-center gap-10">
                  <span className="shrink-0 text-[18px] font-medium leading-[1.2] text-[#2f3228]">
                    {item.name}
                  </span>
                  <span className="flex-1 text-right text-[14px] font-medium leading-[1.2] text-[var(--lm-text-secondary)]">
                    {item.label}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-[10px]">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="flex size-[18px] items-center justify-center"
                  >
                    <Pencil className="size-[14px] text-[var(--lm-text-secondary)]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    className="flex size-[18px] items-center justify-center"
                  >
                    <X className="size-[14px] text-[var(--lm-text-secondary)]" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add button */}
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center justify-center gap-[10px] rounded-[6px] border border-dashed border-[#5d6056] bg-[#fffcf4] px-4 py-[10px]"
            >
              <Plus className="size-4 text-[#5d6056]" />
              <span className="text-[14px] font-medium leading-[1.2] text-[#5d6056]">
                {addLabel}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-col items-center gap-[13px] border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4">
        <p className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-body-alt)]">
          You can always return to say more.{' '}
        </p>
        <button
          type="button"
          onClick={onSaveAndFinish}
          className="flex w-full flex-col items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-10 py-4"
        >
          <ArrowRight className="size-6 text-white" />
          <span className="text-[18px] font-medium leading-[1.2] text-white">
            Save &amp; Finish
          </span>
        </button>
      </div>
    </div>
  )
}
