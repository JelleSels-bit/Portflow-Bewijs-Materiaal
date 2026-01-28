'use client'

import {useState, useEffect, type FunctionComponent} from 'react'
import type {QuizWithRelations} from '@/lib/types'
import type {GameSessionWithPlayers} from '@/dal/gameSession'
import {Card} from '@/components/ui/card'
import {Users, Loader2, CheckCircle2} from 'lucide-react'
import {Badge} from '@/components/ui/badge'

interface WaitingRoomClientProps {
  quiz: QuizWithRelations
  gameSession: GameSessionWithPlayers
}

const PlayerWaitingRoomClient: FunctionComponent<WaitingRoomClientProps> = ({quiz, gameSession}) => {
  const [players, setPlayers] = useState(gameSession.players)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                </span>
              </div>
            </div>
            <h1 className="text-balance text-3xl md:text-4xl font-bold tracking-tight">Je bent binnen!</h1>
            <p className="text-base md:text-lg text-muted-foreground">Wachten tot de host de quiz start...</p>
          </div>

          {/* Quiz Info Card */}
          <Card className="p-6 md:p-8 shadow-lg border-2">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <Badge variant="outline" className="mb-2">
                  Quiz Info
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">{quiz.title}</h2>
                {quiz.description && (
                  <p className="text-sm text-muted-foreground max-w-xl mx-auto">{quiz.description}</p>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Room Code:</span>
                  <span className="font-mono text-2xl md:text-3xl font-bold tracking-wider text-primary">
                    {gameSession.roomcode}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Loading Indicator */}
          <div className="flex justify-center py-6">
            <div className="text-center space-y-3">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-sm text-muted-foreground font-medium">De host bereidt de quiz voor...</p>
            </div>
          </div>

          {/* Players List */}
          <Card className="p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Spelers in de lobby</h3>
              </div>
              <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                {players.length}
              </Badge>
            </div>

            {players.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nog geen andere spelers...</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {players.map(playerSession => (
                  <div
                    key={playerSession.userId}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-inner">
                      {playerSession.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{playerSession.user.username}</span>
                      <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Klaar
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Bottom Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">De quiz start automatisch wanneer de host op start drukt</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerWaitingRoomClient
