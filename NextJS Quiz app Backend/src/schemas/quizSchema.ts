import {z} from 'zod'
import {Difficulty} from '@/generated/prisma/enums'

export const answerSchema = z.object({
  id: z.uuid().optional().or(z.literal('')),
  answer: z.string().min(1),
  isCorrect: z.coerce.boolean(),
})

export const questionSchema = z.object({
  id: z.uuid().optional(),
  question: z.string().min(5),
  points: z.coerce.number().int().min(0),
  answerExplanation: z.string(),
  answers: z.array(answerSchema).min(2), // Een vraag heeft meerdere antwoorden
})

export const quizSchema = z.object({
  id: z.uuid(),
  title: z.string().min(3, 'De titel moet langer zijn dan 3 karakters'),
  description: z.string().min(2, 'Gelieve een beschrijving in te vullen aub'),
  difficulty: z.enum(Difficulty, 'Gelieve een moeilijkheids graad te kiezen aub'),

  questions: z.array(questionSchema).optional(),
  // themeIds vangt op dat een select-veld ofwel een enkele string (bij 1 selectie)
  // of een array (bij meerdere) doorstuurt.
  themeIds: z
    // Accepteren van UUID of  een Array van UUID's
    .union([z.uuid(), z.array(z.uuid())])
    // Enkele string omzetten naar een array van 1 element
    .transform(val => (Array.isArray(val) ? val : [val]))
    // Valideer de array moet minstens 1 item bevatten
    .pipe(z.array(z.uuid()).min(1, 'Selecteer een thema')),
  themeId: z.uuid(),
})

export const quizCreateBaseSchema = quizSchema.pick({
  title: true,
  description: true,
  difficulty: true,
})
export const quizUpdateBaseSchema = quizSchema.pick({
  id: true,
  title: true,
  description: true,
  difficulty: true,
})
export const quizDeleteBaseSchema = quizSchema.pick({id: true})
export const unLinkThemeToQuizSchema = quizSchema.pick({id: true, themeId: true})

export const linkThemesToQuizSchema = quizSchema.pick({id: true, themeIds: true})
