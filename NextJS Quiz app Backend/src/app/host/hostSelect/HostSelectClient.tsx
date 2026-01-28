'use client'

import {Button} from '@/components/ui/button'
import type {FunctionComponent} from 'react'
import {BadgeQuestionMark, Gamepad2, Plus, Trophy} from 'lucide-react'
import Link from 'next/link'
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import type {QuizWithRelations} from '@/lib/types'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {createGameSessionAction} from '@/serverFunctions/gameSession'
import {gameSessionCreateSchema} from '@/schemas/gameSession'
import QuizCard from '@/app/host/hostSelect/QuizCard'

interface HostSelectClientProps {
  quizzes: QuizWithRelations[]
}

const HostSelectClient: FunctionComponent<HostSelectClientProps> = ({quizzes}) => {
  const [hookForm, action] = useZodValidatedForm(gameSessionCreateSchema, createGameSessionAction)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto py-12 px-4">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Gamepad2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Kies een Quiz</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecteer de quiz die je wilt hosten voor je spelers.
          </p>
        </div>

        {/* Content */}
        {quizzes.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-dashed">
              <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-muted border-2">
                    <Gamepad2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold">Geen quizzen gevonden</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Je hebt nog geen quizzen gemaakt om te hosten. Begin nu en maak je eerste quiz!
                  </p>
                </div>

                <Button asChild size="lg" className="gap-2">
                  <Link href="/quizCRUD/create/QuizCreate">
                    <Plus className="h-4 w-4" />
                    Maak je eerste quiz
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Bar */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                <span className="font-medium">
                  {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} beschikbaar
                </span>
              </div>
            </div>

            {/* Quiz Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HostSelectClient
