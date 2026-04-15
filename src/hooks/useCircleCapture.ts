import { useState, useCallback, useRef } from 'react'
import type { CircleCaptureConfig, CapturedPerson, FollowUpPrompt } from '@/types'
import { mockNamesPerGroup, NONE_GROUP_ID } from '@/data/circleCaptureData'

export type CircleCaptureScreen = 'group-select' | 'name-capture' | 'summary'
export type CaptureInputMode = 'voice' | 'text'
export type ConversationStep = 'awaiting-names' | 'reviewing-names' | 'follow-up' | 'transitioning'

export interface ConversationMessage {
  id: string
  sender: 'lm' | 'user'
  content: string
  timestamp: number
}

interface UseCircleCaptureReturn {
  // Screen state
  screen: CircleCaptureScreen
  config: CircleCaptureConfig

  // Screen 1 — Group Selection
  selectedGroupIds: string[]
  toggleGroup: (groupId: string) => void
  isNoneSelected: boolean
  canStart: boolean
  startCapture: () => void

  // Screen 2 — Conversational Name Capture
  currentGroupIndex: number
  totalGroups: number
  currentGroupLabel: string
  currentGroupPrompt: string
  currentGroupNames: CapturedPerson[]
  hasSubmittedNames: boolean
  inputMode: CaptureInputMode
  isRecording: boolean
  setInputMode: (mode: CaptureInputMode) => void
  startRecording: () => void
  stopRecording: () => void
  submitTextNames: (text: string) => void
  editPersonName: (personId: string, newName: string) => void
  editPersonRelationship: (personId: string, newRelationship: string) => void
  removePersonFromGroup: (personId: string) => void
  addPersonToGroup: (name: string) => void
  nextGroup: () => void
  skipGroup: () => void
  goBackFromCapture: () => void
  isLastGroup: boolean

  // Conversation flow state
  conversationStep: ConversationStep
  conversationMessages: ConversationMessage[]
  currentFollowUp: FollowUpPrompt | null
  followUpIndex: number
  confirmNames: () => void
  submitFollowUpAnswer: (answer: string) => void
  reviewList: () => void
  nextGroupLabel: string

  // Screen 3 — Summary Table
  allPeople: CapturedPerson[]
  editPerson: (personId: string, field: 'name' | 'relationship', value: string) => void
  removePerson: (personId: string) => void
  addPerson: (name: string, relationship: string) => void
  confirmationCTALabel: string

  // Summary navigation
  goBackFromSummary: () => void

  // Exit
  hasProgress: boolean
}

let nextId = 1
function genId() {
  return `cp-${nextId++}`
}

let msgId = 1
function genMsgId() {
  return `cmsg-${msgId++}`
}

function createMsg(sender: 'lm' | 'user', content: string): ConversationMessage {
  return { id: genMsgId(), sender, content, timestamp: Date.now() }
}

