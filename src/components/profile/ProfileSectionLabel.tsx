import { SectionDivider } from '@/components/shared/SectionDivider'

interface ProfileSectionLabelProps {
  label: string
  variant?: 'default' | 'gold'
}

export function ProfileSectionLabel({ label, variant = 'default' }: ProfileSectionLabelProps) {
  return <SectionDivider label={label} variant={variant === 'default' ? 'muted' : 'gold'} />
}
