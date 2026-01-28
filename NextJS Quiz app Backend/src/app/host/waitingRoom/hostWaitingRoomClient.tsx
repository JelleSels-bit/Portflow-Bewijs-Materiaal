'use client'

import {useState, useEffect, type FunctionComponent} from 'react'
import type {QuizWithRelations} from '@/lib/types'
import {Card} from '@/components/ui/card'
import {Play, Users, Copy, Check, Loader2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Badge} from '@/components/ui/badge'
import type {GameSessionWithPlayers} from '@/dal/gameSession' // Importeer je nieuwe type
import {toast} from 'sonner' // Optioneel voor meldingen

interface WaitingRoomClientProps {
  quiz: QuizWithRelations
  gameSession: GameSessionWithPlayers
}

const HostWaitingRoomClient: FunctionComponent<WaitingRoomClientProps> = ({quiz, gameSession}) => {
  const [copied, setCopied] = useState(false)
  const [players, setPlayers] = useState(gameSession.players)
  const [isLoading, setIsLoading] = useState(false)

  // Functie om de code te kopiëren
  const onCopyCode = async () => {
    await navigator.clipboard.writeText(gameSession.roomcode)
    setCopied(true)
    toast.success('Code gekopieerd!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          {/* Quiz Header */}
          <div className="text-center space-y-2">
            <Badge variant="outline" className="mb-2">
              Hosting Mode
            </Badge>
            <h1 className="text-balance text-3xl md:text-4xl font-bold tracking-tight">{quiz.title}</h1>
            {quiz.description && (
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">{quiz.description}</p>
            )}
          </div>

          {/* Room Code Card */}
          <Card className="border-4 border-primary bg-primary/5 p-6 md:p-10 shadow-xl relative overflow-hidden">
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Room Code</p>
                <div className="mt-2 flex items-center gap-4">
                  <p className="font-mono text-6xl md:text-8xl font-black tracking-tighter text-primary">
                    {gameSession.roomcode}
                  </p>
                  <Button variant="ghost" size="icon" onClick={onCopyCode} className="h-12 w-12 hover:bg-primary/10">
                    {copied ? <Check className="h-6 w-6 text-green-500" /> : <Copy className="h-6 w-6" />}
                  </Button>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Deelnemers kunnen joinen via <span className="font-bold text-foreground">/join</span>
              </p>
            </div>
            {/* Subtiel achtergrond patroon */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Users size={120} />
            </div>
          </Card>

          {/* Player List Section */}
          <Card className="p-6 md:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Lobby ({players.length})</h2>
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                Wachten op spelers...
              </Badge>
            </div>

            {players.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed rounded-xl bg-muted/30">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  Zodra spelers de code invullen, verschijnen ze hier.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {players.map(playerSession => (
                  <div
                    key={playerSession.userId}
                    className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-inner">
                      {playerSession.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{playerSession.user.username}</span>
                      <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Verbonden
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Start Game Action */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              size="lg"
              disabled={players.length === 0 || isLoading}
              className="h-16 px-12 text-xl font-bold shadow-lg shadow-primary/20 w-full sm:w-auto transition-transform hover:scale-105 active:scale-95">
              {isLoading ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                <Play className="mr-2 h-6 w-6 fill-current" />
              )}
              Start de Quiz
            </Button>
            <p className="text-xs text-muted-foreground">Je hebt minimaal 1 speler nodig om te kunnen starten.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostWaitingRoomClient
