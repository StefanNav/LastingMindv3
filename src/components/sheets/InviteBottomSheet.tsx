import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, UserPlus, ArrowLeft, ChevronRight, Search, Check, Loader2 } from 'lucide-react'
import { useApp } from '@/app/AppProvider'
import { simulatedContacts, relationshipOptions } from '@/data/inviteData'
import type { AudienceMember } from '@/types'

type SheetView = 'form' | 'contacts' | 'relationships'

const DRAG_CLOSE_THRESHOLD = 100

interface InviteBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (firstName: string) => void
}

export function InviteBottomSheet({ isOpen, onClose, onSuccess }: InviteBottomSheetProps) {
  const shouldReduceMotion = useReducedMotion()
  const { audienceMembers, addAudienceMember } = useApp()

  const [view, setView] = useState<SheetView>('form')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [relationship, setRelationship] = useState('')
  const [customRelationship, setCustomRelationship] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [contactSearch, setContactSearch] = useState('')

  // Pulse-glow: highlights the first empty field when nothing is focused
  type PulseField = 'firstName' | 'lastName' | 'phone' | 'relationship' | 'customRel' | 'none'
  const [pulseTarget, setPulseTarget] = useState<PulseField>('none')

  const getFirstEmptyField = useCallback((
    fn = firstName, ln = lastName, ph = phone, rel = relationship, cRel = customRelationship,
  ): PulseField => {
    if (!fn.trim()) return 'firstName'
    if (!ln.trim()) return 'lastName'
    if (ph.replace(/\D/g, '').length < 10) return 'phone'
    if (!rel) return 'relationship'
    if (rel === 'Other' && !cRel.trim()) return 'customRel'
    return 'none'
  }, [firstName, lastName, phone, relationship, customRelationship])

  const handleFieldFocus = useCallback(() => {
    setPulseTarget('none')
  }, [])

  const handleFieldBlur = useCallback(() => {
    // Delay to allow focus to transfer to another field before pulsing
    setTimeout(() => {
      const active = document.activeElement
      const isFormField = active?.closest('[data-invite-form]')
      if (!isFormField) {
        setPulseTarget(getFirstEmptyField())
      }
    }, 80)
  }, [getFirstEmptyField])

  // Reset state when sheet opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay so the exit animation plays before state resets
      const timer = setTimeout(() => {
        setView('form')
        setFirstName('')
        setLastName('')
        setPhone('')
        setRelationship('')
        setCustomRelationship('')
        setIsSending(false)
        setSendError(null)
        setPhoneError(null)
        setContactSearch('')
        setPulseTarget('none')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])


  // Lock scroll when open
  useEffect(() => {
    const main = document.querySelector('main')
    if (!main) return
    if (isOpen) {
      main.style.overflow = 'hidden'
    } else {
      main.style.overflow = ''
    }
    return () => { main.style.overflow = '' }
  }, [isOpen])

  // Phone formatter (matches PhoneNumberScreen pattern)
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    setPhoneError(null)
  }

  // Check for duplicate phone
  const checkDuplicate = useCallback((phoneValue: string) => {
    const digits = phoneValue.replace(/\D/g, '')
    const match = audienceMembers.find((m) => m.phone.replace(/\D/g, '') === digits)
    if (match) {
      setPhoneError('This person has already been invited.')
      return true
    }
    setPhoneError(null)
    return false
  }, [audienceMembers])

  const phoneDigits = phone.replace(/\D/g, '')
  const isPhoneValid = phoneDigits.length >= 10
  const effectiveRelationship = relationship === 'Other' ? customRelationship : relationship
  const isFormComplete = firstName.trim() !== '' && lastName.trim() !== '' && isPhoneValid && effectiveRelationship.trim() !== '' && !phoneError

  const handleSend = useCallback(() => {
    if (!isFormComplete) return
    if (checkDuplicate(phone)) return

    setIsSending(true)
    setSendError(null)

    // Simulate network delay
    setTimeout(() => {
      const member: AudienceMember = {
        id: `am-${Date.now()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone,
        relationship: effectiveRelationship,
        status: 'pending',
        invitedAt: new Date().toISOString(),
      }
      addAudienceMember(member)
      setIsSending(false)
      onSuccess(firstName.trim())
      onClose()
    }, 1200)
  }, [isFormComplete, checkDuplicate, phone, firstName, lastName, effectiveRelationship, addAudienceMember, onSuccess, onClose])

  // Contact selection
  const handleContactSelect = useCallback((name: string, contactPhone: string) => {
    const parts = name.split(' ')
    const fn = parts[0] || ''
    const ln = parts.slice(1).join(' ') || ''
    setFirstName(fn)
    setLastName(ln)
    setPhone(contactPhone)
    setPhoneError(null)
    setView('form')
    // Recalculate pulse for remaining empty fields after contact fill
    setTimeout(() => setPulseTarget(getFirstEmptyField(fn, ln, contactPhone, relationship, customRelationship)), 100)
  }, [getFirstEmptyField, relationship, customRelationship])

  // Relationship selection
  const handleRelationshipSelect = useCallback((rel: string) => {
    setRelationship(rel)
    const cRel = rel !== 'Other' ? '' : customRelationship
    if (rel !== 'Other') setCustomRelationship('')
    setView('form')
    setTimeout(() => setPulseTarget(getFirstEmptyField(firstName, lastName, phone, rel, cRel)), 100)
  }, [getFirstEmptyField, firstName, lastName, phone, customRelationship])

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    if (!contactSearch.trim()) return simulatedContacts
    const q = contactSearch.toLowerCase()
    return simulatedContacts.filter((c) => c.name.toLowerCase().includes(q))
  }, [contactSearch])

  // ── Animation variants (reused from LegacyBottomSheet) ──
  const sheetVariants = useMemo(() => ({
    hidden: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 300, damping: 30 },
    },
    exit: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.25, ease: 'easeIn' as const },
    },
  }), [shouldReduceMotion])

  const backdropVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.2 },
    },
  }), [shouldReduceMotion])

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { y: number }; velocity: { y: number } }) => {
      if (info.offset.y > DRAG_CLOSE_THRESHOLD || info.velocity.y > 500) {
        onClose()
      }
    },
    [onClose],
  )

  // Stacked overlay panel — slides up from bottom over the form
  const overlayVariants = useMemo(() => ({
    hidden: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 320, damping: 28 },
    },
    exit: {
      y: '100%',
      opacity: shouldReduceMotion ? 0 : 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.22, ease: 'easeIn' as const },
    },
  }), [shouldReduceMotion])

  // ── Render ──
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="invite-backdrop"
            className="fixed inset-0 z-40 bg-black/50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ willChange: 'opacity' }}
          />

          {/* Sheet */}
          <motion.div
            key="invite-panel"
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92%] flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ willChange: 'transform' }}
          >
            {/* Drag handle + close */}
            <div className="relative flex shrink-0 items-center justify-center px-4 pb-2 pt-4">
              <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex size-6 items-center justify-center"
              >
                <X className="size-5 text-foreground/60" />
              </button>
            </div>

            {/* Form is always rendered underneath */}
            <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain">
              {renderFormView()}
            </div>

            {/* Stacked overlay panels — slide up over the form */}
            <AnimatePresence>
              {view === 'contacts' && (
                <motion.div
                  key="contacts-overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
                  style={{ willChange: 'transform' }}
                >
                  {renderContactsView()}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {view === 'relationships' && (
                <motion.div
                  key="relationships-overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-t-[20px] bg-[var(--lm-bg-primary)]"
                  style={{ willChange: 'transform' }}
                >
                  {renderRelationshipsView()}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  // ── Form View ──
  function renderFormView() {
    return (
      <div className="flex flex-1 flex-col px-6 pb-8">
        {/* Title */}
        <p className="font-display text-[22px] font-normal leading-[1.2] text-foreground">
          Invite someone
        </p>
        <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
          Send an invite to join as an audience member.
        </p>

        {/* Choose from contacts button */}
        <button
          type="button"
          onClick={() => setView('contacts')}
          className="mt-5 flex w-full items-center gap-3 rounded-[10px] border border-lm-border bg-lm-bg-card/40 px-4 py-3.5 shadow-card backdrop-blur-sm transition-colors hover:bg-lm-bg-card/70 active:scale-[0.98]"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="size-4 text-primary" />
          </div>
          <span className="flex-1 text-left text-[14px] font-semibold text-foreground">Choose from contacts</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>

        {/* Or enter manually */}
        <button
          type="button"
          onClick={() => {
            // Focus the first name input
            setTimeout(() => {
              const el = document.getElementById('invite-first-name')
              el?.focus()
            }, 100)
          }}
          className="mt-2.5 self-start text-[13px] font-medium text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          Or enter details manually
        </button>

        {/* Form fields */}
        <div className="mt-5 flex flex-col gap-3" data-invite-form>
          {/* First name */}
          <input
            id="invite-first-name"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={handleFieldFocus}
            onBlur={handleFieldBlur}
            className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'firstName' ? ' animate-pulse-glow' : ''}`}
          />

          {/* Last name */}
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={handleFieldFocus}
            onBlur={handleFieldBlur}
            className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'lastName' ? ' animate-pulse-glow' : ''}`}
          />

          {/* Phone number with country code */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="flex h-[42px] shrink-0 items-center rounded-lg border border-lm-border bg-background px-3">
                <span className="font-sans text-[15px] text-foreground">🇺🇸 +1</span>
              </div>
              <input
                type="tel"
                placeholder="(555) 000-0000"
                value={phone}
                onChange={handlePhoneChange}
                onFocus={handleFieldFocus}
                onBlur={() => {
                  if (isPhoneValid) checkDuplicate(phone)
                  handleFieldBlur()
                }}
                className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'phone' ? ' animate-pulse-glow' : ''}`}
              />
            </div>
            {phoneError && (
              <p className="text-[12px] font-medium text-destructive">{phoneError}</p>
            )}
          </div>

          {/* Relationship selector */}
          <button
            type="button"
            onClick={() => setView('relationships')}
            className={`flex h-[42px] w-full items-center justify-between rounded-lg border border-lm-border bg-background px-3 text-left font-sans text-[15px] outline-none transition-colors ${
              relationship ? 'text-foreground' : 'text-muted-foreground'
            }${pulseTarget === 'relationship' ? ' animate-pulse-glow' : ''}`}
          >
            <span>{effectiveRelationship || 'Their relationship to you'}</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>

          {/* Custom relationship input */}
          {relationship === 'Other' && (
            <input
              type="text"
              placeholder="Enter relationship (e.g. Godmother)"
              value={customRelationship}
              onChange={(e) => setCustomRelationship(e.target.value)}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
              autoFocus
              className={`h-[42px] w-full rounded-lg border border-lm-border bg-background px-3 font-sans text-[15px] text-foreground outline-none placeholder:text-muted-foreground focus:border-lm-green focus:ring-1 focus:ring-lm-green/30${pulseTarget === 'customRel' ? ' animate-pulse-glow' : ''}`}
            />
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-4" />

        {/* Error */}
        {sendError && (
          <p className="mb-3 text-center text-[13px] font-medium text-destructive">{sendError}</p>
        )}

        {/* Send button */}
        <button
          type="button"
          disabled={!isFormComplete || isSending}
          onClick={handleSend}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
        >
          {isSending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send invite'
          )}
        </button>
      </div>
    )
  }

  // ── Contacts View (iOS-style, allowed to deviate from design system) ──
  function renderContactsView() {
    return (
      <div className="flex min-h-0 flex-1 flex-col pt-4">
        {/* Drag handle */}
        <div className="flex shrink-0 items-center justify-center pb-2">
          <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
        </div>

        {/* Header bar */}
        <div className="flex items-center gap-3 px-4 pb-3">
          <button
            type="button"
            onClick={() => { setView('form'); setContactSearch('') }}
            className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-5 text-foreground/70" />
          </button>
          <p className="flex-1 text-center font-sans text-[16px] font-semibold text-foreground">
            Contacts
          </p>
          <div className="size-8" /> {/* balance spacer */}
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-[10px] bg-[#e8e8ed] px-3 py-2">
            <Search className="size-4 text-[#8e8e93]" />
            <input
              type="text"
              placeholder="Search"
              value={contactSearch}
              onChange={(e) => setContactSearch(e.target.value)}
              className="w-full bg-transparent font-sans text-[15px] text-[#1c1c1e] outline-none placeholder:text-[#8e8e93]"
            />
          </div>
        </div>

        {/* Contact list */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {filteredContacts.length === 0 ? (
            <p className="px-4 py-8 text-center text-[14px] text-[#8e8e93]">No contacts found</p>
          ) : (
            filteredContacts.map((contact) => {
              const initial = contact.name.charAt(0).toUpperCase()
              return (
                <button
                  key={contact.name}
                  type="button"
                  onClick={() => handleContactSelect(contact.name, contact.phone)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#e8e8ed]/60 active:bg-[#d1d1d6]"
                >
                  {/* Avatar circle */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#c7c7cc]">
                    <span className="font-sans text-[15px] font-semibold text-white">{initial}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-sans text-[16px] font-normal leading-tight text-[#1c1c1e]">{contact.name}</p>
                    <p className="font-sans text-[13px] text-[#8e8e93]">{contact.phone}</p>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    )
  }

  // ── Relationships View ──
  function renderRelationshipsView() {
    return (
      <div className="flex min-h-0 flex-1 flex-col pt-4">
        {/* Drag handle */}
        <div className="flex shrink-0 items-center justify-center pb-2">
          <div className="h-[3px] w-10 rounded-full bg-foreground/30" />
        </div>

        {/* Header bar */}
        <div className="flex items-center gap-3 px-4 pb-3">
          <button
            type="button"
            onClick={() => setView('form')}
            className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-5 text-foreground/70" />
          </button>
          <p className="flex-1 text-center font-sans text-[16px] font-semibold text-foreground">
            Relationship
          </p>
          <div className="size-8" />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-8">
          <div className="flex flex-col gap-1">
            {relationshipOptions.map((rel) => {
              const isSelected = relationship === rel
              return (
                <button
                  key={rel}
                  type="button"
                  onClick={() => handleRelationshipSelect(rel)}
                  className={`flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-lm-bg-card/70'
                  }`}
                >
                  <span className="font-sans text-[15px] font-medium">{rel}</span>
                  {isSelected && <Check className="size-4 text-primary" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
