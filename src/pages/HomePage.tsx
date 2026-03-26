import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'

export function HomePage() {
  const { state } = useApp()
  const { creator, phases } = state
  const currentPhase = phases.find((p) => p.id === creator.currentPhase)

  return (
    <PageTransition>
      <div className="flex h-full flex-col gap-6 p-6">
        {/* Tree Placeholder */}
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border">
          <p className="text-sm text-muted-foreground">
            Tree animation placeholder — Level {creator.treeGrowthLevel}
          </p>
        </div>

        {/* Prompt Card Placeholder */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Next Prompt
          </p>
          <p className="mt-2 font-medium text-card-foreground">
            {currentPhase?.modules[0]?.prompts[0]?.text ?? 'No prompts available'}
          </p>
        </div>

        {/* Tap Root — Content Log */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Tap Root
          </p>
          <div className="rounded-xl border border-dashed border-border p-4">
            <p className="text-sm text-muted-foreground">
              {creator.stories.length === 0
                ? 'Your stories will appear here as you record them.'
                : `${creator.stories.length} stories recorded`}
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
