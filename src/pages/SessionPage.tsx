import { PageShell } from '@/components/shared/PageShell'
import { Mic } from 'lucide-react'

export function SessionPage() {
  return (
    <PageShell>
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="flex size-24 items-center justify-center rounded-full bg-lm-bg-card/40 shadow-card backdrop-blur-sm">
          <Mic className="size-10 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-semibold text-foreground">Recording Session</h2>
          <p className="text-sm text-muted-foreground">
            Session interface placeholder — voice recording and AI-guided prompts will appear here.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
