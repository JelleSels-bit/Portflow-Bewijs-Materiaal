import {type FunctionComponent, } from 'react'
import {type QuizWithRelations} from '@/lib/types'
import {getQuizById} from '@/dal/quiz'
import QuizEditForm from '@/app/quizCRUD/put/QuizEditForm'
import {getThemes} from '@/dal/theme'
import {type Theme} from '@/generated/prisma/client'
import CrudPutHeader from '@/components/custom/CRUD/CrudPutHeader'



interface QuizEditPageProps {
  params: Promise<{
    quizId: string
  }>
}


const QuizEditPage: FunctionComponent<QuizEditPageProps> = async ({ params }) => {

  const { quizId } = await params
  const quiz: QuizWithRelations | null = await getQuizById(quizId)
  const theme: Theme[] = await getThemes()

  if (!quiz)
    return (
      <div>de Quiz kon niet worden gevonden.</div>
    )
  if(!theme)
    return (
      <div>De Themes konden niet worden gevonden</div>
    )


  return (
    <div>
      <section>
        <CrudPutHeader name={quiz.title} returnLink="/quizCRUD/index/QuizPage" />
        <QuizEditForm quiz={quiz} theme={theme} />
      </section>
    </div>

  )
}

export default QuizEditPage