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
          <p className="flex-1 text-center font-display text-2xl font-semibold leading-tight text-foreground">
            {heading}
          </p>
        </div>

        {/* List section */}
        <div className="flex flex-col gap-4 px-4 pt-4">
          <p className="text-sm font-semibold leading-tight text-muted-foreground">
            {listLabel}
          </p>

          {/* Timeline + cards two-column layout */}
          <div className="flex gap-[6px]">
            {/* Timeline column: single continuous line with dots */}
            <div className="relative flex w-[13px] shrink-0 flex-col items-center">
              {/* Continuous vertical line spanning between first and last dot */}
              <div
                className="absolute left-1/2 w-[2px] -translate-x-1/2 bg-lm-green-dark/30"
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
                    className="absolute z-10 size-[10px] rounded-full border-[2px] border-lm-green-dark bg-lm-green-dark"
                    style={{ left: -17.5, top: 0 }}
                  />

                  {/* Card */}
                  <motion.div
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
                    className="flex flex-col gap-1.5 rounded-[10px] bg-lm-bg-card/40 p-4 shadow-card backdrop-blur-sm"
                  >
                    {/* Top row: date range + edit button */}
                    <div className="flex items-center gap-4">
                      <span className="flex-1 text-sm font-semibold leading-tight text-muted-foreground">
                        {item.dateRange}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="flex items-center rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted"
                      >
                        <Pencil className="size-4" />
                      </button>
                    </div>

                    {/* Degree/program + school */}
                    <div className="flex flex-col gap-[3px]">
                      <p className="font-display text-lg font-medium leading-tight text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm font-medium leading-tight text-muted-foreground">
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
                className="flex items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-border px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
              >
                <Plus className="size-5" />
                <span className="text-base font-medium">
                  {addLabel}
                </span>
              </button>
            </div>
          </div>
          <div className="h-[60px] shrink-0" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex shrink-0 flex-col items-center gap-3 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-8 pt-4">
        <p className="text-center text-sm font-semibold leading-tight text-muted-foreground">
          You can always return to say more.{' '}
        </p>
        <button
          type="button"
          onClick={onSaveAndFinish}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          <ArrowRight className="size-5" />
          Save &amp; Finish
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
