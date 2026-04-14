import { PageShell } from '@/components/shared/PageShell'
import { Settings } from 'lucide-react'

export function SettingsPage() {
  return (
    <PageShell>
      <div className="relative z-10 flex h-full flex-col gap-6 p-6 pt-14">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Profile and app preferences.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center rounded-[10px] bg-lm-bg-card/40 shadow-card backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            <Settings className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Settings placeholder — profile, notifications, and preferences will appear here.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
