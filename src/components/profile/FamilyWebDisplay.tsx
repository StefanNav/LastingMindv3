import { useMemo, useRef, useCallback } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import type { PersonEntry } from '@/types'

interface FamilyWebDisplayProps {
  members: PersonEntry[]
  creatorFirstName: string
  onMemberTap: (entry: PersonEntry) => void
}

const NODE_SIZE = 76
const CENTER_SIZE = 92
const INNER_RADIUS = 120
const OUTER_RADIUS = 210
const MAX_INNER_RING = 7
const VIEWPORT_HEIGHT = 380
const TAP_THRESHOLD = 6

export function FamilyWebDisplay({ members, creatorFirstName, onMemberTap }: FamilyWebDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Split members into inner ring (up to MAX_INNER_RING) and outer ring (rest)
  const { innerMembers, outerMembers } = useMemo(() => {
    const inner = members.slice(0, MAX_INNER_RING)
    const outer = members.slice(MAX_INNER_RING)
    return { innerMembers: inner, outerMembers: outer }
  }, [members])

  const hasOuter = outerMembers.length > 0
  const maxRadius = hasOuter ? OUTER_RADIUS : INNER_RADIUS
  const canvasSize = (maxRadius + NODE_SIZE / 2) * 2 + 40
  const center = canvasSize / 2

  // Drag constraints: how far the canvas can move inside the viewport
  const dragConstraints = useMemo(() => {
    const el = containerRef.current
    const vw = el?.clientWidth ?? 360
    const vh = VIEWPORT_HEIGHT
    const overflowX = Math.max(0, canvasSize - vw)
    const overflowY = Math.max(0, canvasSize - vh)
    return {
      left: -overflowX / 2 - 20,
      right: overflowX / 2 + 20,
      top: -overflowY / 2 - 20,
      bottom: overflowY / 2 + 20,
    }
  }, [canvasSize])

  // Build positioned nodes
  const positionedNodes = useMemo(() => {
    const nodes: { member: PersonEntry; x: number; y: number; ring: 'inner' | 'outer' }[] = []
    innerMembers.forEach((member, i) => {
      const angle = (2 * Math.PI * i) / innerMembers.length - Math.PI / 2
      nodes.push({
        member,
        x: center + INNER_RADIUS * Math.cos(angle),
        y: center + INNER_RADIUS * Math.sin(angle),
        ring: 'inner',
      })
    })
    outerMembers.forEach((member, i) => {
      const angle = (2 * Math.PI * i) / outerMembers.length - Math.PI / 2
      nodes.push({
        member,
        x: center + OUTER_RADIUS * Math.cos(angle),
        y: center + OUTER_RADIUS * Math.sin(angle),
        ring: 'outer',
      })
    })
    return nodes
  }, [innerMembers, outerMembers, center])

  // Track pointer-down position to distinguish taps from drags
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleNodeTap = useCallback((entry: PersonEntry, e: React.PointerEvent) => {
    if (!dragStartRef.current) return
    const dx = Math.abs(e.clientX - dragStartRef.current.x)
    const dy = Math.abs(e.clientY - dragStartRef.current.y)
    if (dx < TAP_THRESHOLD && dy < TAP_THRESHOLD) {
      onMemberTap(entry)
    }
    dragStartRef.current = null
  }, [onMemberTap])

  if (members.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="-mx-6 overflow-hidden touch-none"
      style={{ height: VIEWPORT_HEIGHT }}
    >
      <motion.div
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          width: canvasSize,
          height: canvasSize,
          x,
          y,
          marginLeft: `calc(50% - ${canvasSize / 2}px)`,
          marginTop: (VIEWPORT_HEIGHT - canvasSize) / 2,
        }}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        dragMomentum
      >
        {/* Connector lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={canvasSize}
          height={canvasSize}
        >
          {positionedNodes.map((node) => (
            <line
              key={node.member.entryId}
              x1={center}
              y1={center}
              x2={node.x}
              y2={node.y}
              stroke="var(--lm-green-dark)"
              strokeWidth={1.5}
              strokeDasharray="6 4"
              opacity={0.4}
            />
          ))}
        </svg>

        {/* Center node — "You" */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-full border-2 border-lm-green bg-lm-bg-card shadow-[0_0_20px_rgba(50,117,30,0.2)]"
          style={{
            width: CENTER_SIZE,
            height: CENTER_SIZE,
            left: center - CENTER_SIZE / 2,
            top: center - CENTER_SIZE / 2,
          }}
        >
          <p className="font-display text-[15px] font-semibold leading-tight text-foreground">
            {creatorFirstName}
          </p>
          <p className="text-[11px] font-medium text-muted-foreground">You</p>
        </div>

        {/* Member nodes */}
        {positionedNodes.map((node, i) => (
          <motion.div
            key={node.member.entryId}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.04 * i, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute flex flex-col items-center justify-center rounded-full border border-lm-border bg-lm-bg-card shadow-card active:scale-95 active:border-lm-green"
            style={{
              width: NODE_SIZE,
              height: NODE_SIZE,
              left: node.x - NODE_SIZE / 2,
              top: node.y - NODE_SIZE / 2,
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={(e) => handleNodeTap(node.member, e)}
          >
            <span className="font-display text-[13px] font-semibold leading-tight text-foreground">
              {node.member.name}
            </span>
            <span className="text-[9px] font-medium text-muted-foreground leading-tight mt-0.5">
              {node.member.relationshipLabel}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
