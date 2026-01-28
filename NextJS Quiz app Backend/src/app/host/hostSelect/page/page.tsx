'use server'
import HostSelectClient from '@/app/host/hostSelect/HostSelectClient'
import {getQuizzes} from '@/dal/quiz'
import type {QuizWithRelations} from '@/lib/types'

export default async function HostPage() {
  const quizzes: QuizWithRelations[] = await getQuizzes()

  return <HostSelectClient quizzes={quizzes} />
}
