import {prismaClient} from '@/dal/prismaClient'
import type {QuizWithRelations} from '@/lib/types'
import type {Difficulty, Quiz, Prisma} from '@/generated/prisma/client'

export async function getQuizzes(quizNameParam: string = ''): Promise<QuizWithRelations[]> {
  return prismaClient.quiz.findMany({
    where: {
      title: {
        contains: quizNameParam,
        mode: 'insensitive',
      },
    },
    include: {
      questions: {
        include: {
          themes: {
            include: {
              theme: true,
            },
          },
        },
      },
      themes: {
        include: {
          theme: true,
        },
      },
    },
  })
}

export async function getQuizById(quizId: string): Promise<QuizWithRelations | null> {
  return prismaClient.quiz.findUnique({
    where: {id: quizId},
    include: {
      questions: {
        include: {
          themes: {
            include: {
              theme: true,
            },
          },
        },
      },
      themes: {
        include: {
          theme: true,
        },
      },
    },
  })
}

//Dit kan later nog uitgewerkt worden naar het aanmaken van een hele quiz met al zijn relaties
export type CreateQuizParams = Prisma.QuizCreateInput

export async function createQuiz(quiz: CreateQuizParams): Promise<Quiz> {
  return prismaClient.quiz.create({data: quiz})
}

export interface UpdateQuizParams {
  title?: string
  description: string
  difficulty?: Difficulty
}

export async function updateQuizBase(quizId: string, updateData: UpdateQuizParams): Promise<Quiz> {
  return prismaClient.quiz.update({
    where: {id: quizId},
    data: updateData,
  })
}

export async function deleteQuiz(quizId: string): Promise<void> {
  await prismaClient.quiz.delete({
    where: {id: quizId},
  })
}

export async function linkThemesToQuiz(quizId: string, themeIds: string[]) {
  if (themeIds.length === 0) return

  await prismaClient.quizTheme.createMany({
    data: themeIds.map(themeId => ({
      quizId: quizId,
      ThemeId: themeId,
    })),
    skipDuplicates: true,
  })
}

export async function unLinkThemesToQuiz(quizId: string, themeId: string) {
  // We gebruiken deleteMany in plaats van delete.
  // deleteMany geeft geen error als er niets gevonden wordt om te verwijderen.
  await prismaClient.quizTheme.deleteMany({
    where: {
      quizId: quizId,
      ThemeId: themeId,
    },
  })
}
