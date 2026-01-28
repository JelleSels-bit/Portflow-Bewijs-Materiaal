import {prismaClient} from '@/dal/prismaClient'
import type {UserGameSession} from '@/generated/prisma/client'
import {linkUserToGameSessionQuery} from '@/generated/prisma/sql/linkUserToGameSessionQuery'

export async function getUserGameSessionByUserId(userId: string): Promise<UserGameSession | null> {
  return prismaClient.userGameSession.findFirst({
    where: {userId: userId},
  })
}

//Typed sql om de code performanter te maken zodat we minder server requests sturen om te checken of de gebruiker al in de lobby zit.
export async function linkUserToGameSession(gameSessionId: string, userId: string): Promise<void> {
  await prismaClient.$queryRawTyped(linkUserToGameSessionQuery(gameSessionId, userId))
}

//Helper functie voor userGameSession ServerFn
export async function ValidateRoomCode(roomcode: string): Promise<boolean> {
  const gameSession = await prismaClient.gameSession.findFirst({
    where: {roomcode: roomcode},
    include: {
      players: {
        include: {
          user: true,
        },
      },
    },
  })
  //Als gameSession geen object is returnen we false, als we wel iets vinden true.
  return !!gameSession
}
