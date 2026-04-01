import { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NarrativeSlide } from '@/components/onboarding/NarrativeSlide'
import { NameInputSlide } from '@/components/onboarding/NameInputSlide'
import { GreetingSlide } from '@/components/onboarding/GreetingSlide'
import { BirthdayPickerSlide } from '@/components/onboarding/BirthdayPickerSlide'
import { LoadingSlide } from '@/components/onboarding/LoadingSlide'
import { WelcomeSlide } from '@/components/onboarding/WelcomeSlide'
import { FeatureTourSlide } from '@/components/onboarding/FeatureTourSlide'
import { CategoryGridSlide } from '@/components/onboarding/CategoryGridSlide'
import { FamilyDetailSlide } from '@/components/onboarding/FamilyDetailSlide'
import { ChatPreviewSlide } from '@/components/onboarding/ChatPreviewSlide'
import { PreparingSlide } from '@/components/onboarding/PreparingSlide'

type Direction = 1 | -1

const slideVariants = {
  enter: (dir: Direction) => ({
    x: dir > 0 ? '80%' : '-80%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: Direction) => ({
    x: dir > 0 ? '-80%' : '80%',
    opacity: 0,
  }),
}

const slideTransition = {
  x: { type: 'spring' as const, stiffness: 300, damping: 30 },
  opacity: { duration: 0.25 },
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<Direction>(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const next = useCallback(() => {
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  const back = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(0, s - 1))
  }, [])

  const goHome = useCallback(() => {
    navigate('/home')
  }, [navigate])

  const handleNameSubmit = useCallback((first: string, last: string) => {
    setFirstName(first)
    setLastName(last)
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  const handleBirthdaySubmit = useCallback((_month: number, _day: number, _year: number) => {
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  // Listen for back button in status bar (testing utility)
  useEffect(() => {
    const handler = () => back()
    window.addEventListener('onboarding-back', handler)
    return () => window.removeEventListener('onboarding-back', handler)
  }, [back])

  const displayName = firstName || 'Alex'

  const steps = useMemo(() => [
    // Phase 1: Narrative Intro (0-3)
    {
      id: 'narrative-1',
      render: () => (
        <NarrativeSlide
          heading="Every legacy starts as a seed"
          subtitle="Lasting Mind helps you build something your loved ones can return to for years to come."
          imageSrc="/images/onboarding/seed-1.png"
          buttonLabel="Let's Begin"
          onNext={next}
        />
      ),
    },
    {
      id: 'narrative-2',
      render: () => (
        <NarrativeSlide
          heading="The people you love want to know you"
          subtitle="Not just who you are today, but who you've been and what shaped you."
          imageSrc="/images/onboarding/seed-2.png"
          buttonLabel="Continue"
          onNext={next}
        />
      ),
    },
    {
      id: 'narrative-3',
      render: () => (
        <NarrativeSlide
          heading="We help bring your story to life"
          subtitle="Through guided reflections we capture your life chapters for your loved ones."
          imageSrc="/images/onboarding/seed-3.png"
          buttonLabel="Continue"
          onNext={next}
        />
      ),
    },
    {
      id: 'narrative-4',
      render: () => (
        <NarrativeSlide
          heading="What you build here will grow"
          subtitle="Over time, your stories become something your loved ones can return to."
          imageSrc="/images/onboarding/sprout-1.png"
          buttonLabel="Continue"
          onNext={next}
        />
      ),
    },
    // Phase 2: User Info (4-6)
    {
      id: 'name-input',
      render: () => (
        <NameInputSlide
          heading="Your story is ready to take root"
          subtitle="This is the first step in shaping something that reflects you."
          onNext={handleNameSubmit}
          initialFirstName={firstName}
          initialLastName={lastName}
        />
      ),
    },
    {
      id: 'loading-name',
      render: () => <LoadingSlide onComplete={next} delay={2000} />,
    },
    {
      id: 'greeting',
      render: () => (
        <GreetingSlide firstName={displayName} onComplete={next} delay={2500} />
      ),
    },
    // Phase 3: Birthday (8-9)
    {
      id: 'birthday',
      render: () => (
        <BirthdayPickerSlide
          firstName={displayName}
          onNext={handleBirthdaySubmit}
        />
      ),
    },
    {
      id: 'loading-birthday',
      render: () => <LoadingSlide onComplete={next} delay={2000} />,
    },
    // Phase 4: Welcome + Feature Tour (10-15)
    {
      id: 'welcome',
      render: () => (
        <WelcomeSlide firstName={displayName} onComplete={next} delay={3000} />
      ),
    },
    {
      id: 'tour-tree',
      render: () => (
        <FeatureTourSlide
          heading="This tree reflects what you build here"
          progressStep={0}
          totalProgressSteps={5}
          onNext={next}
          showBack={false}
        >
          <div className="flex h-[280px] w-full items-end justify-center">
            <img
              src="/images/Tree 1.png"
              alt=""
              className="max-h-full object-contain"
            />
          </div>
        </FeatureTourSlide>
      ),
    },
    {
      id: 'tour-categories',
      render: () => (
        <FeatureTourSlide
          heading="It grows as you share the details of your life"
          progressStep={1}
          totalProgressSteps={5}
          onBack={back}
          onNext={next}
        >
          <CategoryGridSlide />
        </FeatureTourSlide>
      ),
    },
    {
      id: 'tour-family',
      render: () => (
        <FeatureTourSlide
          heading="More depth leads to a richer Lasting Mind legacy"
          progressStep={2}
          totalProgressSteps={5}
          onBack={back}
          onNext={next}
        >
          <FamilyDetailSlide />
        </FeatureTourSlide>
      ),
    },
    {
      id: 'tour-trees',
      render: () => (
        <FeatureTourSlide
          heading="As your Lasting Mind deepens, your tree grows"
          progressStep={3}
          totalProgressSteps={5}
          onBack={back}
          onNext={next}
        >
          <div className="flex h-[220px] w-full items-end justify-center gap-3">
            <img
              src="/images/onboarding/tree 1.2.png"
              alt=""
              className="h-[82px] object-contain"
            />
            <img
              src="/images/onboarding/Tree 2.2.png"
              alt=""
              className="h-[98px] object-contain"
            />
            <img
              src="/images/Tree 1.png"
              alt=""
              className="h-[121px] object-contain"
            />
          </div>
        </FeatureTourSlide>
      ),
    },
    {
      id: 'tour-chat',
      render: () => (
        <FeatureTourSlide
          heading="Eventually, your loved ones can talk with what you create"
          progressStep={4}
          totalProgressSteps={5}
          onBack={back}
          onNext={next}
          nextLabel="Start Building"
        >
          <ChatPreviewSlide />
        </FeatureTourSlide>
      ),
    },
    // Phase 5: Loading (16)
    {
      id: 'preparing',
      render: () => <PreparingSlide onComplete={goHome} delay={3000} />,
    },
  ], [next, back, goHome, handleNameSubmit, handleBirthdaySubmit, firstName, lastName, displayName])

  const currentStep = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="h-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="h-full"
          style={{ willChange: 'transform, opacity' }}
        >
          {currentStep.render()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
