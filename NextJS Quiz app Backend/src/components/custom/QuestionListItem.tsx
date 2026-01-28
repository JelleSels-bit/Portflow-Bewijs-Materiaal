// components/custom/QuestionListItem.tsx
'use client'

import {Trash2, Pen} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {type Route} from 'next'
import {deleteQuestionAction} from '@/serverFunctions/question'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {quizDeleteQuestionSchema} from '@/schemas/questionSchema'
import Form from '@/components/custom/form'

interface QuestionListItemProps {
  question: {id: string; question: string}
  quizId: string
  index: number
}

export const QuestionListItem = ({question, quizId, index}: QuestionListItemProps) => {
  const [deleteHookForm, deleteAction] = useZodValidatedForm(quizDeleteQuestionSchema, deleteQuestionAction)

  return (
    <div
      className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all ${'border-border bg-background'}`}>
      <div className="flex items-center gap-4 flex-1 mr-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
          {index + 1}
        </span>
        <span className="text-foreground font-medium line-clamp-1">{question.question}</span>
      </div>

      <div className="flex items-center gap-2">
        <Link href={`/questionCRUD/put/${quizId}/${question.id}` as Route}>
          <Button type="button" variant="outline" size="sm">
            <Pen className="h-4 w-4" />
          </Button>
        </Link>

        <Form hookForm={deleteHookForm} action={deleteAction}>
          <input type="hidden" {...deleteHookForm.register('id')} value={question.id} />
          <input type="hidden" {...deleteHookForm.register('quizId')} value={quizId} />

          <Button
            type="submit"
            variant="destructive"
            size="sm"
            onClick={e => {
              if (!confirm(`Weet je zeker dat je vraag "${question.question.substring(0, 20)}..." wilt verwijderen?`)) {
                e.preventDefault()
              }
            }}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </Form>
      </div>
    </div>
  )
}
