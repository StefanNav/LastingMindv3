import { PageTransition } from '@/animations/PageTransition'
import { PartyPopper } from 'lucide-react'

export function SuccessPage() {
  return (
    <PageTransition>
      <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
        <PartyPopper className="size-16 text-primary" />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Module Complete!</h2>
          <p className="text-sm text-muted-foreground">
            Success screen placeholder — animated artifact reveal and tree growth will appear here.
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
