import { Mic, Keyboard } from 'lucide-react'

interface VoiceInputProps {
  onStartRecording: () => void
  onToggleInputMode: () => void
}

export function VoiceInput({ onStartRecording, onToggleInputMode }: VoiceInputProps) {
  return (
    <div className="flex flex-col items-center gap-[13px] border-t border-black/25 bg-[var(--lm-bg-primary)] px-4 pb-[50px] pt-4">
      <button
        type="button"
        onClick={onStartRecording}
        className="flex w-full flex-col items-center justify-center gap-[10px] rounded-[10px] bg-lm-green px-10 py-4"
      >
        <Mic className="size-6 text-white" />
        <span className="text-[16px] font-medium leading-[1.2] text-white">
          Press to Talk{' '}
        </span>
      </button>

      <button
        type="button"
        onClick={onToggleInputMode}
        className="flex w-full items-center justify-center gap-[10px] rounded-[10px] bg-[#e7ebd9] p-[10px]"
      >
        <Keyboard className="size-6 text-[#283227]" />
        <span className="text-center text-[16px] font-medium leading-[1.2] text-[#283227]">
          Prefer to type? Switch to text
        </span>
      </button>
    </div>
  )
}
