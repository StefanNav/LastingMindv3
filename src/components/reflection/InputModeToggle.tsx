import { Mic, PenLine } from 'lucide-react'
import type { OpenReflectionInputMode } from '@/types'

interface InputModeToggleProps {
  mode: OpenReflectionInputMode
  onSwitch: (mode: OpenReflectionInputMode) => void
}

export function InputModeToggle({ mode, onSwitch }: InputModeToggleProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <button
        type="button"
        onClick={() => onSwitch('voice')}
        className={`flex size-10 items-center justify-center rounded-full transition-colors ${
          mode === 'voice'
            ? 'bg-lm-green text-white'
            : 'bg-lm-green/10 text-lm-green'
        }`}
      >
        <Mic className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => onSwitch('text')}
        className={`flex size-10 items-center justify-center rounded-full transition-colors ${
          mode === 'text'
            ? 'bg-lm-green text-white'
            : 'bg-lm-green/10 text-lm-green'
        }`}
      >
        <PenLine className="size-5" />
      </button>
    </div>
  )
}
