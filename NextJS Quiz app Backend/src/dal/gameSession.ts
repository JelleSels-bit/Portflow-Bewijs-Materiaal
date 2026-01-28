import {prismaClient} from '@/dal/prismaClient'
import type {GameSession, User, UserGameSession} from '@/generated/prisma/client'

export async function createGameSession(quizId: string, hostId: string): Promise<GameSession> {
  const roomCode = Math.floor(100000 + Math.random() * 900000).toString()

  return prismaClient.gameSession.create({
    data: {
      quizId: quizId,
      hostId: hostId,
      maxPlayers: 6,
      roomcode: roomCode,
      status: 'Pending',
      players: {
        create: {
          userId: hostId,
          score: 0,
        },
      },
    },
  })
}

export interface GameSessionWithPlayers extends GameSession {
  players: (UserGameSession & {
    user: User
  })[]
}
export async function getGameSession(sessionId: string): Promise<GameSessionWithPlayers | null> {
  return prismaClient.gameSession.findUnique({
    where: {id: sessionId},
    include: {
      players: {
        include: {
          user: true,
        },
      },
    },
  })
}

export async function getGameSessionByRoomCode(roomcode: string): Promise<GameSessionWithPlayers | null> {
  return prismaClient.gameSession.findUnique({
    where: {roomcode: roomcode},
    include: {
      players: {
        include: {
          user: true,
        },
      },
    },
  })
}

export async function isUserHostOfSession(userId: string, sessionId: string): Promise<boolean> {
  const session = await prismaClient.gameSession.findUnique({
    where: {id: sessionId},
    select: {hostId: true},
  })
  return session?.hostId === userId
}
