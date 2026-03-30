import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, HelpCircle, Clock, Mic } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { module2IntroData } from '@/data/mock'
import { SelectionChips } from '@/components/intro/SelectionChips'
import { SelectionRadioCards } from '@/components/intro/SelectionRadioCards'
import { cn } from '@/lib/utils'

export function Module2IntroPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const data = categoryId ? module2IntroData[categoryId] : null
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const hasSelection = selectedOption !== null

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
            <ArrowLeft className="size-6 text-white" />
            <span className="text-[14px] font-semibold leading-[1.2] text-white">
              Back
            </span>
          </button>
        </div>

        {/* Main content — centered and scrollable */}
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-[63px]">
          <div className="flex w-full flex-col items-center gap-8">
            {/* Category image + label + title + description */}
            <div className="flex flex-col items-center gap-[30px] px-[10px]">
              <div className="flex flex-col items-center gap-[10px]">
                {/* Image + label */}
                <div className="flex flex-col items-center">
                  <div
                    className="h-[140px] overflow-hidden"
                    style={{ width: data.imageWidth }}
                  >
                    <img
                      src={data.image}
                      alt={data.categoryLabel}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="text-center text-[18px] font-semibold leading-[1.2] text-lm-green-dark">
                    {data.categoryLabel}
                  </p>
                </div>

                {/* Title + description */}
                <div className="flex flex-col items-center gap-3 text-center">
                  <p className="font-display text-[32px] font-normal leading-[1.2] text-foreground">
                    {data.moduleTitle}
                  </p>
                  <p className="text-[16px] font-semibold leading-[1.2] tracking-[0.5px] text-[var(--lm-text-secondary)]">
                    {data.description}
                  </p>
                </div>
              </div>

              {/* Metadata rows */}
              <div className="flex flex-col items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <HelpCircle className="size-4 text-[var(--lm-text-secondary)]" />
                  <span className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
                    Reflection Question
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4 text-[var(--lm-text-secondary)]" />
                  <span className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
                    About 5 minutes
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mic className="size-4 text-[var(--lm-text-secondary)]" />
                  <span className="text-center text-[14px] font-semibold leading-[1.2] text-[var(--lm-text-secondary)]">
                    Voice or Type
                  </span>
                </div>
              </div>
            </div>

            {/* Selection area */}
            <div className="w-full pb-[140px]">
              {data.selectionType === 'chips' ? (
                <SelectionChips
                  options={data.options}
                  selectedId={selectedOption}
                  onSelect={setSelectedOption}
                />
              ) : (
                <SelectionRadioCards
                  options={data.options}
                  selectedId={selectedOption}
                  onSelect={setSelectedOption}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom pinned button */}
        <div className="shrink-0 border-t border-black/25 bg-background px-4 pb-[50px] pt-4">
          <button
            type="button"
            disabled={!hasSelection}
            onClick={() => {
              if (categoryId === 'cat-family' && selectedOption) {
                const selectedLabel = data.options.find(o => o.id === selectedOption)?.label ?? ''
                navigate(`/reflection/${categoryId}`, {
                  state: { selectedMember: selectedLabel },
                })
              }
            }}
            className={cn(
              'flex w-full items-center justify-center rounded-[4px] bg-lm-green px-10 py-4',
              !hasSelection && 'opacity-70',
            )}
          >
            <span className="text-[18px] font-medium leading-[1.2] text-white">
              {hasSelection ? 'Lets Begin' : data.disabledButtonText}
            </span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
