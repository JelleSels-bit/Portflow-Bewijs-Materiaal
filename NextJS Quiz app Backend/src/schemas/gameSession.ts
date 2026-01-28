import {z} from 'zod'
import {Status} from '@/generated/prisma/enums'

export const gameSessionSchema = z.object({
  id: z.uuid(),
  maxPlayers: z.number(),
  status: z.enum(Status),
  hostId: z.uuid(),
  quizId: z.uuid(),
  roomcode: z.number(),
})

export const gameSessionCreateSchema = gameSessionSchema.pick({
  quizId: true,
})
