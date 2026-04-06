import { useRef, useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

const TRACK_HEIGHT = 100
const BALL_SIZE = 44
const MAX_DRAG = TRACK_HEIGHT - BALL_SIZE
const TRIGGER_THRESHOLD = 0.8

interface SlotHandleProps {
  onPull: () => void
  disabled: boolean
}

export interface SlotHandleRef {
  triggerPull: () => void
}

export const SlotHandle = forwardRef<SlotHandleRef, SlotHandleProps>(
  function SlotHandle({ onPull, disabled }, ref) {
    const [dragY, setDragY] = useState(0)
    const isDragging = useRef(false)
    const startY = useRef(0)
    const triggered = useRef(false)
    const ballRef = useRef<HTMLDivElement>(null)

    const springBack = useCallback(() => {
      setDragY(0)
    }, [])

    // Programmatic pull — snaps ball to bottom then springs back
    const triggerPull = useCallback(() => {
      if (disabled) return
      setDragY(MAX_DRAG)
      onPull()
      setTimeout(springBack, 200)
    }, [disabled, onPull, springBack])

    useImperativeHandle(ref, () => ({ triggerPull }), [triggerPull])

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return
        isDragging.current = true
        triggered.current = false
        startY.current = e.clientY
        ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      },
      [disabled],
    )

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging.current || disabled) return
        const delta = e.clientY - startY.current
        const clamped = Math.max(0, Math.min(delta, MAX_DRAG))
        setDragY(clamped)

        // Trigger spin when threshold reached
        if (clamped >= MAX_DRAG * TRIGGER_THRESHOLD && !triggered.current) {
          triggered.current = true
          isDragging.current = false
          setDragY(MAX_DRAG)
          onPull()
          setTimeout(springBack, 150)
        }
      },
      [disabled, onPull, springBack],
    )

    const onPointerUp = useCallback(() => {
      if (!isDragging.current) return
      isDragging.current = false
      if (!triggered.current) {
        springBack()
      }
    }, [springBack])

    // Idle bounce animation
    const [bounce, setBounce] = useState(0)
    useEffect(() => {
      if (disabled || isDragging.current) return
      const interval = setInterval(() => {
        setBounce((b) => b + 1)
      }, 1800)
      return () => clearInterval(interval)
    }, [disabled])

    const idleOffset = !disabled && dragY === 0 ? Math.sin(bounce * Math.PI) * 3 : 0

    return (
      <div
        className={`relative flex flex-col items-center ${disabled ? 'pointer-events-none opacity-40' : ''}`}
        style={{ width: BALL_SIZE + 16, height: TRACK_HEIGHT }}
      >
        {/* Track */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-md"
          style={{
            width: 12,
            height: TRACK_HEIGHT,
            background: 'linear-gradient(to right, #d1d5db, #f3f4f6, #d1d5db)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
          }}
        />

        {/* Handle ball */}
        <div
          ref={ballRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="absolute left-1/2 z-10 flex items-center justify-center rounded-full select-none"
          style={{
            width: BALL_SIZE,
            height: BALL_SIZE,
            transform: `translateX(-50%) translateY(${dragY + idleOffset}px)`,
            transition: isDragging.current ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: 'radial-gradient(circle at 30% 30%, #ff6b6b, #FF4B4B)',
            boxShadow:
              '0 8px 16px rgba(255, 75, 75, 0.4), inset 0 -4px 8px rgba(0,0,0,0.2), inset 0 4px 8px rgba(255,255,255,0.4)',
            cursor: isDragging.current ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
        >
          <span className="text-[16px] font-bold text-white/80 select-none">↕</span>
        </div>
      </div>
    )
  },
)
