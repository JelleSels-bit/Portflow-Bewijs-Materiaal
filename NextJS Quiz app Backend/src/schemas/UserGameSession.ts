import {z} from 'zod'

export const userGameSessionSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  gameSessionId: z.uuid(),
  joinedAt: z.date(),
  score: z.number(),
  roomcode: z.string(),
})

export const linkUserToGameSessionSchema = userGameSessionSchema.pick({
  roomcode: true,
})
