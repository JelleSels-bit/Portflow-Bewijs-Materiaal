'use server'

import {protectedFormAction} from '@/lib/serverFunctions'

import {redirect} from 'next/navigation'
import {createQuestion, deleteQuestion, updateQuestion} from '@/dal/question'
import {quizCreateQuestionSchema, quizDeleteQuestionSchema, quizUpdateQuestionSchema} from '@/schemas/questionSchema'
import {revalidatePath} from 'next/cache'
import {Role} from '@/generated/prisma/enums'
import type {QuizWithRelations} from '@/lib/types'
import {getQuizById} from '@/dal/quiz'

export const updateQuestionAction = protectedFormAction({
  schema: quizUpdateQuestionSchema,
  serverFn: async ({data, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin update theme'
    let success = false
    const {id, quizId, themes, answers, ...rest} = data
    try {
      logger.info(`operation started: ${operationName}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Updating question with id ${data.id}`)

      const themeIds = themes?.map(t => t.themeId) ?? []
      const preparedAnswers = answers.map(a => ({
        ...a,
        id: a.id || crypto.randomUUID(),
      }))

      await updateQuestion(id, {
        ...rest,
        answers: preparedAnswers,
        themeIds: themeIds,
      })
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
      redirect(`/quizCRUD/put/${quizId}`)
    }
  },
  functionName: 'Admin update Quiz Question',
  requiredRoles: [Role.Admin],
})

export const createQuestionAction = protectedFormAction({
  schema: quizCreateQuestionSchema,
  serverFn: async ({data, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin update theme'
    let success = false
    let question = null
    const {quizId} = data

    try {
      logger.info(`operation started: ${operationName}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      const quiz: QuizWithRelations | null = await getQuizById(quizId)
      if (!quiz)
        return {
          success: false,
          errors: {
            errors: ['De quiz werd niet gevonden?'],
          },
        }

      if (quiz.questions.length + 1 > 15) {
        return {
          success: false,
          errors: {
            errors: ['Een quiz mag maar maximum 15 vragen hebben.'],
          },
        }
      }
      logger.info(`Creating new question`)
      question = await createQuestion(quizId)
      logger.info('Successfully created new questoin')
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
      redirect(`/questionCRUD/put/${quizId}/${question?.id}`)
      // revalidatePath(`/quizCRUD/put/${quizId}}`)
    }
  },
  functionName: 'Admin create Quiz Question',
  requiredRoles: [Role.Admin],
})

export const deleteQuestionAction = protectedFormAction({
  schema: quizDeleteQuestionSchema,
  serverFn: async ({data, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin delete question'
    let success = false

    try {
      logger.info(`operation started: ${operationName}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Deleting question with id ${data.id}`)
      await deleteQuestion(data.id)
      logger.info('Successfully delete question')
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
      redirect(`/quizCRUD/put/${data.quizId}`)
    }
  },
  requiredRoles: [Role.Admin],
  functionName: 'Admin delete Quiz Question',
})
