'use server'

import type {FunctionComponent} from 'react'
import HostWaitingRoomClient from '@/app/host/waitingRoom/hostWaitingRoomClient'
import {type GameSessionWithPlayers, getGameSession, isUserHostOfSession} from '@/dal/gameSession'
import {getQuizById} from '@/dal/quiz'
import type {QuizWithRelations} from '@/lib/types'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'
import type {PublicUser} from '@/models/PublicUser'
import {redirect} from 'next/navigation'

interface WaitingRoomPageParams {
  params: Promise<{
    sessionId: string
  }>
}

const WaitingRoomPage: FunctionComponent<WaitingRoomPageParams> = async ({params}) => {
  const {sessionId} = await params
  const gameSession: GameSessionWithPlayers | null = await getGameSession(sessionId)
  const user: PublicUser | null = await getSessionProfileFromCookie()
  if (!gameSession) return <div>GameSession werdt niet gevonden :(</div>
  const quiz: QuizWithRelations | null = await getQuizById(gameSession.quizId)
  if (!user) return <div>User werd niet gevonden :(</div>
  const ishost = await isUserHostOfSession(user.id, gameSession.id)
  if (!ishost) redirect('/unauthorized')

  if (!quiz) return <div>Quiz werdt niet gevonden :(</div>

  return <HostWaitingRoomClient quiz={quiz} gameSession={gameSession} />
}

export default WaitingRoomPage
