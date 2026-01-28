import {type FunctionComponent} from 'react'
import {getQuizById} from '@/dal/quiz'
import {QuizDeleteConfirm} from '@/app/quizCRUD/delete/QuizDeleteConfirm'


interface QuizDeleteProps{
  params: Promise<{
    quizId: string
  }>
}

const QuizDeletePage: FunctionComponent<QuizDeleteProps> = async ({params}) => {

  const {quizId} =  await params
  const quiz = await getQuizById(quizId)
  
  if (!quiz)
    return (
      <div>De quiz kan niet gevonden worden</div>
    )
  
  return(
    <QuizDeleteConfirm quiz={quiz} />
  )
}

export default QuizDeletePage