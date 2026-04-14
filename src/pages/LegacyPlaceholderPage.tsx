import { useParams, useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/shared/PageShell'
import { BackButton } from '@/components/shared/BackButton'
import { availableLegacyItems } from '@/data/phase4Data'

export function LegacyPlaceholderPage() {
  const { itemId } = useParams<{ itemId: string }>()
  const navigate = useNavigate()
  const item = availableLegacyItems.find((li) => li.id === itemId)

  return (
    <PageShell>
      <div className="relative z-10 flex flex-col gap-6 p-6 pt-14">
        {/* Back button */}
        <BackButton onClick={() => navigate('/home')} />

        {/* Content */}
        <div className="flex flex-col items-center gap-4 px-4 pt-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-lm-green/10">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="font-display text-2xl font-normal leading-tight text-foreground">
            {item?.name ?? 'Legacy Item'}
          </h1>
          <p className="text-sm leading-snug text-muted-foreground">
            {item?.description ?? 'This legacy item is coming soon.'}
          </p>
          <div className="mt-6 rounded-[10px] bg-lm-bg-card/40 px-6 py-4 shadow-card backdrop-blur-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-lm-gold">
              Coming Soon
            </p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              This creation flow is being built. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
