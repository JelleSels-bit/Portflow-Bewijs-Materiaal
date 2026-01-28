'use server'

import {protectedFormAction} from '@/lib/serverFunctions'
import {createTheme, deleteTheme, updateTheme} from '@/dal/theme'
import {createThemeSchema, deleteThemeSchema, updateThemeSchema} from '@/schemas/themeSchema'
import {redirect} from 'next/navigation'
import {revalidatePath} from 'next/cache'
import {Role} from '@/generated/prisma/enums'

export const createThemeAction = protectedFormAction({
  schema: createThemeSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin create theme'
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info('Creating new theme')
      await createTheme(data)
      logger.info('Successfully created theme')
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
      logger.info('Redirecting to Theme Page')
      redirect('/themeCRUD/index/ThemePage')
    }
  },
  functionName: 'createThemeAction',
  requiredRoles: [Role.Admin],
})

export const deleteThemeAction = protectedFormAction({
  schema: deleteThemeSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin delete theme'
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Deleting theme with id ${data.id}`)
      await deleteTheme(data.id)
      logger.info('Successfully deleted theme')
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
      logger.info('Redirecting to Theme Page')
      redirect('/themeCRUD/index/ThemePage')
    }
  },
  functionName: 'deleteThemeAction',
  requiredRoles: [Role.Admin],
})

export const updateThemeAction = protectedFormAction({
  schema: updateThemeSchema,
  serverFn: async ({data, profile, logger}) => {
    const startTime = Date.now()
    const operationName = 'Admin update theme'
    let success = false

    try {
      logger.info(`operation: ${operationName}, started by user ${profile.username}`)

      if (!data) {
        logger.warn('No data was found?')
        return
      }

      logger.info(`Updating theme with id ${data.id}`)
      const {id, ...updateData} = data
      await updateTheme(id, updateData)
      logger.info('Successfully updated theme')
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
      revalidatePath(`/themeCRUD/put/${data.id}`, 'page')
    }
  },
  functionName: 'updateThemeAction',
  requiredRoles: [Role.Admin],
})
