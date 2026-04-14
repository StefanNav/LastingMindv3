import { Mic, Keyboard } from 'lucide-react'

interface VoiceInputProps {
  onStartRecording: () => void
  onToggleInputMode: () => void
}

export function VoiceInput({ onStartRecording, onToggleInputMode }: VoiceInputProps) {
  return (
    <div className="flex flex-col items-center gap-3 border-t border-border/50 bg-[var(--lm-bg-primary)] px-4 pb-8 pt-4">
      <button
        type="button"
        onClick={onStartRecording}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
      >
        <Mic className="size-5" />
        Press to Talk
      </button>

      <button
        type="button"
        onClick={onToggleInputMode}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent p-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98]"
      >
        <Keyboard className="size-5" />
        Prefer to type? Switch to text
      </button>
    </div>
  )
}
