'use server'

import {protectedFormAction} from '@/lib/serverFunctions'
import {gameSessionCreateSchema} from '@/schemas/gameSession'
import {createGameSession} from '@/dal/gameSession'
import {redirect} from 'next/navigation'
import {Role} from '@/generated/prisma/enums'

export const createGameSessionAction = protectedFormAction({
  schema: gameSessionCreateSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Create Lobby'
    let success = false
    let session = null

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Creating lobby, with quiz with id: ${data.quizId}`)
      session = await createGameSession(data.quizId, profile.id)
      logger.info('Successfully updated question')
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
      logger.info('Redirecting to Question Update Page')
      redirect(`/host/waitingRoom/${session?.id}`)
    }
  },
  functionName: 'createGameSession',
  requiredRoles: [Role.Admin, Role.User],
})
