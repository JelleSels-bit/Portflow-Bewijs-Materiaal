'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, Trash2, X } from 'lucide-react'
import type { FunctionComponent } from 'react'

import {type Quiz} from '@/generated/prisma/client'
import {deleteQuizAction} from '@/serverFunctions/quiz'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import { quizDeleteBaseSchema } from '@/schemas/quizSchema'
import Form from '@/components/custom/form'
import FormError from '@/components/custom/formError'

interface UserDeleteConfirmProps {
  quiz: Quiz
}

export const QuizDeleteConfirm: FunctionComponent<UserDeleteConfirmProps> = ({ quiz }) => {

  const [hookForm, deleteAction] = useZodValidatedForm(
    quizDeleteBaseSchema,
    deleteQuizAction
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link href="/quizCRUD/index/QuizPage">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar overzicht
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-destructive/10 w-14 h-14 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-destructive" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Quiz verwijderen
                </h1>
                <p className="text-muted-foreground mt-1">
                  Deze actie kan niet ongedaan gemaakt worden
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 border-2 border-destructive/30">
              <Form hookForm={hookForm} action={deleteAction}  className="space-y-8">
                <input type="hidden" {...hookForm.register('id')} value={quiz.id} />
                <div className="space-y-4">
                  <p className="text-lg">
                    Ben je zeker dat je de volgende quiz wilt verwijderen?
                  </p>

                  <div className="rounded-lg border border-border p-4 bg-muted/50 space-y-2">
                    <p><strong>Naam:</strong> {quiz.title}</p>
                    <p><strong>Beschrijving:</strong> {quiz.description}</p>
                    <p><strong>Moeilijkheid:</strong> {quiz.difficulty}</p>
                  </div>

                  <p className="text-sm text-destructive">
                    ⚠️ Alle vragen en gegevens die gekoppeld zijn aan deze quiz worden definitief verwijderd.
                  </p>
                </div>



                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button
                    type="submit"
                    variant="destructive"
                    size="lg"
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Ja, quiz verwijderen
                  </Button>

                  <Link href="/quizCRUD/index/QuizPage" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full bg-transparent"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annuleren
                    </Button>
                  </Link>
                </div>
                <FormError path="id" />
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
