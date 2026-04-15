import { useState, useCallback, useRef } from 'react'
import { getAudienceScriptedResponse, audienceSuggestedQuestionSets } from '@/data/audienceChatData'
import { useApp } from '@/app/AppProvider'
import type { ChatMessage } from '@/types'

interface UseAudienceChatEngineReturn {
  messages: ChatMessage[]
  suggestedQuestions: string[]
  isThinking: boolean
  sendMessage: (text: string) => void
}

let audienceMsgId = 5000
function nextId() {
  audienceMsgId += 1
  return `audience-chat-msg-${audienceMsgId}`
}

export function useAudienceChatEngine(): UseAudienceChatEngineReturn {
  const { audienceChatMessages, addAudienceChatMessage } = useApp()
  const [isThinking, setIsThinking] = useState(false)
  const [suggestedSetIndex, setSuggestedSetIndex] = useState(0)
  const thinkingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const suggestedQuestions =
    audienceChatMessages.length === 0 ||
    (!isThinking &&
      audienceChatMessages.length > 0 &&
      audienceChatMessages[audienceChatMessages.length - 1].sender === 'lastingmind')
      ? audienceSuggestedQuestionSets[suggestedSetIndex % audienceSuggestedQuestionSets.length]
      : []

  const sendMessage = useCallback(
    (text: string) => {
      const userMsg: ChatMessage = {
        id: nextId(),
        sender: 'user',
        content: text,
        timestamp: Date.now(),
      }
      addAudienceChatMessage(userMsg)

      setIsThinking(true)

      if (thinkingTimer.current) {
        clearTimeout(thinkingTimer.current)
      }

      thinkingTimer.current = setTimeout(() => {
        const response = getAudienceScriptedResponse(text)
        const lmMsg: ChatMessage = {
          id: nextId(),
          sender: 'lastingmind',
          content: response.content,
          timestamp: Date.now(),
          sourceEntry: response.sourceEntry,
          excerpts: response.excerpts,
        }
        addAudienceChatMessage(lmMsg)
        setIsThinking(false)

        setSuggestedSetIndex((i) => i + 1)
      }, 1500 + Math.random() * 1000)
    },
    [addAudienceChatMessage],
  )

  return {
    messages: audienceChatMessages,
    suggestedQuestions,
    isThinking,
    sendMessage,
  }
}
