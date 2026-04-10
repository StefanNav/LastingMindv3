import { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NarrativePhase } from '@/components/onboarding/NarrativePhase'
import { PostNamePhase } from '@/components/onboarding/PostNamePhase'
import { PostBirthdayPhase } from '@/components/onboarding/PostBirthdayPhase'
import { FeatureTourCarousel } from '@/components/onboarding/FeatureTourCarousel'
import { CategoryGridSlide } from '@/components/onboarding/CategoryGridSlide'
import { FamilyDetailSlide } from '@/components/onboarding/FamilyDetailSlide'
import { ChatPreviewSlide } from '@/components/onboarding/ChatPreviewSlide'
import { TreeGrowthSlide } from '@/components/onboarding/TreeGrowthSlide'
import { GetStartedSlide } from '@/components/onboarding/GetStartedSlide'
import { PrivacyPromiseSlide } from '@/components/onboarding/PrivacyPromiseSlide'
import { PreparingSlide } from '@/components/onboarding/PreparingSlide'
import { SplashScreen } from '@/components/onboarding/SplashScreen'
import { UserTypeScreen } from '@/components/onboarding/UserTypeScreen'
import { AudienceNameScreen } from '@/components/onboarding/audience/AudienceNameScreen'
import { PhoneNumberScreen } from '@/components/onboarding/audience/PhoneNumberScreen'
import { PhoneVerificationScreen } from '@/components/onboarding/audience/PhoneVerificationScreen'
import { AudienceAppIntroScreen } from '@/components/onboarding/audience/AudienceAppIntroScreen'
import { useApp } from '@/app/AppProvider'

type Direction = 1 | -1

