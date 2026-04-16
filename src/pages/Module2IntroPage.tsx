import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HelpCircle, Clock, Mic } from 'lucide-react'
import { PageShell } from '@/components/shared/PageShell'
import { BackButton } from '@/components/shared/BackButton'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { StickyFooter } from '@/components/shared/StickyFooter'
import { module2IntroData } from '@/data/mock'
import { SelectionChips } from '@/components/intro/SelectionChips'
import { SelectionRadioCards } from '@/components/intro/SelectionRadioCards'
import { FamilyWebPicker } from '@/components/intro/FamilyWebPicker'

export function Module2IntroPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const data = categoryId ? module2IntroData[categoryId] : null
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const hasSelection = selectedOption !== null

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
          <BackButton onClick={() => navigate('/home', { state: { openCategory: categoryId } })} />
        </div>

        {/* Main content — centered and scrollable */}
        <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-12">
          <div className="flex w-full flex-col items-center gap-8">
            {/* Category image + label + title + description */}
            <div className="flex flex-col items-center gap-8 px-2">
              <div className="flex flex-col items-center gap-3">
                {/* Image + label */}
                <div className="flex flex-col items-center gap-3">
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
                  <p className="text-center text-xl font-semibold leading-tight text-lm-green-dark">
                    {data.categoryLabel}
                  </p>
                </div>

                {/* Title + description */}
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
                  <HelpCircle className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Reflection Question
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

            {/* Selection area */}
            <div className="w-full pb-36">
              {data.selectionType === 'web' && data.webMembers ? (
                <FamilyWebPicker
                  webMembers={data.webMembers}
                  selectedId={selectedOption}
                  onSelect={setSelectedOption}
                />
              ) : data.selectionType === 'chips' ? (
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
        <StickyFooter className="border-t-0 bg-transparent backdrop-blur-none">
          <PrimaryCTA
            disabled={!hasSelection}
            onClick={() => {
              if (!categoryId || !selectedOption) return
              if (data.selectionType === 'web' && data.webMembers) {
                const member = data.webMembers.find(m => m.id === selectedOption)
                navigate(`/reflection/${categoryId}`, {
                  state: {
                    selectedMember: member ? `${member.firstName} ${member.lastName}` : '',
                    selectedRelationship: member?.relationship ?? '',
                  },
                })
              } else {
                const option = data.options.find(o => o.id === selectedOption)
                const label = option?.label ?? ''
                const subtitle = (option as { subtitle?: string })?.subtitle
                navigate(`/reflection/${categoryId}`, {
                  state: {
                    selectedMember: label,
                    selectedSubtitle: subtitle ?? '',
                  },
                })
              }
            }}
          >
            {hasSelection ? 'Lets Begin' : data.disabledButtonText}
          </PrimaryCTA>
        </StickyFooter>
      </div>
    </PageShell>
  )
}
