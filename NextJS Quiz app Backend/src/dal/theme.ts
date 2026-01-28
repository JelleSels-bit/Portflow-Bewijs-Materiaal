import {type Prisma, type Theme} from '@/generated/prisma/client'
import {prismaClient} from '@/dal/prismaClient'

export async function getThemes(themeNameParam: string = ''): Promise<Theme[]> {
  return prismaClient.theme.findMany({
    where: {
      name: {contains: themeNameParam, mode: 'insensitive'},
    },
  })
}

export async function getThemeById(id: string): Promise<Theme | null> {
  return prismaClient.theme.findUnique({where: {id}})
}

export type CreateThemeParams = Prisma.ThemeCreateInput

export async function createTheme(data: CreateThemeParams): Promise<void> {
  await prismaClient.theme.create({
    data: data,
  })
}

export async function deleteTheme(themeId: string): Promise<void> {
  await prismaClient.theme.delete({
    where: {id: themeId},
  })
}

export type UpdateThemeParams = Prisma.ThemeUpdateInput

export async function updateTheme(themeId: string, data: UpdateThemeParams): Promise<Theme> {
  return prismaClient.theme.update({
    where: {id: themeId},
    data: data,
  })
}