const slideVariants = {
  enter: () => ({
    opacity: 0,
    y: 12,
    clipPath: 'inset(60% 0 0 0)',
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    filter: 'blur(0px)',
  },
  exit: () => ({
    opacity: 0,
    filter: 'blur(4px)',
    transition: { duration: 0.15 },
  }),
}

const slideTransition = {
  duration: 1.7,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const { hasInviteToken, setUserState, setHasSeenAudienceWelcome, audienceCreatorName } = useApp()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<Direction>(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [_userType, setUserType] = useState<'builder' | 'connector' | null>(null)
  const [audiencePhone, setAudiencePhone] = useState('')

  const next = useCallback(() => {
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  const back = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(0, s - 1))
  }, [])

  // Flow-aware back: creator step 6 jumps to user-type (1), not audience step 5
  const smartBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => {
      if (s <= 0) return 0
      // Creator flow starts at step 6; going back from there returns to user-type (step 1)
      if (s === 6) return 1
      return s - 1
    })
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

  const goAudienceHome = useCallback(() => {
    setUserState('audience')
    setHasSeenAudienceWelcome(false)
    navigate('/audience-home')
  }, [navigate, setUserState, setHasSeenAudienceWelcome])

  const handleUserType = useCallback((type: 'builder' | 'connector') => {
    setUserType(type)
    setDirection(1)
    if (type === 'connector') {
      // Go to audience-name (step 2)
      setStep(2)
    } else {
      // Skip audience steps, go to narrative-phase (step 6)
      setStep(6)
    }
  }, [])

  const handleAudienceNameSubmit = useCallback((first: string, last: string) => {
    setFirstName(first)
    setLastName(last)
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  const handleAudiencePhoneSubmit = useCallback((phone: string) => {
    setAudiencePhone(phone)
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  const handleAudienceVerified = useCallback(() => {
    setDirection(1)
    setStep((s) => s + 1)
  }, [])

  const handleAudiencePhoneBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => s - 1)
  }, [])

  // Listen for reset event from DemoDropdown to restart at splash
  useEffect(() => {
    const handler = () => {
      setStep(0)
      setDirection(1)
      setFirstName('')
      setLastName('')
      setUserType(null)
    }
    window.addEventListener('onboarding-reset', handler)
    return () => window.removeEventListener('onboarding-reset', handler)
  }, [])

  const displayName = firstName || 'Alex'

  const steps = useMemo(() => [
    // Step 0: Splash screen
    {
      id: 'splash',
      render: () => <SplashScreen onStart={next} />,
    },
    // Step 1: User type selection
    {
      id: 'user-type',
      render: () => <UserTypeScreen onSelect={handleUserType} hasInviteToken={hasInviteToken} onBack={smartBack} />,
    },
    // ── Audience flow (steps 2-5) ──
    {
      id: 'audience-name',
      render: () => (
        <AudienceNameScreen
          onNext={handleAudienceNameSubmit}
          onBack={smartBack}
          initialFirstName={firstName}
          initialLastName={lastName}
        />
      ),
    },
    {
      id: 'audience-phone',
      render: () => <PhoneNumberScreen onNext={handleAudiencePhoneSubmit} onBack={smartBack} />,
    },
    {
      id: 'audience-verify',
      render: () => (
        <PhoneVerificationScreen
          phoneNumber={audiencePhone}
          creatorName={audienceCreatorName}
          onVerified={handleAudienceVerified}
          onWrongNumber={handleAudiencePhoneBack}
          onBack={smartBack}
        />
      ),
    },
    {
      id: 'audience-intro',
      render: () => <AudienceAppIntroScreen onComplete={goAudienceHome} onBack={smartBack} />,
    },
    // ── Legacy Creator flow (steps 6+) ──
    // Phase 1: Narrative Intro + Name Input — single persistent component
    {
      id: 'narrative-phase',
      render: () => (
        <NarrativePhase
          onComplete={handleNameSubmit}
          onBack={smartBack}
          initialFirstName={firstName}
          initialLastName={lastName}
        />
      ),
    },
    // Phase 2: Loading → Greeting → Birthday (persistent plant)
    {
      id: 'post-name-phase',
      render: () => (
        <PostNamePhase
          firstName={displayName}
          onComplete={handleBirthdaySubmit}
          onBack={smartBack}
        />
      ),
    },
    // Phase 3: Loading → Welcome → Tree morph (persistent plant/canvas)
    {
      id: 'post-birthday-phase',
      render: () => (
        <PostBirthdayPhase
          firstName={displayName}
          onComplete={next}
        />
      ),
    },
    {
      id: 'tour-carousel',
      render: () => (
        <FeatureTourCarousel
          onComplete={next}
          duration={8000}
          slides={[
            {
              id: 'tour-tree',
              heading: 'This tree reflects what you build here',
              content: (
                <div className="flex h-[280px] w-full items-end justify-center">
                  <img src="/images/Tree 1.png" alt="" className="max-h-full object-contain" />
                </div>
              ),
            },
            {
              id: 'tour-categories',
              heading: 'It grows as you share the details of your life',
              content: <CategoryGridSlide />,
            },
            {
              id: 'tour-family',
              heading: 'More depth leads to a richer LastingMind legacy',
              content: <FamilyDetailSlide />,
            },
            {
              id: 'tour-trees',
              heading: 'As your LastingMind deepens, your tree grows',
              content: <TreeGrowthSlide />,
            },
            {
              id: 'tour-chat',
              heading: 'Eventually, your loved ones can talk with what you create',
              content: <ChatPreviewSlide />,
            },
          ]}
        />
      ),
    },
    // Phase 5: Privacy promise
    {
      id: 'privacy-promise',
      render: () => <PrivacyPromiseSlide onContinue={next} onBack={smartBack} />,
    },
    // Phase 6: Let's Get Started CTA
    {
      id: 'get-started',
      render: () => <GetStartedSlide onStart={next} onBack={smartBack} />,
    },
    // Phase 6: Loading
    {
      id: 'preparing',
      render: () => <PreparingSlide onComplete={goHome} delay={3000} />,
    },
  ], [next, back, smartBack, goHome, goAudienceHome, handleNameSubmit, handleBirthdaySubmit, handleUserType, handleAudienceNameSubmit, handleAudiencePhoneSubmit, handleAudienceVerified, handleAudiencePhoneBack, hasInviteToken, firstName, lastName, displayName, audiencePhone, audienceCreatorName])

  const currentStep = steps[Math.min(step, steps.length - 1)]

  return (
    <div className="h-full overflow-hidden relative">
      {/* Backdrop plant — visible during NarrativePhase exit so plant doesn't glitch */}
      {step === 7 && (
        <div
          className="absolute left-0 right-0 flex items-end justify-center pointer-events-none"
          style={{ bottom: 78, zIndex: 0 }}
        >
          <img
            src="/images/onboarding/sprount-2.png"
            alt=""
            style={{ width: '100%', maxWidth: 340, height: 'auto' }}
          />
        </div>
      )}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep.id}
          custom={direction}
          variants={slideVariants}
          initial={currentStep.id === 'post-name-phase' || currentStep.id === 'post-birthday-phase' ? 'center' : 'enter'}
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="h-full"
          style={{ willChange: 'transform, opacity', position: 'relative', zIndex: 1 }}
        >
          {currentStep.render()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
