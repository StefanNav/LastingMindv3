import { motion } from 'framer-motion'
import { RewardSecondaryCTA } from './RewardCTAs'

interface UnlockItem {
  image: string
  imageWidth: number
  imageHeight: number
  title: string
  status: string
}

const unlockItems: UnlockItem[] = [
  {
    image: '/images/onboarding/SplashPageTree.png',
    imageWidth: 32,
    imageHeight: 32,
    title: 'Chat with your LastingMind',
    status: 'Unlocked',
  },
  {
    image: '/images/Questions from Loved ones.png',
    imageWidth: 32,
    imageHeight: 32,
    title: 'Invite Audience Members',
    status: 'Unlocked',
  },
  {
    image: '/images/Life chapters 2.png',
    imageWidth: 32,
    imageHeight: 32,
    title: 'Phase 2 — Life Chapters',
    status: 'Unlocked',
  },
]

interface FoundationUnlockSummaryScreenProps {
  onStartLifeChapters: () => void
  onDone: () => void
}

export function FoundationUnlockSummaryScreen({
  onStartLifeChapters,
  onDone,
}: FoundationUnlockSummaryScreenProps) {
  return (
    <motion.div
      key="unlock-summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-full flex-col bg-[var(--lm-bg-primary)]"
      style={{
        backgroundImage: 'url(/images/bg-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Headline */}
      <div className="px-6 pt-[80px]">
        <p className="font-display text-2xl font-semibold leading-tight text-foreground text-center">
          You've unlocked new features!
        </p>
      </div>

      {/* Tree image */}
      <div className="flex items-start justify-center pt-4">
        <div className="h-[200px] w-full max-w-[402px] overflow-hidden">
          <img
            src="/images/TreeStage3_V2.png"
            alt="Your growing tree"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Unlocks card */}
      <div className="flex flex-col gap-2 px-4 pt-4">
        <div className="flex flex-col gap-4 rounded-[10px] bg-lm-bg-card/40 p-3 shadow-card backdrop-blur-sm">
          <p className="text-[13px] font-semibold leading-tight text-muted-foreground">
            New Unlocks
          </p>
          <div className="flex flex-col gap-2.5">
            {unlockItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="flex-1 text-[15px] font-semibold leading-tight text-foreground">
                  {item.title}
                </p>
                <p className="text-[13px] font-medium leading-tight text-lm-green">
                  {item.status}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested next */}
      <div className="flex flex-col gap-2 px-4 pt-4">
        <p className="text-[13px] font-semibold leading-tight text-muted-foreground">
          Suggested
        </p>
        <div className="flex flex-col gap-4 rounded-[10px] bg-lm-bg-card/40 p-3 shadow-card backdrop-blur-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="size-8 shrink-0 overflow-hidden rounded-full">
                <img
                  src="/images/Life chapters 2.png"
                  alt="Life Chapters"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="flex-1 font-display text-[15px] font-semibold leading-tight text-foreground">
                Start Your Life Chapters
              </p>
            </div>
            <p className="text-[13px] font-medium leading-snug text-muted-foreground">
              Define the chapters of your life — the moments that shaped who you are.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartLifeChapters}
            className="flex w-full items-center justify-center rounded-lg bg-lm-green px-4 py-3 transition-transform active:scale-[0.97]"
          >
            <span className="text-sm font-semibold text-white">
              Start Life Chapters
            </span>
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Done for now */}
      <div className="px-4 pb-[30px] pt-4">
        <RewardSecondaryCTA onClick={onDone} />
      </div>
    </motion.div>
  )
}
