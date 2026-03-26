import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { Users } from 'lucide-react'

export function FamilyPage() {
  const { state } = useApp()
  const { creator } = state

  return (
    <PageTransition>
      <div className="flex h-full flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Family</h2>
          <p className="text-sm text-muted-foreground">
            Audience members who can interact with your legacy.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {creator.familyMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                <Users className="size-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-card-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.relationship}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
