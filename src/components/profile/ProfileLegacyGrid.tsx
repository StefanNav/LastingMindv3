import { cn } from '@/lib/utils'
import type { ProfileLegacyModule } from '@/types'


interface ProfileLegacyGridProps {
  modules: ProfileLegacyModule[]
  phase1Complete: boolean
  onModuleTap?: (moduleId: string) => void
}

export function ProfileLegacyGrid({ modules, phase1Complete, onModuleTap }: ProfileLegacyGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', !phase1Complete && 'opacity-50 pointer-events-none')}>
      {modules.map((mod) => (
        <button
          key={mod.moduleId}
          type="button"
          onClick={() => onModuleTap?.(mod.moduleId)}
          className={cn(
            'flex flex-col items-center gap-1.5 rounded-[10px] bg-lm-bg-card/40 px-3 py-3 shadow-card backdrop-blur-sm',
            'transition-transform active:scale-[0.97]',
          )}
        >
          {/* Module image */}
          <div className="flex h-[60px] w-full items-center justify-center overflow-hidden">
            <img
              src={mod.imageAsset}
              alt={mod.name}
              className="max-h-[60px] w-auto object-contain"
            />
          </div>

          {/* Name */}
          <p className="text-[13px] font-bold leading-tight text-lm-green-dark text-center">
            {mod.name}
          </p>
        </button>
      ))}
    </div>
  )
}
