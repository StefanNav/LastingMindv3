import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Pencil, Trash2, Plus, X } from 'lucide-react'
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
  onBack: () => void
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
  onBack,
  onSave,
}: SummaryTableScreenProps) {
  const [editing, setEditing] = useState<EditingState | null>(null)
  const [editValue, setEditValue] = useState('')
  const [addingNew, setAddingNew] = useState(false)
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newRelationship, setNewRelationship] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)

  const isFirstNameOnly = (name: string) => name.trim().split(/\s+/).length === 1

  const isFamily = categoryLabel === 'Family'
  const title = isFamily ? 'Your Family' : 'Your Circle'
  const subtitle = people.length === 0
    ? isFamily
      ? 'Add your family members below — first name, last name, and how they\'re related to you.'
      : 'Add your friends below — first name, last name, and how you know them.'
    : 'Check the spelling of each name before saving. You can edit anything here.'

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

  const resetAddForm = () => {
    setNewFirstName('')
    setNewLastName('')
    setNewRelationship('')
  }

  const handleAddPerson = () => {
    if (newFirstName.trim()) {
      const fullName = [newFirstName.trim(), newLastName.trim()].filter(Boolean).join(' ')
      onAddPerson(fullName, newRelationship.trim())
      resetAddForm()
      if (people.length > 0) {
        setAddingNew(false)
      } else {
        setTimeout(() => firstNameRef.current?.focus(), 50)
      }
    }
  }

  return (
    <div className="flex h-full flex-col bg-[var(--lm-bg-primary)]">
      {/* Header */}
      <div className="shrink-0 border-b border-border/50 bg-[var(--lm-bg-primary)] px-5 pb-4 pt-[62px]">
        <button
          type="button"
          onClick={onBack}
          className="mb-3 flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
        >
          <ArrowLeft className="size-5 text-white" />
        </button>
        <h1 className="font-display text-[24px] font-semibold leading-tight text-foreground">
          {title}
        </h1>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-5 pb-40 pt-4">
        {people.length === 0 ? (
          <div className="flex flex-col gap-4">
            {/* Inline add form — always visible when empty */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3 rounded-xl border border-dashed border-lm-green/40 bg-primary/5 px-4 py-4"
            >
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    First name
                  </label>
                  <input
                    ref={firstNameRef}
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                    placeholder="e.g. Sarah"
                    autoFocus
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-lm-green focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                    placeholder="e.g. Johnson"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-lm-green focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Relationship
                </label>
                <input
                  type="text"
                  value={newRelationship}
                  onChange={(e) => setNewRelationship(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                  placeholder={isFamily ? 'e.g. Daughter, Brother, Aunt' : 'e.g. Childhood friend, Colleague'}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-lm-green focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddPerson}
                disabled={!newFirstName.trim()}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-lm-green px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-lm-green-dark disabled:opacity-40"
              >
                <Plus className="size-4" />
                Add person
              </button>
            </motion.div>
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
                      placeholder={isFirstNameOnly(person.name) ? `${person.name} Last name` : ''}
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
                      {isFirstNameOnly(person.name) && (
                        <span className="text-[13px] italic text-lm-green/60">
                          + last name
                        </span>
                      )}
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
                className="flex flex-col gap-3 rounded-xl border border-dashed border-lm-green/40 bg-primary/5 px-4 py-4"
              >
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      First name
                    </label>
                    <input
                      type="text"
                      value={newFirstName}
                      onChange={(e) => setNewFirstName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                      placeholder="e.g. Sarah"
                      autoFocus
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-lm-green focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={newLastName}
                      onChange={(e) => setNewLastName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                      placeholder="e.g. Johnson"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-lm-green focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Relationship
                  </label>
                  <input
                    type="text"
                    value={newRelationship}
                    onChange={(e) => setNewRelationship(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPerson()}
                    placeholder={isFamily ? 'e.g. Daughter, Brother, Aunt' : 'e.g. Childhood friend, Colleague'}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-lm-green focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddPerson}
                    disabled={!newFirstName.trim()}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-lm-green px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-lm-green-dark disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                    Add person
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAddingNew(false); resetAddForm() }}
                    className="rounded-lg border border-border px-3 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-4" />
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
        <PrimaryCTA onClick={onSave} disabled={people.length === 0}>
          {confirmationCTALabel}
        </PrimaryCTA>
      </StickyFooter>
    </div>
  )
}
