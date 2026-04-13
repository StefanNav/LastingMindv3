import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Compass, Clock, Mic } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { foundationIntroData } from '@/data/mock'

export function ModuleIntroPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const data = categoryId ? foundationIntroData[categoryId] : null

  if (!data) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-[16px] text-[var(--lm-text-secondary)]">Category not found.</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="relative flex h-full flex-col bg-background">
        {/* Back button */}
        <div className="px-4 pt-[62px]">
          <button
            type="button"
            onClick={() => navigate('/home', { state: { openCategory: categoryId } })}
            className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
          >
            <ArrowLeft className="size-5 text-white" />
          </button>
        </div>

        {/* Main content — centered and scrollable */}
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-[26px] pt-[63px]">
          <div className="flex w-full flex-col items-center gap-[30px]">
            {/* Category image + label */}
            <div className="flex flex-col items-center gap-[26px]">
              <div className="flex flex-col items-center gap-3">
                <div className="overflow-hidden" style={{ height: data.imageHeight, width: Math.round(data.imageHeight * (242 / 140)) }}>
                  <img
                    src={data.image}
                    alt={data.categoryLabel}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-center text-[22px] font-semibold leading-[1.2] text-lm-green-dark">
                  {data.categoryLabel}
                </p>
              </div>

              {/* Module title + description */}
              <div className="flex flex-col items-center gap-3 text-center">
                <p className="font-display text-[32px] font-normal leading-[1.2] text-foreground">
                  {data.moduleTitle}
                </p>
                <p className="text-[16px] font-normal leading-[1.2] tracking-[0.5px] text-[var(--lm-text-secondary)]">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Metadata rows */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <Compass className="size-4 text-[var(--lm-text-secondary)]" />
                <span className="text-center text-[14px] font-medium leading-[1.2] text-[var(--lm-text-secondary)]">
                  Guided Conversation
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4 text-[var(--lm-text-secondary)]" />
                <span className="text-center text-[14px] font-medium leading-[1.2] text-[var(--lm-text-secondary)]">
                  About 5 minutes
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mic className="size-4 text-[var(--lm-text-secondary)]" />
                <span className="text-center text-[14px] font-medium leading-[1.2] text-[var(--lm-text-secondary)]">
                  Voice or Type
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom pinned button */}
        <div className="shrink-0 px-4 pb-[50px] pt-4">
          <button
            type="button"
            onClick={() => navigate(categoryId === 'cat-favorites' ? '/favorites' : categoryId === 'cat-core-values' ? '/core-values' : `/conversation/${categoryId}`)}
            className="flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-4"
          >
            <span className="text-[16px] font-medium leading-[1.2] text-white">
              Lets Begin
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
