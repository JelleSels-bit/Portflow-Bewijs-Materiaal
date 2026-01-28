'use client'
import {Button} from '@/components/ui/button'
import type {UseFormRegister} from 'react-hook-form'
import type {QuizUpdateQuestion} from '@/schemas/questionSchema'
import FormError from '@/components/custom/formError'

interface AnswerRowProps {
  index: number
  register: UseFormRegister<QuizUpdateQuestion>
  onRemove: (index: number) => void
}

export const AnswerRow = ({index, register, onRemove}: AnswerRowProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 flex items-center gap-3 p-3 border-2 border-border rounded-lg bg-background">
        <input type="hidden" {...register(`answers.${index}.id`)} />

        <input
          type="checkbox"
          {...register(`answers.${index}.isCorrect`)}
          className="w-5 h-5 cursor-pointer accent-primary"
        />

        <input
          {...register(`answers.${index}.answer`)}
          placeholder={`Antwoord ${index + 1}`}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/*Delete Button*/}
      <Button type="button" variant="ghost" size="icon" onClick={() => onRemove(index)} className="text-destructive">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </Button>

      <FormError path={`answers.${index}.answer`} />
    </div>
  )
}
