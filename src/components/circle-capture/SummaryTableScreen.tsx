import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Plus, X } from 'lucide-react'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { StickyFooter } from '@/components/shared/StickyFooter'
import type { CapturedPerson } from '@/types'

interface SummaryTableScreenProps {
  categoryLabel: string
  people: CapturedPerson[]
  confirmationCTALabel: string
  onEditPerson: (personId: string, field: 'name' | 'relationship', value: string) => void
  onRemovePerson: (personId: string) => void
  onAddPerson: (name: string, relationship: string) => void
  onSave: () => void
}

interface EditingState {
  personId: string
  field: 'name' | 'relationship'
}

export function SummaryTableScreen({
  categoryLabel,
  people,
  confirmationCTALabel,
  onEditPerson,
  onRemovePerson,
  onAddPerson,
  onSave,
}: SummaryTableScreenProps) {
  const [editing, setEditing] = useState<EditingState | null>(null)
  const [editValue, setEditValue] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newRelationship, setNewRelationship] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)

  const title = categoryLabel === 'Family' ? 'Your Family' : 'Your Circle'

  const startEdit = (personId: string, field: 'name' | 'relationship', currentValue: string) => {
    setEditing({ personId, field })
    setEditValue(currentValue)
    setTimeout(() => editInputRef.current?.focus(), 50)
  }

  const commitEdit = () => {
    if (editing && editValue.trim()) {
      onEditPerson(editing.personId, editing.field, editValue.trim())
    }
    setEditing(null)
    setEditValue('')
  }

  const handleAddPerson = () => {
    if (newName.trim()) {
      onAddPerson(newName.trim(), newRelationship.trim())
      setNewName('')
      setNewRelationship('')
      setAddingNew(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-[var(--lm-bg-primary)]">
      {/* Header */}
      <div className="shrink-0 border-b border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-4 pt-[62px]">
        <h1 className="font-display text-[24px] font-semibold leading-tight text-foreground">
          {title}
        </h1>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-muted-foreground">
          Check the spelling of each name before saving. You can edit anything here.
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-5 pb-40 pt-4">
        {people.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-[15px] text-muted-foreground">
              No names added yet.
            </p>
            <button
              type="button"
              onClick={() => setAddingNew(true)}
              className="flex items-center gap-1.5 text-[14px] font-medium text-lm-green transition-colors hover:text-lm-green-dark"
            >
              <Plus className="size-4" />
              Add a person
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* Column headers */}
            <div className="flex items-center gap-3 px-4 pb-1">
              <span className="flex-1 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Name
              </span>
              <span className="w-[120px] text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                Relationship
              </span>
              <div className="w-[60px]" />
            </div>

            {/* Rows */}
            {people.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
              >
                {/* Name cell */}
                <div className="flex-1">
                  {editing?.personId === person.id && editing.field === 'name' ? (
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                      className="w-full bg-transparent text-[15px] font-medium text-foreground focus:outline-none"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(person.id, 'name', person.name)}
                      className="flex items-center gap-1.5 text-left"
                    >
                      <span className="text-[15px] font-medium text-foreground">
                        {person.name}
                      </span>
                      <Pencil className="size-3 text-muted-foreground/50" />
                    </button>
                  )}
                </div>

                {/* Relationship cell */}
                <div className="w-[120px]">
                  {editing?.personId === person.id && editing.field === 'relationship' ? (
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={(e) => e.key === 'Enter' && commitEdit()}
                      className="w-full bg-transparent text-[14px] text-foreground focus:outline-none"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(person.id, 'relationship', person.relationship)}
                      className="flex items-center gap-1.5 text-left"
                    >
                      <span className={`text-[14px] ${person.relationship ? 'text-muted-foreground' : 'text-lm-green italic'}`}>
                        {person.relationship || 'Add relationship'}
                      </span>
                      <Pencil className="size-3 text-muted-foreground/50" />
                    </button>
                  )}
                </div>

                {/* Delete */}
                <div className="flex w-[60px] justify-end">
                  <button
                    type="button"
                    onClick={() => onRemovePerson(person.id)}
                    className="rounded p-1.5 text-muted-foreground transition-colors hover:text-red-500"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add a person */}
            {addingNew ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-lg border border-dashed border-lm-green/50 bg-primary/5 px-4 py-3"
              >
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                  placeholder="Name"
                  autoFocus
                  className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <input
                  type="text"
                  value={newRelationship}
                  onChange={(e) => setNewRelationship(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                  placeholder="Relationship"
                  className="w-[120px] bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <div className="flex w-[60px] items-center justify-end gap-1">
                  <button
                    type="button"
                    onClick={handleAddPerson}
                    disabled={!newName.trim()}
                    className="text-[13px] font-medium text-lm-green transition-colors disabled:opacity-50"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAddingNew(false); setNewName(''); setNewRelationship('') }}
                    className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingNew(true)}
                className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3.5 text-[14px] font-medium text-muted-foreground transition-colors hover:border-lm-green hover:text-lm-green"
              >
                <Plus className="size-4" />
                Add a person
              </button>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <StickyFooter>
        <PrimaryCTA onClick={onSave}>
          {confirmationCTALabel}
        </PrimaryCTA>
      </StickyFooter>
    </div>
  )
}
