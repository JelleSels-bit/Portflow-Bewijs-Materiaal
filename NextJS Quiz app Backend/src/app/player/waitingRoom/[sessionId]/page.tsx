'use server'

import type {FunctionComponent} from 'react'
import PlayerWaitingRoomClient from '@/app/player/waitingRoom/PlayerWaitingRoomClient'
import {getGameSession} from '@/dal/gameSession'
import {getQuizById} from '@/dal/quiz'
import {notFound} from 'next/navigation'

interface WaitingRoomPageProps {
  params: Promise<{
    sessionId: string
  }>
}

const WaitingRoomPage: FunctionComponent<WaitingRoomPageProps> = async ({params}) => {
  const {sessionId} = await params
  const gameSession = await getGameSession(sessionId)
  if (!gameSession) return <div>gameSession niet gevonden </div>
  const quiz = await getQuizById(gameSession.quizId)
  if (!quiz) return <div>Quiz niet gevonden</div>
  return <PlayerWaitingRoomClient quiz={quiz} gameSession={gameSession} />
}

export default WaitingRoomPage
