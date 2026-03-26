import { PageTransition } from '@/animations/PageTransition'
import { Mic } from 'lucide-react'

export function SessionPage() {
  return (
    <PageTransition>
      <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="flex size-24 items-center justify-center rounded-full border-2 border-dashed border-border">
          <Mic className="size-10 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Recording Session</h2>
          <p className="text-sm text-muted-foreground">
            Session interface placeholder — voice recording and AI-guided prompts will appear here.
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
