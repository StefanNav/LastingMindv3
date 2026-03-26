import { PageTransition } from '@/animations/PageTransition'
import { Settings } from 'lucide-react'

export function SettingsPage() {
  return (
    <PageTransition>
      <div className="flex h-full flex-col gap-6 p-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Profile and app preferences.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border">
          <div className="flex flex-col items-center gap-3 text-center">
            <Settings className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Settings placeholder — profile, notifications, and preferences will appear here.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
