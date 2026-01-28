import {type FunctionComponent} from 'react'
import {getQuizById} from '@/dal/quiz'
import {FileQuestion, Tag} from 'lucide-react'
import {Card} from '@/components/ui/card'
import type  {QuizWithRelations} from '@/lib/types'
import CrudDetailHeader from '@/components/custom/CRUD/CrudDetailHeader'



interface quizDetailPageProps {
  params: Promise<{
    quizId: string
  }>
}

const quizDetailPage: FunctionComponent<quizDetailPageProps> = async ({ params }) => {

  const { quizId } =  await params
  const quiz: QuizWithRelations | null = await getQuizById(quizId)

  if(!quiz)
  {
    return (
      <div>Quiz niet gevonden</div>
    )
  }

  return (

    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <CrudDetailHeader name={quiz.title} returnLink="/quizCRUD/index/QuizPage" />

          {/* Quiz Header */}
          <Card className="p-8 border-2">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center">
                  <FileQuestion className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2 flex-1">
                  <h1 className="text-3xl font-bold text-foreground">{quiz.title}</h1>
                  {quiz.description && (
                    <p className="text-muted-foreground">{quiz.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Themes */}
            {quiz.themes && quiz.themes.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-4">
                <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                {quiz.themes.map((themeRelation) => (
                  <span
                    key={themeRelation.theme.id}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                  {themeRelation.theme.name}
                </span>
                ))}
              </div>
            )}
          </Card>

          {/* Questions */}
          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <Card key={question.id} className="p-6 border-2">
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>

                    {/* Question Themes */}
                    {question.themes && question.themes.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap mt-2">
                        {question.themes.map((themeRelation) => (
                          <span
                            key={themeRelation.theme.id}
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground border border-border"
                          >
                          {themeRelation.theme.name}
                        </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Answers */}
                <div className="space-y-2 ml-13">
                  {(question.answers as PrismaJson.AnswerData).map((answer) => (
                    <div
                      key={answer.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                        answer.isCorrect
                          ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800'
                          : 'bg-muted/50 border-border'
                      }`}
                    >
                      <div
                        className={`rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                          answer.isCorrect
                            ? 'bg-green-500'
                            : 'bg-muted-foreground/20'
                        }`}
                      >
                        {answer.isCorrect && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${answer.isCorrect ? 'font-medium text-green-900 dark:text-green-100' : 'text-foreground'}`}>
                      {answer.answer}
                    </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default quizDetailPage