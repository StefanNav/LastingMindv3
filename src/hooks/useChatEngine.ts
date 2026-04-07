import { useState, useCallback, useRef } from 'react'
import { getScriptedResponse, suggestedQuestionSets } from '@/data/chatData'
import { useApp } from '@/app/AppProvider'
import type { ChatMessage } from '@/types'

interface UseChatEngineReturn {
  messages: ChatMessage[]
  suggestedQuestions: string[]
  isThinking: boolean
  sendMessage: (text: string) => void
}

let engineMsgId = 100
function nextId() {
  engineMsgId += 1
  return `chat-msg-${engineMsgId}`
}

export function useChatEngine(): UseChatEngineReturn {
  const { chatMessages, addChatMessage } = useApp()
  const [isThinking, setIsThinking] = useState(false)
  const [suggestedSetIndex, setSuggestedSetIndex] = useState(0)
  const thinkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Show suggestions when no messages or after each exchange
  const suggestedQuestions = chatMessages.length === 0 || (!isThinking && chatMessages.length > 0 && chatMessages[chatMessages.length - 1].sender === 'lastingmind')
    ? suggestedQuestionSets[suggestedSetIndex % suggestedQuestionSets.length]
    : []

  const sendMessage = useCallback((text: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      content: text,
      timestamp: Date.now(),
    }
    addChatMessage(userMsg)

    // Show thinking state
    setIsThinking(true)

    // Clear any pending timer
    if (thinkingTimer.current) {
      clearTimeout(thinkingTimer.current)
    }

    // Simulate LM response after delay
    thinkingTimer.current = setTimeout(() => {
      const response = getScriptedResponse(text)
      const lmMsg: ChatMessage = {
        id: nextId(),
        sender: 'lastingmind',
        content: response.content,
        timestamp: Date.now(),
        sourceEntry: response.sourceEntry,
      }
      addChatMessage(lmMsg)
      setIsThinking(false)

      // Rotate suggested questions
      setSuggestedSetIndex((i) => i + 1)
    }, 1500 + Math.random() * 1000)
  }, [addChatMessage])

  return {
    messages: chatMessages,
    suggestedQuestions,
    isThinking,
    sendMessage,
  }
}
