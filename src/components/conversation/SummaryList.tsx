import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pencil, X, Plus, ArrowRight } from 'lucide-react'
import { EditSummaryItemModal } from './EditSummaryItemModal'
import { DeleteConfirmationModal } from './DeleteConfirmationModal'
import type { ConversationSummaryItem } from '@/types'

interface SummaryListProps {
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
  const [editingItem, setEditingItem] = useState<ConversationSummaryItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deletingItem, setDeletingItem] = useState<ConversationSummaryItem | null>(null)

  return (
    <div className="flex h-full flex-col bg-[var(--lm-bg-primary)]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[160px]">
        {/* Heading */}
        <div className="flex items-center justify-center px-4 py-[10px]">
          <p
            className="flex-1 text-center font-display text-2xl font-semibold leading-tight text-foreground"
          >
            {heading}
          </p>
        </div>

        {/* List section */}
        <div className="flex flex-col gap-4 px-4 pt-4">
          <p className="text-sm font-semibold leading-tight text-muted-foreground">
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
                className="flex items-end gap-2.5 rounded-[10px] bg-lm-bg-card/40 px-3 py-2.5 shadow-card backdrop-blur-sm"
              >
                <div className="flex flex-1 items-center gap-10">
                  <span className="shrink-0 text-lg font-medium leading-tight text-foreground">
                    {item.name}
                  </span>
                  <span className="flex-1 text-right text-sm font-medium leading-tight text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-[10px]">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="flex size-[18px] items-center justify-center"
                  >
                    <Pencil className="size-3.5 text-muted-foreground" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingItem(item)}
                    className="flex size-[18px] items-center justify-center"
                  >
                    <X className="size-3.5 text-muted-foreground" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add button */}
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-border py-2.5 px-4 text-sm font-medium text-primary transition-colors hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
            >
              <Plus className="size-4" />
              <span className="text-sm font-medium">
                {addLabel}
              </span>
            </button>
          </div>
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
        title="Edit family member"
        initialName={editingItem?.name ?? ''}
        initialRelationship={editingItem?.label ?? ''}
        onSave={(name, relationship) => {
          if (editingItem) {
            onEdit({ ...editingItem, name, label: relationship })
          }
          setEditingItem(null)
        }}
        onCancel={() => setEditingItem(null)}
      />

      {/* Add modal */}
      <EditSummaryItemModal
        isOpen={isAdding}
        title="Add a family member"
        onSave={(name, relationship) => {
          onAdd({ id: `si-new-${Date.now()}`, name, label: relationship })
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
