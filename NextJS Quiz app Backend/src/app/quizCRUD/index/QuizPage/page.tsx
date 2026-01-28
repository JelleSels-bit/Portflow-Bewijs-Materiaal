import {type FunctionComponent} from 'react'
import {getQuizzes} from '@/dal/quiz'
import {QuizzesList} from '@/app/quizCRUD/index/QuizzesList'
import type {QuizWithRelations} from '@/lib/types'
import {Search, Users} from 'lucide-react'
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import CrudHeader from '@/components/custom/CRUD/CrudHeader'
import CrudSearchSection from '@/components/custom/CRUD/CrudSearchSection'

interface QuizManagementPageProps {
  searchParams: Promise<{
    quizName?: string
  }>
}

const QuizManagementPage: FunctionComponent<QuizManagementPageProps> = async ({searchParams}) => {
  const {quizName} = await searchParams
  const quizzes: QuizWithRelations[] = await getQuizzes(quizName)

  return (
    <>
      <CrudHeader subject="Quizzes" />
      <CrudSearchSection title="Zoek Quizzes" defaultValue={quizName} inputName="quizName" />
      <QuizzesList initialQuizzes={quizzes} />
    </>
  )
}

export default QuizManagementPage
