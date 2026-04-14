import { useState, useCallback, useRef } from 'react'
import type { CircleCaptureConfig, CapturedPerson } from '@/types'
import { mockNamesPerGroup, NONE_GROUP_ID } from '@/data/circleCaptureData'

export type CircleCaptureScreen = 'group-select' | 'name-capture' | 'summary'
export type CaptureInputMode = 'voice' | 'text'

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

  // Screen 2 — Name Capture
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

  // Screen 3 — Summary Table
  allPeople: CapturedPerson[]
  editPerson: (personId: string, field: 'name' | 'relationship', value: string) => void
  removePerson: (personId: string) => void
  addPerson: (name: string, relationship: string) => void
  confirmationCTALabel: string

  // Exit
  hasProgress: boolean
}

let nextId = 1
function genId() {
  return `cp-${nextId++}`
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

  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      // Skip directly to summary with empty list
      setScreen('summary')
      return
    }
    setCurrentGroupIndex(0)
    setCurrentGroupNames([])
    setHasSubmittedNames(false)
    setInputMode('voice')
    setScreen('name-capture')
  }, [isNoneSelected, activeGroups.length])

  // ── Screen 2: Name Capture ─────────────────────────────────────────────────

  const startRecording = useCallback(() => {
    setIsRecording(true)
    // Auto-stop after 3 seconds and populate mock names
    recordingTimerRef.current = setTimeout(() => {
      setIsRecording(false)
      const group = activeGroups[currentGroupIndex]
      if (group) {
        const mocks = mockNamesPerGroup[group.id] ?? []
        const withIds = mocks.map((m) => ({ ...m, id: genId() }))
        setCurrentGroupNames(withIds)
        setHasSubmittedNames(true)
      }
    }, 3000)
  }, [activeGroups, currentGroupIndex])

  const stopRecording = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current)
      recordingTimerRef.current = null
    }
    setIsRecording(false)
    // Populate mock names immediately on manual stop
    const group = activeGroups[currentGroupIndex]
    if (group) {
      const mocks = mockNamesPerGroup[group.id] ?? []
      const withIds = mocks.map((m) => ({ ...m, id: genId() }))
      setCurrentGroupNames(withIds)
      setHasSubmittedNames(true)
    }
  }, [activeGroups, currentGroupIndex])

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
    setCurrentGroupNames(people)
    setHasSubmittedNames(true)
  }, [activeGroups, currentGroupIndex])

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

  const commitCurrentGroup = useCallback(() => {
    if (currentGroupNames.length > 0) {
      setCapturedPeople((prev) => [...prev, ...currentGroupNames])
    }
    setCurrentGroupNames([])
    setHasSubmittedNames(false)
    setInputMode('voice')
  }, [currentGroupNames])

  const nextGroup = useCallback(() => {
    commitCurrentGroup()
    if (isLastGroup) {
      setScreen('summary')
    } else {
      setCurrentGroupIndex((i) => i + 1)
    }
  }, [commitCurrentGroup, isLastGroup])

  const skipGroup = useCallback(() => {
    setCurrentGroupNames([])
    setHasSubmittedNames(false)
    setInputMode('voice')
    if (isLastGroup) {
      setScreen('summary')
    } else {
      setCurrentGroupIndex((i) => i + 1)
    }
  }, [isLastGroup])

  const goBackFromCapture = useCallback(() => {
    if (currentGroupIndex === 0) {
      setScreen('group-select')
      setCurrentGroupNames([])
      setHasSubmittedNames(false)
    } else {
      // Go back to previous group — discard current names, remove previous group's people from captured
      const prevGroup = activeGroups[currentGroupIndex - 1]
      setCurrentGroupNames([])
      setHasSubmittedNames(false)
      setInputMode('voice')
      if (prevGroup) {
        setCapturedPeople((prev) => prev.filter((p) => p.groupId !== prevGroup.id))
      }
      setCurrentGroupIndex((i) => i - 1)
    }
  }, [currentGroupIndex, activeGroups])

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
    allPeople,
    editPerson,
    removePerson,
    addPerson,
    confirmationCTALabel: config.confirmationCTALabel,
    hasProgress,
  }
}