export function useCircleCapture(config: CircleCaptureConfig): UseCircleCaptureReturn {
  const [screen, setScreen] = useState<CircleCaptureScreen>('group-select')
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([])
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [capturedPeople, setCapturedPeople] = useState<CapturedPerson[]>([])
  const [currentGroupNames, setCurrentGroupNames] = useState<CapturedPerson[]>([])
  const [hasSubmittedNames, setHasSubmittedNames] = useState(false)
  const [inputMode, setInputMode] = useState<CaptureInputMode>('voice')
  const [isRecording, setIsRecording] = useState(false)

  // Conversation flow state
  const [conversationStep, setConversationStep] = useState<ConversationStep>('awaiting-names')
  const [conversationMessages, setConversationMessages] = useState<ConversationMessage[]>([])
  const [followUpIndex, setFollowUpIndex] = useState(0)

  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Derived: active groups (excluding "none")
  const activeGroups = selectedGroupIds
    .filter((id) => id !== NONE_GROUP_ID)
    .map((id) => config.groups.find((g) => g.id === id)!)
    .filter(Boolean)

  const totalGroups = activeGroups.length
  const currentGroup = activeGroups[currentGroupIndex]
  const isNoneSelected = selectedGroupIds.includes(NONE_GROUP_ID)
  const canStart = selectedGroupIds.length > 0
  const isLastGroup = currentGroupIndex >= totalGroups - 1

  // Current follow-up prompt (if any)
  const followUpPrompts = currentGroup?.followUpPrompts ?? []
  const currentFollowUp = followUpIndex < followUpPrompts.length ? followUpPrompts[followUpIndex] : null

  // Next group label for transition message
  const nextGroupObj = !isLastGroup ? activeGroups[currentGroupIndex + 1] : null
  const nextGroupLabel = nextGroupObj?.label ?? ''

  // ── Helpers ────────────────────────────────────────────────────────────────

  const resetGroupState = useCallback(() => {
    setCurrentGroupNames([])
    setHasSubmittedNames(false)
    setInputMode('voice')
    setConversationStep('awaiting-names')
    setConversationMessages([])
    setFollowUpIndex(0)
  }, [])

  const addLmMessage = useCallback((content: string) => {
    setConversationMessages((prev) => [...prev, createMsg('lm', content)])
  }, [])

  const addUserMessage = useCallback((content: string) => {
    setConversationMessages((prev) => [...prev, createMsg('user', content)])
  }, [])

  // ── Screen 1: Group Selection ──────────────────────────────────────────────

  const toggleGroup = useCallback((groupId: string) => {
    setSelectedGroupIds((prev) => {
      if (groupId === NONE_GROUP_ID) {
        return prev.includes(NONE_GROUP_ID) ? [] : [NONE_GROUP_ID]
      }
      const without = prev.filter((id) => id !== NONE_GROUP_ID)
      if (without.includes(groupId)) {
        return without.filter((id) => id !== groupId)
      }
      return [...without, groupId]
    })
  }, [])

  const startCapture = useCallback(() => {
    if (isNoneSelected || activeGroups.length === 0) {
      setScreen('summary')
      return
    }
    setCurrentGroupIndex(0)
    resetGroupState()
    setScreen('name-capture')
  }, [isNoneSelected, activeGroups.length, resetGroupState])

  // ── Screen 2: Conversational Name Capture ──────────────────────────────────

  const populateNames = useCallback((names: CapturedPerson[]) => {
    setCurrentGroupNames(names)
    setHasSubmittedNames(true)
    setConversationStep('reviewing-names')
    // Add user message summarizing the names
    const nameList = names.map((p) => p.name).join(', ')
    addUserMessage(nameList)
  }, [addUserMessage])

  const startRecording = useCallback(() => {
    setIsRecording(true)
    // Auto-stop after 3 seconds and populate mock names
    recordingTimerRef.current = setTimeout(() => {
      setIsRecording(false)
      const group = activeGroups[currentGroupIndex]
      if (group) {
        const mocks = mockNamesPerGroup[group.id] ?? []
        const withIds = mocks.map((m) => ({ ...m, id: genId() }))
        populateNames(withIds)
      }
    }, 3000)
  }, [activeGroups, currentGroupIndex, populateNames])

  const stopRecording = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current)
      recordingTimerRef.current = null
    }
    setIsRecording(false)
    const group = activeGroups[currentGroupIndex]
    if (group) {
      const mocks = mockNamesPerGroup[group.id] ?? []
      const withIds = mocks.map((m) => ({ ...m, id: genId() }))
      populateNames(withIds)
    }
  }, [activeGroups, currentGroupIndex, populateNames])

  const submitTextNames = useCallback((text: string) => {
    const group = activeGroups[currentGroupIndex]
    if (!group) return
    const names = text
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean)
    const people: CapturedPerson[] = names.map((name) => ({
      id: genId(),
      name,
      relationship: group.defaultRelationship,
      groupId: group.id,
    }))
    populateNames(people)
  }, [activeGroups, currentGroupIndex, populateNames])

  const editPersonName = useCallback((personId: string, newName: string) => {
    setCurrentGroupNames((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, name: newName } : p)),
    )
  }, [])

  const editPersonRelationship = useCallback((personId: string, newRelationship: string) => {
    setCurrentGroupNames((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, relationship: newRelationship } : p)),
    )
  }, [])

  const removePersonFromGroup = useCallback((personId: string) => {
    setCurrentGroupNames((prev) => prev.filter((p) => p.id !== personId))
  }, [])

  const addPersonToGroup = useCallback((name: string) => {
    const group = activeGroups[currentGroupIndex]
    if (!group) return
    setCurrentGroupNames((prev) => [
      ...prev,
      { id: genId(), name, relationship: group.defaultRelationship, groupId: group.id },
    ])
  }, [activeGroups, currentGroupIndex])

  // ── Follow-up & Transition Logic ───────────────────────────────────────────

  const advanceToNextGroup = useCallback(() => {
    const names = currentGroupNames
    if (names.length > 0) {
      setCapturedPeople((prev) => [...prev, ...names])
    }
    if (isLastGroup) {
      resetGroupState()
      setScreen('summary')
    } else {
      setCurrentGroupIndex((i) => i + 1)
      resetGroupState()
    }
  }, [currentGroupNames, isLastGroup, resetGroupState])

  const triggerTransition = useCallback(() => {
    setConversationStep('transitioning')
    const msg = isLastGroup
      ? 'Got it. Let\u2019s review your list.'
      : `Got it. Let\u2019s move on to ${nextGroupLabel}.`
    addLmMessage(msg)
    if (!isLastGroup) {
      transitionTimerRef.current = setTimeout(() => {
        advanceToNextGroup()
      }, 1500)
    }
    // For the last group, don't auto-advance — the UI shows a "Review my list" CTA
  }, [isLastGroup, nextGroupLabel, addLmMessage, advanceToNextGroup])

  const confirmNames = useCallback(() => {
    const group = activeGroups[currentGroupIndex]
    if (!group) return

    // If group has follow-ups, start follow-up phase
    if (group.followUpPrompts.length > 0 && currentGroupNames.length > 0) {
      setFollowUpIndex(0)
      setConversationStep('follow-up')
      // Show the first follow-up question using the first captured name
      const firstName = currentGroupNames[0]?.name.split(' ')[0] ?? currentGroupNames[0]?.name
      const prompt = group.followUpPrompts[0]
      const questionText = prompt.template.replace('[Name]', firstName)
      addLmMessage(questionText)
    } else {
      // No follow-ups → transition directly
      triggerTransition()
    }
  }, [activeGroups, currentGroupIndex, currentGroupNames, addLmMessage, triggerTransition])

  const submitFollowUpAnswer = useCallback((answer: string) => {
    const group = activeGroups[currentGroupIndex]
    if (!group) return
    const prompts = group.followUpPrompts
    const currentPrompt = prompts[followUpIndex]
    if (!currentPrompt) return

    // Record user answer
    addUserMessage(answer)

    // Apply the answer to first person (simulate one example; mock fills all)
    const field = currentPrompt.field
    if (field === 'relationship') {
      // Use mock answer for all names
      const mockVal = currentPrompt.mockAnswer ?? answer
      setCurrentGroupNames((prev) =>
        prev.map((p) => ({ ...p, relationship: mockVal })),
      )
    } else if (field === 'side') {
      const mockVal = currentPrompt.mockAnswer ?? answer
      setCurrentGroupNames((prev) =>
        prev.map((p) => ({ ...p, side: mockVal })),
      )
    } else if (field === 'context') {
      const mockVal = currentPrompt.mockAnswer ?? answer
      setCurrentGroupNames((prev) =>
        prev.map((p) => ({ ...p, context: mockVal })),
      )
    }

    // Move to next follow-up or transition
    const nextFollowUpIdx = followUpIndex + 1
    if (nextFollowUpIdx < prompts.length && currentGroupNames.length > 0) {
      setFollowUpIndex(nextFollowUpIdx)
      const nextPrompt = prompts[nextFollowUpIdx]
      const firstName = currentGroupNames[0]?.name.split(' ')[0] ?? currentGroupNames[0]?.name
      const questionText = nextPrompt.template.replace('[Name]', firstName)
      setTimeout(() => addLmMessage(questionText), 600)
    } else {
      setTimeout(() => triggerTransition(), 600)
    }
  }, [activeGroups, currentGroupIndex, followUpIndex, currentGroupNames, addUserMessage, addLmMessage, triggerTransition])

  const commitCurrentGroup = useCallback(() => {
    if (currentGroupNames.length > 0) {
      setCapturedPeople((prev) => [...prev, ...currentGroupNames])
    }
    resetGroupState()
  }, [currentGroupNames, resetGroupState])

  const nextGroup = useCallback(() => {
    commitCurrentGroup()
    if (isLastGroup) {
      setScreen('summary')
    } else {
      setCurrentGroupIndex((i) => i + 1)
    }
  }, [commitCurrentGroup, isLastGroup])

  const skipGroup = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }
    resetGroupState()
    if (isLastGroup) {
      setScreen('summary')
    } else {
      setCurrentGroupIndex((i) => i + 1)
    }
  }, [isLastGroup, resetGroupState])

  const goBackFromCapture = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }
    if (currentGroupIndex === 0) {
      setScreen('group-select')
      resetGroupState()
    } else {
      const prevGroup = activeGroups[currentGroupIndex - 1]
      resetGroupState()
      if (prevGroup) {
        setCapturedPeople((prev) => prev.filter((p) => p.groupId !== prevGroup.id))
      }
      setCurrentGroupIndex((i) => i - 1)
    }
  }, [currentGroupIndex, activeGroups, resetGroupState])

  // ── Screen 3: Summary Table ────────────────────────────────────────────────

  const allPeople = capturedPeople

  const editPerson = useCallback((personId: string, field: 'name' | 'relationship', value: string) => {
    setCapturedPeople((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, [field]: value } : p)),
    )
  }, [])

  const removePerson = useCallback((personId: string) => {
    setCapturedPeople((prev) => prev.filter((p) => p.id !== personId))
  }, [])

  const addPerson = useCallback((name: string, relationship: string) => {
    setCapturedPeople((prev) => [
      ...prev,
      { id: genId(), name, relationship, groupId: 'manual' },
    ])
  }, [])

  const goBackFromSummary = useCallback(() => {
    if (activeGroups.length === 0) {
      setScreen('group-select')
    } else {
      const lastIdx = activeGroups.length - 1
      const lastGroup = activeGroups[lastIdx]
      const lastGroupPeople = capturedPeople.filter((p) => p.groupId === lastGroup.id)
      setCapturedPeople((prev) => prev.filter((p) => p.groupId !== lastGroup.id))
      setCurrentGroupNames(lastGroupPeople)
      setHasSubmittedNames(lastGroupPeople.length > 0)
      setConversationStep(lastGroupPeople.length > 0 ? 'reviewing-names' : 'awaiting-names')
      setConversationMessages([])
      setFollowUpIndex(0)
      setCurrentGroupIndex(lastIdx)
      setScreen('name-capture')
    }
  }, [activeGroups, capturedPeople])

  const hasProgress = capturedPeople.length > 0 || currentGroupNames.length > 0

  return {
    screen,
    config,
    selectedGroupIds,
    toggleGroup,
    isNoneSelected,
    canStart,
    startCapture,
    currentGroupIndex,
    totalGroups,
    currentGroupLabel: currentGroup?.label ?? '',
    currentGroupPrompt: currentGroup?.prompt ?? '',
    currentGroupNames,
    hasSubmittedNames,
    inputMode,
    isRecording,
    setInputMode,
    startRecording,
    stopRecording,
    submitTextNames,
    editPersonName,
    editPersonRelationship,
    removePersonFromGroup,
    addPersonToGroup,
    nextGroup,
    skipGroup,
    goBackFromCapture,
    isLastGroup,
    conversationStep,
    conversationMessages,
    currentFollowUp,
    followUpIndex,
    confirmNames,
    submitFollowUpAnswer,
    reviewList: advanceToNextGroup,
    nextGroupLabel,
    allPeople,
    editPerson,
    removePerson,
    addPerson,
    confirmationCTALabel: config.confirmationCTALabel,
    goBackFromSummary,
    hasProgress,
  }
}
