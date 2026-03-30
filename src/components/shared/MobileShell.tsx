import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Mic, Users, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DemoDropdown } from './DemoDropdown'

interface MobileShellProps {
  children: ReactNode
}

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Mic, label: 'Session', path: '/session' },
  { icon: Users, label: 'Family', path: '/family' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export function MobileShell({ children }: MobileShellProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const hideNav = location.pathname === '/onboarding' || location.pathname.startsWith('/intro') || location.pathname.startsWith('/conversation') || location.pathname.startsWith('/reflection') || location.pathname.startsWith('/reflect')

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="relative flex h-[932px] w-[430px] flex-col overflow-hidden bg-background shadow-2xl" style={{ transform: 'translateZ(0)' }}>
        {/* Status Bar — overlays content */}
        <div className="absolute top-0 left-0 right-0 z-50 flex h-11 items-center justify-between bg-background/60 px-6 text-xs font-medium">
          <span>9:41</span>
          <DemoDropdown />
          <div className="flex items-center gap-1">
            <div className="h-2.5 w-4 rounded-sm border border-foreground/50">
              <div className="m-0.5 h-1.5 w-2.5 rounded-xs bg-foreground/50" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Bottom Navigation — hidden during onboarding */}
        {!hideNav && (
          <nav className="flex h-20 items-center justify-around border-t border-border bg-background pb-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'flex flex-col items-center gap-1 text-xs transition-colors',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <item.icon className="size-5" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        )}
      </div>
    </div>
  )
}
