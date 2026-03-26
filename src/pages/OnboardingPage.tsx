import { useNavigate } from 'react-router-dom'
import { PageTransition } from '@/animations/PageTransition'
import { Button } from '@/components/ui/button'
import { TreesIcon } from 'lucide-react'

export function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="flex h-full flex-col items-center justify-center gap-8 px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <TreesIcon className="size-16 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">LastingMind</h1>
          <p className="text-muted-foreground">
            Your stories deserve to live forever. Build your legacy — one memory at a time.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate('/home')}
          >
            Get Started
          </Button>
          <Button
            className="w-full"
            variant="outline"
            size="lg"
            onClick={() => navigate('/home')}
          >
            I already have an account
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
