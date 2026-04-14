import type { ReactNode } from 'react'
import { PageTransition } from '@/animations/PageTransition'

interface PageShellProps {
  children: ReactNode
  showBackground?: boolean
}

export function PageShell({ children, showBackground = true }: PageShellProps) {
  return (
    <PageTransition>
      {showBackground && (
        <div className="pointer-events-none sticky top-0 z-0 h-0">
          <img
            src="/images/onboarding/OnboardingBackground.png"
            alt=""
            className="h-[100vh] w-full object-cover"
          />
        </div>
      )}
      {children}
    </PageTransition>
  )
}
