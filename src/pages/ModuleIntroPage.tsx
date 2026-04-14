import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Compass, Clock, Mic } from 'lucide-react'
import { PageShell } from '@/components/shared/PageShell'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { StickyFooter } from '@/components/shared/StickyFooter'
import { foundationIntroData } from '@/data/mock'

export function ModuleIntroPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const data = categoryId ? foundationIntroData[categoryId] : null

  if (!data) {
    return (
      <PageShell>
        <div className="relative z-10 flex h-full items-center justify-center">
          <p className="text-base text-muted-foreground">Category not found.</p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="relative z-10 flex h-full flex-col">
        {/* Back button */}
        <div className="px-4 pt-14">
          <button type="button" onClick={() => navigate('/home', { state: { openCategory: categoryId } })} className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5" aria-label="Go back">
            <ArrowLeft className="size-6 text-white" />
          </button>
        </div>

        {/* Main content — centered and scrollable */}
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 pt-12">
          <div className="flex w-full flex-col items-center gap-8">
            {/* Category image + label */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="overflow-hidden" style={{ height: data.imageHeight, width: Math.round(data.imageHeight * (242 / 140)) }}>
                  <img
                    src={data.image}
                    alt={data.categoryLabel}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-center text-xl font-semibold leading-tight text-lm-green-dark">
                  {data.categoryLabel}
                </p>
              </div>

              {/* Module title + description */}
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="font-display text-3xl font-normal leading-tight text-foreground">
                  {data.moduleTitle}
                </p>
                <p className="text-base leading-snug text-muted-foreground">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Metadata rows */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <Compass className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Guided Conversation
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  About 5 minutes
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mic className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Voice or Type
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom pinned button */}
        <StickyFooter className="border-t-0 bg-transparent backdrop-blur-none">
          <PrimaryCTA onClick={() => navigate(categoryId === 'cat-favorites' ? '/favorites' : categoryId === 'cat-core-values' ? '/core-values' : `/conversation/${categoryId}`)}>
            Lets Begin
          </PrimaryCTA>
        </StickyFooter>
      </div>
    </PageShell>
  )
}
