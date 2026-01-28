'use client'

import type {FunctionComponent} from 'react'
import {BadgeQuestionMark} from 'lucide-react' // Of jouw specifieke icon import
import {Card, CardHeader, CardTitle, CardDescription, CardFooter} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import Form from '@/components/custom/form'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {gameSessionCreateSchema} from '@/schemas/gameSession'
import {createGameSessionAction} from '@/serverFunctions/gameSession'
import type {Question} from '@/generated/prisma/client'

interface QuizCardProps {
  quiz: {
    id: string
    title: string
    description: string | null
    difficulty: string
    questions: Question[]
  }
}

const QuizCard: FunctionComponent<QuizCardProps> = ({quiz}) => {
  const [hookForm, action] = useZodValidatedForm(gameSessionCreateSchema, createGameSessionAction, {
    defaultValues: {
      quizId: quiz.id,
    },
  })

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <CardHeader className="pb-4 relative">
        <div className="flex justify-between items-start mb-3">
          <Badge
            variant={
              quiz.difficulty === 'Easy' ? 'secondary' : quiz.difficulty === 'Medium' ? 'default' : 'destructive'
            }
            className="shadow-sm">
            {quiz.difficulty}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
            <BadgeQuestionMark className="h-3.5 w-3.5" />
            {quiz.questions.length || 0} vragen
          </div>
        </div>

        <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">{quiz.title}</CardTitle>

        <CardDescription className="line-clamp-3 min-h-[60px] text-sm leading-relaxed">
          {quiz.description || 'Geen beschrijving beschikbaar.'}
        </CardDescription>
      </CardHeader>

      <Form hookForm={hookForm} action={action}>
        {/* De hidden input krijgt nu gegarandeerd de juiste quiz.id */}
        <input type="hidden" {...hookForm.register('quizId')} />

        <CardFooter className="mt-auto pt-4 border-t bg-muted/30 relative">
          <SubmitButtonWithLoading text="Host deze game" loadingText="Lobby aanmaken..." />
        </CardFooter>
      </Form>
    </Card>
  )
}

export default QuizCard
