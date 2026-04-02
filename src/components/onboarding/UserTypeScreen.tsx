import { motion } from 'framer-motion'

type UserType = 'builder' | 'connector'

interface UserTypeScreenProps {
  onSelect: (type: UserType) => void
}

const cards: { type: UserType; icon: string; title: string; description: string; disabled?: boolean }[] = [
  {
    type: 'builder',
    icon: '/images/onboarding/cardseed.png',
    title: "I'm building my legacy",
    description: 'Record your stories and wisdom for the people you love.',
  },
  {
    type: 'connector',
    icon: '/images/onboarding/speachbubble.png',
    title: "I'm connecting with someone",
    description: "Chat with a loved one's LastingMind and explore their stories.",
    disabled: true,
  },
]

export function UserTypeScreen({ onSelect }: UserTypeScreenProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* Background */}
      <img
        src="/images/onboarding/OnboardingBackground.png"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Content — vertically centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full text-center"
        >
          <h1 className="font-display text-[28px] font-semibold leading-[1.2] tracking-tight text-foreground">
            Welcome to LastingMind
          </h1>
          <p className="mx-auto mt-4 max-w-[370px] font-sans text-[18px] font-medium leading-[1.2] text-foreground">
            Are you here to build your legacy, or to connect with a loved one's?
          </p>
        </motion.div>

        {/* Selection cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 flex w-full flex-col gap-[30px]"
        >
          {cards.map((card) => (
            <button
              key={card.type}
              type="button"
              disabled={card.disabled}
              onClick={() => onSelect(card.type)}
              className="flex w-full items-center gap-2.5 rounded-[10px] bg-white/30 px-2.5 py-4 text-left shadow-card transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              <img
                src={card.icon}
                alt=""
                className="h-[74px] w-[79px] shrink-0 object-contain"
              />
              <div className="flex flex-col gap-2">
                <span className="font-display text-[18px] font-semibold leading-normal text-foreground">
                  {card.title}
                </span>
                <span className="font-sans text-[16px] leading-normal text-[#5d6056]">
                  {card.description}
                </span>
                {card.disabled && (
                  <span className="font-sans text-[13px] italic text-[var(--lm-text-secondary)]">
                    Coming soon
                  </span>
                )}
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
