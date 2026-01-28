import {z} from 'zod/v4'

const jsonAnswerSchema = z.object({
  id: z.uuid().optional(),
  answer: z.string().min(1, 'Antwoord mag niet leeg zijn'),
  isCorrect: z.coerce.boolean(),
})

/**
 * Dit type wordt afgeleid van het Zod-schema.
 * Ik exporteer dit zodat sub-componenten (zoals AnswerRow) precies weten
 * welke velden ze kunnen registreren via de 'register' prop van react-hook-form.
 */
export type QuizUpdateQuestion = z.input<typeof quizUpdateQuestionSchema>

export const quizUpdateQuestionSchema = z
  .object({
    id: z.uuid(),
    question: z.string().min(5, 'Gelieve de vraag in te vullen aub, (5 karakters minimum)'),
    answerExplanation: z.string().min(8, 'Gelieve een uitleg in te vullen aub (8 karakters minimum)'),
    points: z.coerce.number('Gelieve het aantal punten in te geven.'),
    quizId: z.uuid(),

    // Dit is een array van objecten
    answers: z
      .array(jsonAnswerSchema)
      .min(2, 'De vraag moet minimaal 2 antwoorden bevatten')
      .max(4, 'De vraag mag maximum 4 antwoorden hebben'),
    themes: z.array(z.object({themeId: z.string()})).default([]),
  })
  .refine(data => data.answers.some(ans => ans.isCorrect), {
    message: 'De vraag moet minstens 1 correct antwoord bevatten',
    path: ['answers'],
  })
  .refine(data => data.answers.filter(ans => ans.isCorrect).length <= 1, {
    message: 'Er mag maximum maar 1 correct antwoord zijn',
    path: ['answers'],
  })

export const quizCreateQuestionSchema = quizUpdateQuestionSchema.pick({
  quizId: true,
})
export const quizDeleteQuestionSchema = quizUpdateQuestionSchema.pick({
  quizId: true,
  id: true,
})
