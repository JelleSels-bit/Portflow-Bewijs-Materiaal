'use server'

import {type FunctionComponent} from 'react'
import CrudPutHeader from '@/components/custom/CRUD/CrudPutHeader'
import QuestionEditForm from '@/app/questionCRUD/put/QuestionEditForm'
import {getQuestionById} from '@/dal/question'
import type {Theme} from '@/generated/prisma/client'
import {getThemes} from '@/dal/theme'

interface QuizEditPageProps {
  params: Promise<{
    quizId: string
    questionId: string
  }>
}

const QuestionEditPage: FunctionComponent<QuizEditPageProps> = async ({params}) => {
  const {quizId, questionId} = await params
  const question = await getQuestionById(questionId)
  const themes: Theme[] = await getThemes()

  if (!question) return <div>de Quiz kon niet worden gevonden.</div>

  return (
    <>
      <CrudPutHeader name="Vragen" returnLink={`/quizCRUD/put/${quizId}`} />
      <QuestionEditForm question={question} allThemes={themes} />
    </>
  )
}

export default QuestionEditPage
