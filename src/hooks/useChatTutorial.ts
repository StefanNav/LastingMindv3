import { useState, useCallback, useRef, useEffect } from 'react'
import { tutorialMessages } from '@/data/chatData'
import { useApp } from '@/app/AppProvider'
import type { ChatMessage } from '@/types'

type TutorialPhase =
  | 'exchange1_lm_question'
  | 'exchange1_waiting_chip'
  | 'exchange1_lm_responding'
  | 'exchange1_lm_done'
  | 'exchange2_lm_followup'
  | 'exchange2_done'
  | 'free_form'

interface UseChatTutorialReturn {
  messages: ChatMessage[]
  phase: TutorialPhase
  suggestionChip: string | null
  inputPlaceholder: string
  isThinking: boolean
  handleChipTap: () => void
  handleFreeFormMessage: (text: string) => void
}

let msgIdCounter = 0
function nextId() {
  msgIdCounter += 1
  return `tutorial-msg-${msgIdCounter}`
}

export function useChatTutorial(): UseChatTutorialReturn {
  const addChatMessageRef = useRef(useApp().addChatMessage)
  addChatMessageRef.current = useApp().addChatMessage
  const { setChatFirstTimeComplete } = useApp()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [phase, setPhase] = useState<TutorialPhase>('exchange1_lm_question')
  const [isThinking, setIsThinking] = useState(true)

  // Exchange 1: auto-send LM question on mount (StrictMode-safe)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThinking(false)
      const msg: ChatMessage = {
        id: nextId(),
        sender: 'lastingmind',
        content: tutorialMessages.exchange1.lmQuestion,
        timestamp: Date.now(),
      }
      setMessages([msg])
      addChatMessageRef.current(msg)
      setPhase('exchange1_waiting_chip')
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Handle suggestion chip tap (Exchange 1)
  const handleChipTap = useCallback(() => {
    if (phase !== 'exchange1_waiting_chip') return

    // Send user's chip message
    const userMsg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      content: tutorialMessages.exchange1.suggestionChip,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    addChatMessageRef.current(userMsg)
    setPhase('exchange1_lm_responding')
    setIsThinking(true)

    // LM responds after delay
    setTimeout(() => {
      setIsThinking(false)
      const lmMsg: ChatMessage = {
        id: nextId(),
        sender: 'lastingmind',
        content: tutorialMessages.exchange1.lmResponse,
        timestamp: Date.now(),
        sourceEntry: 'From your Family stories',
        annotation: tutorialMessages.exchange1.lmAnnotation,
      }
      setMessages((prev) => [...prev, lmMsg])
      addChatMessageRef.current(lmMsg)
      setPhase('exchange1_lm_done')

      // Exchange 2: LM follow-up after a pause
      setTimeout(() => {
        setIsThinking(true)
        setTimeout(() => {
          setIsThinking(false)
          const followUp: ChatMessage = {
            id: nextId(),
            sender: 'lastingmind',
            content: tutorialMessages.exchange2.lmFollowUp,
            timestamp: Date.now(),
            annotation: tutorialMessages.exchange2.lmAnnotation,
          }
          setMessages((prev) => [...prev, followUp])
          addChatMessageRef.current(followUp)
          setPhase('exchange2_done')
        }, 1500)
      }, 1200)
    }, 2000)
  }, [phase])

  // Handle first free-form message (Exchange 3)
  const handleFreeFormMessage = useCallback((text: string) => {
    const userMsg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      content: text,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    addChatMessageRef.current(userMsg)
    setChatFirstTimeComplete()
    setPhase('free_form')
  }, [setChatFirstTimeComplete])

  // Determine current suggestion chip
  const suggestionChip = phase === 'exchange1_waiting_chip'
    ? tutorialMessages.exchange1.suggestionChip
    : null

  // Determine input placeholder
  const inputPlaceholder = phase === 'exchange2_done'
    ? tutorialMessages.freeFormPlaceholder
    : 'Ask your LastingMind anything…'

  return {
    messages,
    phase,
    suggestionChip,
    inputPlaceholder,
    isThinking,
    handleChipTap,
    handleFreeFormMessage,
  }
}
