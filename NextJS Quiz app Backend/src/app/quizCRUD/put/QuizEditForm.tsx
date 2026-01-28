'use client'

import {Card} from '@/components/ui/card'
import {FileQuestion, Tag} from 'lucide-react'
import {type FunctionComponent, useEffect} from 'react'
import type {QuizWithRelations} from '@/lib/types'
import {type Theme} from '@/generated/prisma/client'
import {linkThemeToQuizAction, updateQuizBaseAction} from '@/serverFunctions/quiz'
import {Input} from '@/components/ui/input'
import Form from '@/components/custom/form'
import {linkThemesToQuizSchema, quizUpdateBaseSchema} from '@/schemas/quizSchema'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import FormError from '@/components/custom/formError'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'
import UnLinkThemeButton from '@/components/ui/unLinkThemeButton'
import {quizCreateQuestionSchema} from '@/schemas/questionSchema'
import {createQuestionAction} from '@/serverFunctions/question'

import {QuestionListItem} from '@/components/custom/QuestionListItem'

interface QuizEditFormProps {
  quiz: QuizWithRelations
  theme: Theme[]
}

const QuizEditForm: FunctionComponent<QuizEditFormProps> = ({quiz, theme}) => {
  const [hookForm, linkAction] = useZodValidatedForm(linkThemesToQuizSchema, linkThemeToQuizAction)
  const [quizBaseHookForm, quizBaseUpdateAction] = useZodValidatedForm(quizUpdateBaseSchema, updateQuizBaseAction)

  const [createQuestionHookForm, createQuestionFn] = useZodValidatedForm(quizCreateQuestionSchema, createQuestionAction)

  useEffect(() => {
    quizBaseHookForm.reset({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      difficulty: quiz.difficulty,
    })
  }, [quiz, quizBaseHookForm])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Quiz Header */}
          <Card className="p-8 border-2">
            <Form hookForm={quizBaseHookForm} action={quizBaseUpdateAction}>
              <input type="hidden" value={quiz.id} {...quizBaseHookForm.register('id')} />

              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                  <FileQuestion className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Quiz Titel</label>
                    <Input
                      id="title"
                      {...quizBaseHookForm.register('title')}
                      type="text"
                      defaultValue={quiz.title}
                      className="w-full px-4 py-2 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary"
                      placeholder="Titel van de quiz"
                    />
                  </div>
                  <FormError path="title" />

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Beschrijving</label>
                    <textarea
                      id="description"
                      {...quizBaseHookForm.register('description')}
                      className="w-full px-4 py-2 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary resize-none"
                      placeholder="Beschrijving van de quiz"
                      rows={3}
                    />
                  </div>
                  <FormError path="description" />

                  <select id="difficulty" {...quizBaseHookForm.register('difficulty')}>
                    <option value="">Selecteer difficulty...</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <FormError path="difficulty" />
              <SubmitButtonWithLoading text="Wijzigingen opslaan" loadingText="Bezig met uw verzoek te verwkeren" />
            </Form>
          </Card>

          {/* Themes Section */}
          <Card className="p-6 border-2">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Themes</h2>
            </div>

            <div className="space-y-4">
              {/* Current Themes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Huidige themes</label>
                <div className="flex items-center gap-2 flex-wrap p-4 border-2 border-border rounded-lg bg-muted/30 min-h-[60px]">
                  {quiz.themes && quiz.themes.length > 0 ? (
                    quiz.themes.map(themeRelation => (
                      <UnLinkThemeButton
                        key={themeRelation.theme.id}
                        quizId={quiz.id}
                        themeId={themeRelation.ThemeId}
                        themeName={themeRelation.theme.name}
                      />
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">Geen themes geselecteerd</span>
                  )}
                </div>
              </div>

              {/* Add Theme Dropdown */}
              <Form hookForm={hookForm} action={linkAction}>
                <input type="hidden" {...hookForm.register('id')} value={quiz.id} />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Thema's toevoegen</label>
                  <select
                    {...hookForm.register('themeIds')}
                    multiple
                    name="themeIds"
                    className="w-full px-4 py-2 border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary min-h-[42px] max-h-[120px]">
                    <option value="">Selecteer een theme...</option>
                    {theme
                      .filter(th => !quiz.themes.some(x => x.theme.name === th.name))
                      .map(th => (
                        <option key={th.id} value={th.id}>
                          {th.name}
                        </option>
                      ))}
                  </select>
                  <p className="text-[10px] text-muted-foreground italic">
                    Tip: Houd Ctrl (of Cmd) ingedrukt om er meerdere te kiezen.
                  </p>
                  <FormError path="themeIds" />

                  <div className="mt-4">
                    <SubmitButtonWithLoading text="Thema koppelen" loadingText="Koppelen..." />
                  </div>
                </div>
              </Form>
            </div>
          </Card>

          {/* Vragen Dashboard */}
          <section className="mt-12">
            <Card className="p-6 border-2 border-primary/20 bg-muted/5">
              <div className="flex items-center justify-between">
                {' '}
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Vragen in deze quiz</h3>
                </div>
                <Form hookForm={createQuestionHookForm} action={createQuestionFn}>
                  <input type="hidden" value={quiz.id} {...createQuestionHookForm.register('quizId')} />
                  <SubmitButtonWithLoading text="Nieuwe vraag toevoegen" loadingText="Vraag aanmaken..." />
                  <FormError path="quizId" />
                </Form>
              </div>

              <div className="grid gap-3">
                {quiz.questions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    Nog geen vragen toegevoegd aan deze quiz.
                  </div>
                )}
                {/*laden van de vragen*/}
                <div className="grid gap-3">
                  {quiz.questions
                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                    .map((question, index) => (
                      <QuestionListItem key={question.id} question={question} quizId={quiz.id} index={index} />
                    ))}
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

export default QuizEditForm
