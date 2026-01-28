import {prismaClient} from '@/dal/prismaClient'
import {type Question} from '@/generated/prisma/client'

export type QuestionWithRelations = Question & {
  themes: {themeId: string}[]
}

export async function getQuestionById(id: string): Promise<QuestionWithRelations | null> {
  const question = await prismaClient.question.findUnique({
    where: {id},
    include: {
      themes: {
        select: {
          themeId: true,
        },
      },
    },
  })

  if (!question) return null

  // We casten de answers hier naar je PrismaJson type
  // zodat de rest van je app geen 'unknown' meer ziet.
  return question as unknown as QuestionWithRelations
}

export interface QuestionUpdateData {
  question: string
  answerExplanation: string
  points: number
  answers: PrismaJson.AnswerData
  themeIds: string[]
}

export async function updateQuestion(questionId: string, data: QuestionUpdateData): Promise<Question> {
  return prismaClient.question.update({
    where: {id: questionId},
    data: {
      question: data.question,
      answerExplanation: data.answerExplanation,
      points: data.points,
      answers: data.answers,
      themes: {
        deleteMany: {},
        create: data.themeIds.map(id => ({
          themeId: id,
        })),
      },
    },
  })
}

export async function createQuestion(quizId: string): Promise<Question | null> {
  return prismaClient.question.create({
    data: {
      quizId: quizId,
      question: 'Nieuwe Vraag',
      answerExplanation: 'De uitleg van de nieuwe vraag :)',
      points: 5,
      answers: [],
    },
  })
}

export async function deleteQuestion(questionId: string): Promise<void> {
  await prismaClient.question.delete({
    where: {id: questionId},
  })
}
