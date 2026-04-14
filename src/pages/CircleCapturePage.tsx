import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/animations/PageTransition'
import { useCircleCapture } from '@/hooks/useCircleCapture'
import { GroupSelectionScreen } from '@/components/circle-capture/GroupSelectionScreen'
import { NameCaptureScreen } from '@/components/circle-capture/NameCaptureScreen'
import { SummaryTableScreen } from '@/components/circle-capture/SummaryTableScreen'
import { CircleCaptureExitSheet } from '@/components/circle-capture/CircleCaptureExitSheet'
import type { CircleCaptureConfig } from '@/types'

interface CircleCapturePageProps {
  config: CircleCaptureConfig
  onComplete: () => void
  onBack: () => void
  onExit: () => void
}

export function CircleCapturePage({ config, onComplete, onBack, onExit }: CircleCapturePageProps) {
  const flow = useCircleCapture(config)
  const [showExitSheet, setShowExitSheet] = useState(false)

  const handleBackFromCapture = useCallback(() => {
    if (flow.hasProgress && flow.currentGroupIndex === 0) {
      setShowExitSheet(true)
    } else {
      flow.goBackFromCapture()
    }
  }, [flow])

  const handleLeave = useCallback(() => {
    setShowExitSheet(false)
    onExit()
  }, [onExit])

  const handleKeepGoing = useCallback(() => {
    setShowExitSheet(false)
  }, [])

  return (
    <PageTransition>
      <div className="flex h-full flex-col overflow-hidden bg-[var(--lm-bg-primary)]">
        {/* Background image */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <AnimatePresence mode="wait">
            {flow.screen === 'group-select' && (
              <GroupSelectionScreen
                key="group-select"
                categoryLabel={config.categoryLabel}
                promptText={config.groupSelectionPrompt}
                groups={config.groups}
                selectedGroupIds={flow.selectedGroupIds}
                isNoneSelected={flow.isNoneSelected}
                canStart={flow.canStart}
                onToggleGroup={flow.toggleGroup}
                onStart={flow.startCapture}
                onBack={onBack}
              />
            )}

            {flow.screen === 'name-capture' && (
              <NameCaptureScreen
                key={`name-capture-${flow.currentGroupIndex}`}
                groupLabel={flow.currentGroupLabel}
                groupPrompt={flow.currentGroupPrompt}
                currentGroupIndex={flow.currentGroupIndex}
                totalGroups={flow.totalGroups}
                currentGroupNames={flow.currentGroupNames}
                hasSubmittedNames={flow.hasSubmittedNames}
                inputMode={flow.inputMode}
                isRecording={flow.isRecording}
                isLastGroup={flow.isLastGroup}
                onSetInputMode={flow.setInputMode}
                onStartRecording={flow.startRecording}
                onStopRecording={flow.stopRecording}
                onSubmitTextNames={flow.submitTextNames}
                onEditPersonName={flow.editPersonName}
                onRemovePersonFromGroup={flow.removePersonFromGroup}
                onAddPersonToGroup={flow.addPersonToGroup}
                onNext={flow.nextGroup}
                onSkip={flow.skipGroup}
                onBack={handleBackFromCapture}
              />
            )}

            {flow.screen === 'summary' && (
              <SummaryTableScreen
                key="summary"
                categoryLabel={config.categoryLabel}
                people={flow.allPeople}
                confirmationCTALabel={flow.confirmationCTALabel}
                onEditPerson={flow.editPerson}
                onRemovePerson={flow.removePerson}
                onAddPerson={flow.addPerson}
                onSave={onComplete}
              />
            )}
          </AnimatePresence>
        </div>

        <CircleCaptureExitSheet
          isOpen={showExitSheet}
          onLeave={handleLeave}
          onKeepGoing={handleKeepGoing}
        />
      </div>
    </PageTransition>
  )
}
