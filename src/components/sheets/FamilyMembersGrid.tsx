import { Plus } from 'lucide-react'
import type { CategorySheetMember } from '@/types'

interface FamilyMembersGridProps {
  members: CategorySheetMember[]
  onAddMember?: () => void
}

export function FamilyMembersGrid({ members, onAddMember }: FamilyMembersGridProps) {
  return (
    <div className="border-y border-black/25 bg-lm-bg-card px-4 py-5">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <p className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
            Your Family
          </p>
          <button
            type="button"
            onClick={onAddMember}
            className="flex items-center gap-1 rounded-[4px] bg-[#e7ebd9] px-2.5 py-0.5"
          >
            <Plus className="size-3 text-lm-green-dark" strokeWidth={2.5} />
            <p className="text-[14px] font-semibold leading-[1.2] text-lm-green-dark">
              Add Member
            </p>
          </button>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-2">
              <div className={`flex size-10 items-center justify-center overflow-hidden rounded-full ${member.entryCount > 0 ? 'border border-lm-green bg-[#fffcf5]' : 'border border-dashed border-[var(--lm-text-secondary)] bg-[#fffcf5]'}`}>
                <p className={`font-display text-[20px] font-bold leading-none ${member.entryCount > 0 ? 'text-lm-green' : 'text-[var(--lm-text-secondary)]'}`}>
                  {member.initial}
                </p>
              </div>
              <div className="flex flex-col items-center gap-[2px]">
                <p className="text-center text-[16px] font-bold leading-none text-foreground">
                  {member.name}
                </p>
                <p className="text-center text-[14px] font-semibold leading-[1.2] tracking-[0.5px] text-[var(--lm-text-secondary)]">
                  {member.entryCount > 0 ? `${member.entryCount} entr${member.entryCount === 1 ? 'y' : 'ies'}` : 'No entries'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
          Tap a family member to view or add entries about them
        </p>
      </div>
    </div>
  )
}
