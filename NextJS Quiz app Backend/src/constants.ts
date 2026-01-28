import {Role} from '@/generated/prisma/enums'

export const SessionDuration = {
  [Role.User]: 1000 * 60 * 60 * 24,
  [Role.Admin]: 1000 * 60 * 60 * 24,
} satisfies Record<Role, number>
