'use server'

import {protectedFormAction} from '@/lib/serverFunctions'
import {getGameSessionByRoomCode} from '@/dal/gameSession'
import {redirect} from 'next/navigation'
import {linkUserToGameSessionSchema} from '@/schemas/UserGameSession'
import {ValidateRoomCode, linkUserToGameSession} from '@/dal/userGameSession'
import {Role} from '@/generated/prisma/enums'

export const linkUserToGameSessionAction = protectedFormAction({
  schema: linkUserToGameSessionSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = `Player joining lobby`
    let success = false

    let gameSession = null

    try {
      logger.info(`Operation started: ${operationName}`)
      const isValidRoomCode = await ValidateRoomCode(data.roomcode)
      if (!data) {
        logger.warn('No data was found?')
        return
      }

      if (!isValidRoomCode) {
        logger.warn(`Invalid room coe attempt: ${data.roomcode}`)
        return {
          success: false,
          errors: {
            errors: ['De ingevulde room code is niet valide'],
          },
        }
      }
      gameSession = await getGameSessionByRoomCode(data.roomcode)
      if (!gameSession) {
        return {
          success: false,
          errors: {
            errors: ['Kan de game sessie niet vinden'],
          },
        }
      }
      logger.info('User attempting to join lobby')
      await linkUserToGameSession(gameSession.id, profile.id)
      logger.info('Successfully joined')
      success = true
    } catch (error) {
      logger.error(`Error in operation ${operationName}: ${(error as Error).message}`)
      throw error
    } finally {
      const endTime = Date.now()
      const duration = endTime - startTime
      logger.info(`Operation ended: ${operationName}, duration: ${duration}ms`)
    }

    if (success) {
      logger.info(`/player/waitingRoom/${gameSession?.id}`)
      redirect(`/player/waitingRoom/${gameSession?.id}`)
    }
  },
  functionName: 'Link User To Game Session Action',
  requiredRoles: [Role.Admin, Role.User],
})
