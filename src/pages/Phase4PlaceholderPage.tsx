import { useParams, useNavigate } from 'react-router-dom'
import { PageShell } from '@/components/shared/PageShell'
import { BackButton } from '@/components/shared/BackButton'
import { phase4Categories } from '@/data/phase4Data'

export function Phase4PlaceholderPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const category = phase4Categories.find((c) => c.id === categoryId)

  return (
    <PageShell>
      <div className="relative z-10 flex flex-col gap-6 p-6 pt-14">
        {/* Back button */}
        <BackButton onClick={() => navigate('/home')} />

        {/* Content */}
        <div className="flex flex-col items-center gap-4 px-4 pt-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-lm-green/10">
            <span className="text-3xl">✏️</span>
          </div>
          <h1 className="font-display text-2xl font-normal leading-tight text-foreground">
            {category?.title ?? 'Activity'}
          </h1>
          <p className="text-sm leading-snug text-muted-foreground">
            {category?.subtitle ?? 'This activity is coming soon.'}
          </p>
          <div className="mt-6 rounded-[10px] bg-lm-bg-card/40 px-6 py-4 shadow-card backdrop-blur-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-lm-gold">
              Coming Soon
            </p>
            <p className="mt-2 text-sm leading-snug text-muted-foreground">
              This activity flow is being built. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
