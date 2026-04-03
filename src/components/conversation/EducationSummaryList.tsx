import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Plus, ArrowRight } from 'lucide-react'
import { EditSummaryItemModal } from './EditSummaryItemModal'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import type { ConversationSummaryItem } from '@/types'

interface EducationSummaryListProps {
  heading: string
  listLabel: string
  addLabel: string
  items: ConversationSummaryItem[]
  onEdit: (item: ConversationSummaryItem) => void
  onDelete: (id: string) => void
  onAdd: (item: ConversationSummaryItem) => void
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

export function EducationSummaryList({
  heading,
  listLabel,
  addLabel,
  items,
  onEdit,
  onDelete,
  onAdd,
  onSaveAndFinish,
}: EducationSummaryListProps) {
  const [editingItem, setEditingItem] = useState<ConversationSummaryItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deletingItem, setDeletingItem] = useState<ConversationSummaryItem | null>(null)

  return (
    <div className="flex h-full flex-col bg-[var(--lm-bg-primary)]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[190px]">
        {/* Heading */}
        <div className="flex items-center justify-center px-[10px] pb-[10px]">
          <p className="flex-1 text-center font-display text-[26px] font-normal leading-[1.5] text-[#2f3228]">
            {heading}
          </p>
        </div>

        {/* List section */}
        <div className="flex flex-col gap-4 px-4 pt-4">
          <p className="text-[14px] font-semibold leading-[1.2] text-[#7b7b7b]">
            {listLabel}
          </p>

          {/* Timeline + cards two-column layout */}
          <div className="flex gap-[6px]">
            {/* Timeline column: single continuous line with dots */}
            <div className="relative flex w-[13px] shrink-0 flex-col items-center">
              {/* Continuous vertical line spanning between first and last dot */}
              <div
                className="absolute left-1/2 w-[2px] -translate-x-1/2 bg-[#33602b]/30"
                style={{
                  top: 0,
                  bottom: 0,
                }}
              />
            </div>

            {/* Cards column */}
            <div className="flex flex-1 flex-col gap-[24px]">
              {items.map((item, i) => (
                <div key={item.id} className="relative">
                  {/* Dot — positioned to align with top border of card */}
                  <div
                    className="absolute z-10 size-[10px] rounded-full border-[2px] border-[#33602b] bg-[#33602b]"
                    style={{ left: -17.5, top: 0 }}
                  />

                  {/* Card */}
                  <motion.div
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
                    className="flex flex-col gap-[6px] rounded-[10px] border border-[#e7ebd9] bg-[#fffcf4] p-4"
                  >
                    {/* Top row: date range + edit button */}
                    <div className="flex items-center gap-4">
                      <span className="flex-1 text-[14px] font-semibold leading-[1.2] text-[#5d6056]">
                        {item.dateRange}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="flex items-center rounded-[4px] bg-[#e7ebd9] p-1"
                      >
                        <Pencil className="size-4 text-[#5d6056]" />
                      </button>
                    </div>

                    {/* Degree/program + school */}
                    <div className="flex flex-col gap-[3px]">
                      <p className="font-display text-[18px] font-medium leading-[1.2] text-[#2f3228]">
                        {item.name}
                      </p>
                      <p className="text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-[#5d6056]">
                        {item.label}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Add button */}
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="flex items-center justify-center gap-[10px] rounded-[6px] border border-dashed border-[#5d6056] bg-[#fffcf4] px-4 py-[10px]"
              >
                <Plus className="size-5 text-[#5d6056]" />
                <span className="text-[16px] font-medium leading-[1.2] text-[#5d6056]">
                  {addLabel}
                </span>
              </button>
            </div>
          </div>
          <div className="h-[60px] shrink-0" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-col items-center gap-[13px] border-t border-black/16 bg-[var(--lm-bg-primary)] px-4 py-[30px]">
        <p className="text-center text-[14px] font-semibold leading-[1.2] text-[#313131]">
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

      {/* Edit modal */}
      <EditSummaryItemModal
        isOpen={editingItem !== null}
        title="Edit education entry"
        initialName={editingItem?.name ?? ''}
        initialRelationship={editingItem?.label ?? ''}
        initialDateRange={editingItem?.dateRange ?? ''}
        nameLabel="Degree / Program"
        namePlaceholder="e.g. BA History"
        relationshipLabel="School"
        relationshipPlaceholder="e.g. State University"
        showDateRange
        onSave={(name, relationship, dateRange) => {
          if (editingItem) {
            onEdit({ ...editingItem, name, label: relationship, dateRange })
          }
          setEditingItem(null)
        }}
        onCancel={() => setEditingItem(null)}
      />

      {/* Add modal */}
      <EditSummaryItemModal
        isOpen={isAdding}
        title="Add an education entry"
        nameLabel="Degree / Program"
        namePlaceholder="e.g. BA History"
        relationshipLabel="School"
        relationshipPlaceholder="e.g. State University"
        showDateRange
        onSave={(name, relationship, dateRange) => {
          onAdd({ id: `si-new-${Date.now()}`, name, label: relationship, dateRange })
          setIsAdding(false)
        }}
        onCancel={() => setIsAdding(false)}
      />

      {/* Delete confirmation */}
      <DeleteConfirmationModal
        isOpen={deletingItem !== null}
        name={deletingItem?.name ?? ''}
        onConfirm={() => {
          if (deletingItem) {
            onDelete(deletingItem.id)
          }
          setDeletingItem(null)
        }}
        onCancel={() => setDeletingItem(null)}
      />
    </div>
  )
}
