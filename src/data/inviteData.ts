import type { AudienceMember } from '@/types'

export interface SimulatedContact {
  name: string
  phone: string
}

export const simulatedContacts: SimulatedContact[] = [
  { name: 'Sarah Mitchell', phone: '(555) 012-3456' },
  { name: 'James Mitchell', phone: '(555) 023-4567' },
  { name: 'Lily Mitchell', phone: '(555) 034-5678' },
  { name: 'David Mitchell', phone: '(555) 045-6789' },
  { name: 'Margaret Chen', phone: '(555) 056-7890' },
  { name: 'Sarah Chen', phone: '(555) 067-8901' },
  { name: 'Robert Mitchell Jr.', phone: '(555) 078-9012' },
  { name: 'Eleanor Davis', phone: '(555) 089-0123' },
]

export const relationshipOptions = [
  'Spouse / Partner',
  'Son',
  'Daughter',
  'Stepson',
  'Stepdaughter',
  'Father',
  'Mother',
  'Stepfather',
  'Stepmother',
  'Brother',
  'Sister',
  'Grandfather',
  'Grandmother',
  'Grandson',
  'Granddaughter',
  'Uncle',
  'Aunt',
  'Nephew',
  'Niece',
  'Cousin',
  'Friend',
  'Other',
] as const

export const defaultAudienceMembers: AudienceMember[] = [
  { id: 'am-1', firstName: 'Lily', lastName: 'Mitchell', phone: '(555) 034-5678', relationship: 'Granddaughter', status: 'confirmed', invitedAt: '2026-03-01T10:00:00Z' },
  { id: 'am-2', firstName: 'James', lastName: 'Mitchell', phone: '(555) 023-4567', relationship: 'Son', status: 'confirmed', invitedAt: '2026-03-01T10:00:00Z' },
  { id: 'am-3', firstName: 'Sarah', lastName: 'Chen', phone: '(555) 067-8901', relationship: 'Niece', status: 'confirmed', invitedAt: '2026-03-01T10:00:00Z' },
  { id: 'am-4', firstName: 'David', lastName: 'Mitchell', phone: '(555) 045-6789', relationship: 'Grandson', status: 'confirmed', invitedAt: '2026-03-01T10:00:00Z' },
]
