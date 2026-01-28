'use server'

import {protectedFormAction} from '@/lib/serverFunctions'
import {revalidatePath} from 'next/cache'
import {
  linkThemesToQuizSchema,
  quizCreateBaseSchema,
  quizDeleteBaseSchema,
  quizUpdateBaseSchema,
  unLinkThemeToQuizSchema,
} from '@/schemas/quizSchema'
import {createQuiz, deleteQuiz, linkThemesToQuiz, unLinkThemesToQuiz, updateQuizBase} from '@/dal/quiz'

import {redirect} from 'next/navigation'
import {Role} from '@/generated/prisma/enums'

export const createQuizAction = protectedFormAction({
  schema: quizCreateBaseSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = `Create Quiz `
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }
      logger.info('Creating a new Quiz')
      await createQuiz(data)
      logger.info(`Successfully created Quiz`)
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
      logger.info('Redirecting to Theme Update Page')
      redirect('/quizCRUD/index/QuizPage')
    }
  },
  functionName: 'Admin create Quiz',
  requiredRoles: [Role.Admin],
})

export const updateQuizBaseAction = protectedFormAction({
  schema: quizUpdateBaseSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin update Quiz Base'
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Updating Quiz with id ${data.id}`)
      const {id, ...updateData} = data
      await updateQuizBase(id, updateData)
      logger.info('Successfully updated Quiz')
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
      logger.info('Redirecting to Quiz Update Page')
      revalidatePath(`/quizCRUD/put/${data.id}`, 'page')
    }
  },
  functionName: 'Admin update Quiz Base',
  requiredRoles: [Role.Admin],
})

export const deleteQuizAction = protectedFormAction({
  schema: quizDeleteBaseSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin Delete Quiz'
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Deleting quiz with id ${data.id}`)
      await deleteQuiz(data.id)
      logger.info('Successfully deleted Quiz')
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
      logger.info('Redirecting to Quiz Index Page')
      redirect(`/quizCRUD/index/QuizPage`)
    }
  },
  functionName: 'Admin delete Quiz',
  requiredRoles: [Role.Admin],
})

export const linkThemeToQuizAction = protectedFormAction({
  schema: linkThemesToQuizSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin Link Theme To Quiz'
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }
      logger.info(`Linking theme to quiz with id ${data.id}`)
      const {id, themeIds} = data
      await linkThemesToQuiz(id, themeIds)
      logger.info(`Successfully Linked Quiz to Themes`)
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
      logger.info('Revalidating path Quiz Update Page')
      revalidatePath(`/quizCRUD/put/${data.id}`, 'page')
    }
  },
  functionName: 'Admin Link Theme To Quiz ',
  requiredRoles: [Role.Admin],
})

export const unLinkThemeToQuizAction = protectedFormAction({
  schema: unLinkThemeToQuizSchema,
  serverFn: async ({data, profile, logger}) => {
    const {id, themeId} = data
    const startTime = Date.now()
    const operationName = `disconnect theme: ${themeId} from quiz: ${id}`
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }
      logger.info(`disconnecting theme from quiz with id ${data.id}`)
      await unLinkThemesToQuiz(id, themeId)
      logger.info('Theme has been disconnected successfully')
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
      logger.info(`Revalidating path to /quizCRUD/put/${id}`)
      revalidatePath(`/quizCRUD/put/${id}`, 'page')
    }
  },
  functionName: 'unLinkThemeToQuiz',
  requiredRoles: [Role.Admin],
})
