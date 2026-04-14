import { useState } from 'react'
import { Pencil, Play, ChevronDown, ChevronUp } from 'lucide-react'
import type { CategoryDetailEntry } from '@/types'

interface CategoryEntryCardProps {
  entry: CategoryDetailEntry
  isEditing: boolean
  onToggleEdit: () => void
}

export function CategoryEntryCard({ entry, isEditing, onToggleEdit }: CategoryEntryCardProps) {
  const [transcriptExpanded, setTranscriptExpanded] = useState(false)
  const hasVoice = entry.inputType === 'voice' && !!entry.transcript

  return (
    <div className="flex flex-col gap-3 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm">
      {/* Entry type label + edit button */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {entry.entryType}
        </p>
        <button
          type="button"
          onClick={onToggleEdit}
          className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        >
          {isEditing ? 'Done' : <><Pencil className="size-3" /> Edit</>}
        </button>
      </div>

      {/* Entry-specific content */}
      {entry.kind === 'person' && (
        <PersonContent entry={entry} isEditing={isEditing} />
      )}
      {entry.kind === 'career-education' && (
        <CareerEducationContent entry={entry} isEditing={isEditing} />
      )}
      {entry.kind === 'favorite' && (
        <FavoriteContent entry={entry} isEditing={isEditing} />
      )}
      {entry.kind === 'core-value' && (
        <CoreValueContent entry={entry} isEditing={isEditing} />
      )}

      {/* Voice playback mock + transcript */}
      {hasVoice && !isEditing && (
        <div className="flex flex-col gap-2 border-t border-border/50 pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Play recording"
            >
              <Play className="size-3.5" />
            </button>
            <div className="h-1.5 flex-1 rounded-full bg-border">
              <div className="h-1.5 w-1/3 rounded-full bg-muted-foreground/40" />
            </div>
            <span className="text-[10px] text-muted-foreground">0:00</span>
          </div>
          <div>
            <p className={`text-sm leading-snug text-foreground/80 ${!transcriptExpanded ? 'line-clamp-2' : ''}`}>
              {entry.transcript}
            </p>
            {entry.transcript && entry.transcript.length > 100 && (
              <button
                type="button"
                onClick={() => setTranscriptExpanded(!transcriptExpanded)}
                className="mt-1 flex items-center gap-0.5 text-xs font-medium text-primary"
              >
                {transcriptExpanded ? (
                  <>Show less <ChevronUp className="size-3" /></>
                ) : (
                  <>Show more <ChevronDown className="size-3" /></>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Voice entry edit mode */}
      {hasVoice && isEditing && (
        <div className="flex flex-col gap-2 border-t border-border/50 pt-3">
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Edit transcript
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
            >
              Re-record
            </button>
          </div>
        </div>
      )}

      {/* Save button in edit mode */}
      {isEditing && (
        <button
          type="button"
          onClick={onToggleEdit}
          className="mt-1 self-end rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.97]"
        >
          Save
        </button>
      )}
    </div>
  )
}

// ── Sub-components per entry kind ───────────────────────────────────────────

function PersonContent({ entry, isEditing }: { entry: import('@/types').PersonEntry; isEditing: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      {isEditing ? (
        <input
          type="text"
          defaultValue={entry.name}
          className="rounded-lg border border-border bg-transparent px-3 py-2 font-display text-lg font-normal leading-tight text-foreground outline-none focus:border-primary"
        />
      ) : (
        <p className="font-display text-lg font-normal leading-tight text-foreground">
          {entry.name}
        </p>
      )}
      <p className="text-[10px] font-semibold text-muted-foreground">
        {entry.relationshipLabel}
      </p>
      {entry.storyTitle && !isEditing && (
        <p className="mt-1 text-sm leading-snug text-foreground/80">
          {entry.storyTitle}
        </p>
      )}
      {entry.content && !entry.storyTitle && !isEditing && entry.content.length > 0 && (
        <p className="mt-1 text-sm leading-snug text-foreground/80">
          {entry.content}
        </p>
      )}
    </div>
  )
}

function CareerEducationContent({ entry, isEditing }: { entry: import('@/types').CareerEducationEntry; isEditing: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      {isEditing ? (
        <>
          <input
            type="text"
            defaultValue={entry.roleName}
            className="rounded-lg border border-border bg-transparent px-3 py-2 font-display text-lg font-normal leading-tight text-foreground outline-none focus:border-primary"
          />
          <input
            type="text"
            defaultValue={`${entry.organisation} · ${entry.dateRange}`}
            className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-muted-foreground outline-none focus:border-primary"
          />
        </>
      ) : (
        <>
          <p className="font-display text-lg font-normal leading-tight text-foreground">
            {entry.roleName}
          </p>
          <p className="text-sm leading-snug text-muted-foreground">
            {entry.organisation} · {entry.dateRange}
          </p>
        </>
      )}
      {entry.storyTitle && !isEditing && (
        <p className="mt-1 text-sm leading-snug text-foreground/80">
          {entry.storyTitle}
        </p>
      )}
    </div>
  )
}

function FavoriteContent({ entry, isEditing }: { entry: import('@/types').FavoriteEntry; isEditing: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-semibold text-muted-foreground">
        {entry.categoryLabel}
      </p>
      {isEditing ? (
        <input
          type="text"
          defaultValue={entry.content}
          className="rounded-lg border border-border bg-transparent px-3 py-2 font-display text-lg font-normal leading-tight text-foreground outline-none focus:border-primary"
        />
      ) : (
        <p className="font-display text-lg font-normal leading-tight text-foreground">
          {entry.content}
        </p>
      )}
    </div>
  )
}

function CoreValueContent({ entry, isEditing }: { entry: import('@/types').CoreValueEntry; isEditing: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-semibold text-muted-foreground">
        {entry.valueLabel}
      </p>
      {isEditing ? (
        <input
          type="text"
          defaultValue={entry.content}
          className="rounded-lg border border-border bg-transparent px-3 py-2 font-display text-lg font-normal leading-tight text-foreground outline-none focus:border-primary"
        />
      ) : (
        <p className="font-display text-lg font-normal leading-tight text-foreground">
          {entry.content}
        </p>
      )}
    </div>
  )
}
