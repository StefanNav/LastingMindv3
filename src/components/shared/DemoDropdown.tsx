import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/app/AppProvider'
import { demoStates } from '@/data/demoStates'
import { cn } from '@/lib/utils'

export function DemoDropdown() {
  const { activeDemoId, setDemoState, demoStateOrder } = useApp()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-0.5 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold leading-none text-foreground/70 transition-colors hover:bg-foreground/15"
      >
        Demo
        <ChevronDown className={cn('size-2.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-[100] mt-1 -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          <div className="flex flex-col py-1">
            {demoStateOrder.map((id) => {
              const config = demoStates[id]
              const isActive = id === activeDemoId
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    if (id === 'onboarding') {
                      window.dispatchEvent(new CustomEvent('onboarding-reset'))
                      navigate('/onboarding')
                    }
                    setDemoState(id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    'flex items-center gap-2 whitespace-nowrap px-3 py-1.5 text-left text-[11px] leading-none transition-colors',
                    isActive
                      ? 'bg-lm-green/10 font-bold text-lm-green'
                      : 'text-foreground/70 hover:bg-foreground/5',
                  )}
                >
                  <span className="w-3 flex-shrink-0">
                    {isActive && <Check className="size-3" />}
                  </span>
                  {config.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
