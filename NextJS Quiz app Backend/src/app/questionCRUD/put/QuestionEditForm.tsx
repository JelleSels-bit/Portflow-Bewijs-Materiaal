'use client'

import {type FunctionComponent} from 'react'
import type {QuestionWithRelations} from '@/dal/question'
import type {Theme} from '@/generated/prisma/client' // Importeer je Theme type
import FormError from '@/components/custom/formError'
import {AnswerRow} from '@/components/custom/AnswerRow'
import {Button} from '@/components/ui/button'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {quizUpdateQuestionSchema} from '@/schemas/questionSchema'
import {updateQuestionAction} from '@/serverFunctions/question'
import {useFieldArray} from 'react-hook-form'

interface QuestionEditFormProps {
  question: QuestionWithRelations
  allThemes: Theme[]
}

const QuestionEditForm: FunctionComponent<QuestionEditFormProps> = ({question, allThemes}) => {
  const [questionHookForm, QuestionAction] = useZodValidatedForm(quizUpdateQuestionSchema, updateQuestionAction, {
    defaultValues: {
      id: question.id,
      quizId: question.quizId,
      question: question.question,
      answerExplanation: question.answerExplanation,
      points: question.points,
      // Mappen van thema's naar zod formaat
      themes: question.themes.map(t => ({themeId: t.themeId})),
      // Casten van de JSON answers naar het AnswerData type
      answers: question.answers.map(a => ({
        id: String(a.id),
        answer: a.answer,
        isCorrect: a.isCorrect,
      })),
    },
  })

  // 2. FieldArray voor Antwoorden
  const {fields, append, remove} = useFieldArray({
    control: questionHookForm.control,
    name: 'answers',
  })

  // 3. FieldArray voor Thema's
  const {
    fields: themeFields,
    append: appendTheme,
    remove: removeTheme,
  } = useFieldArray({
    control: questionHookForm.control,
    name: 'themes',
  })

  return (
    <Form hookForm={questionHookForm} action={QuestionAction}>
      <input type="hidden" {...questionHookForm.register('id')} />
      <input type="hidden" {...questionHookForm.register('quizId')} />

      <div className="mx-auto mt-6 mb-6 max-w-5xl space-y-6 p-6 border-2 border-primary/20 rounded-lg bg-primary/5 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Vraag</label>
          <textarea
            {...questionHookForm.register('question')}
            className="w-full px-4 py-2 border-2 border-border rounded-lg bg-background"
            rows={2}
          />
          <FormError path="question" />

          <label className="block text-sm font-medium text-foreground mb-2 mt-4">Uitleg</label>
          <textarea
            {...questionHookForm.register('answerExplanation')}
            className="w-full px-4 py-2 border-2 border-border rounded-lg bg-background"
            rows={2}
          />
          <FormError path="answerExplanation" />

          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">Punten</label>
            <input
              type="number"
              {...questionHookForm.register('points', {valueAsNumber: true})}
              className="w-32 px-4 py-2 border-2 border-border rounded-lg bg-background"
            />
            <FormError path="points" />
          </div>

          {/* Themes Sectie */}
          <label className="block text-sm font-medium text-foreground mb-2 mt-6">Thema's</label>
          <div className="flex items-center gap-2 flex-wrap p-4 border-2 border-border rounded-lg bg-muted/30">
            {themeFields.length === 0 && <span className="text-sm text-muted-foreground">Geen thema's gekoppeld</span>}
            {themeFields.map((field, index) => {
              const themeName = allThemes.find(t => t.id === field.themeId)?.name || 'Onbekend thema'
              return (
                <div
                  key={field.id}
                  className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                  <span className="text-sm font-medium">{themeName}</span>
                  <input type="hidden" {...questionHookForm.register(`themes.${index}.themeId`)} />
                  <button
                    type="button"
                    onClick={() => removeTheme(index)}
                    className="text-destructive hover:scale-125 transition-transform font-bold">
                    &times;
                  </button>
                </div>
              )
            })}
          </div>

          <select
            className="w-full mt-2 p-2 border-2 rounded-lg bg-background"
            value=""
            onChange={e => {
              const val = e.target.value
              if (val) {
                if (!themeFields.some(f => f.themeId === val)) {
                  appendTheme({themeId: val})
                }
                e.target.value = ''
              }
            }}>
            <option value="">Voeg een thema toe...</option>
            {allThemes.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          <FormError path="themes" />
        </div>

        {/* Antwoorden Sectie */}
        <div className="space-y-3 mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">Antwoorden</label>
          <p className="text-[11px] text-muted-foreground italic">
            De checkbox is het correcte antwoord (1 juist antwoord per vraag)
          </p>
          {fields.map((field, index) => (
            <AnswerRow key={field.id} index={index} register={questionHookForm.register} onRemove={remove} />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({id: crypto.randomUUID(), answer: '', isCorrect: false})}>
            + Antwoord toevoegen
          </Button>
          <p className="text-[11px] text-muted-foreground italic">Een vraag mag maar 4 antwoorden hebben</p>
        </div>
        <FormError path="answers" />

        <div className="flex justify-end mt-8 border-t pt-6">
          <SubmitButtonWithLoading text="Vraag opslaan" loadingText="Verwerken..." />
        </div>
      </div>
    </Form>
  )
}

export default QuestionEditForm
