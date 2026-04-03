import type { MemoryProfileUser } from '@/types'

interface IdentityBlockProps {
  user: MemoryProfileUser
}

export function IdentityBlock({ user }: IdentityBlockProps) {
  const initial = user.name.charAt(0).toUpperCase()

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Avatar */}
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="size-20 rounded-full object-cover border-2 border-lm-green/20"
        />
      ) : (
        <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 border-2 border-lm-green/20">
          <span className="text-2xl font-bold text-primary">{initial}</span>
        </div>
      )}

      {/* Name */}
      <p className="font-display text-2xl font-semibold leading-tight text-foreground">
        {user.name}
      </p>

      {/* Age */}
      <p className="text-sm font-medium text-muted-foreground">{user.age}</p>

      {/* Tagline */}
      <p className="text-center text-sm italic leading-snug text-muted-foreground">
        {user.tagline}
      </p>
    </div>
  )
}
