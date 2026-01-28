'use client'

import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Trophy, Medal, Award} from 'lucide-react'
import {Confetti} from '@/components/ui/confetti'
import type {Quiz, Spelsessie, Spelerspelsessie} from '@/lib/types'
import Link from 'next/link'

interface HostResultsProps {
  session: Spelsessie
  quiz: Quiz
}

export function HostResults({session, quiz}: HostResultsProps) {
  const [players, setPlayers] = useState<Spelerspelsessie[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const loadPlayers = () => {
    const mockPlayers: Spelerspelsessie[] = [
      {
        id: '1',
        spelsessie_id: session.id,
        speler_id: 'p1',
        score: 580,
        joined_at: new Date().toISOString(),
        speler: {id: 'p1', name: 'Sarah', created_at: new Date().toISOString()},
      },
      {
        id: '2',
        spelsessie_id: session.id,
        speler_id: 'p2',
        score: 450,
        joined_at: new Date().toISOString(),
        speler: {id: 'p2', name: 'Mike', created_at: new Date().toISOString()},
      },
      {
        id: '3',
        spelsessie_id: session.id,
        speler_id: 'p3',
        score: 320,
        joined_at: new Date().toISOString(),
        speler: {id: 'p3', name: 'Emma', created_at: new Date().toISOString()},
      },
      {
        id: '4',
        spelsessie_id: session.id,
        speler_id: 'p4',
        score: 290,
        joined_at: new Date().toISOString(),
        speler: {id: 'p4', name: 'Tom', created_at: new Date().toISOString()},
      },
    ]

    setPlayers(mockPlayers)

    setTimeout(() => {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }, 500)
  }

  useEffect(() => {
    loadPlayers()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Confetti active={showConfetti} />

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight">Quiz Afgelopen!</h1>
            <p className="mt-2 text-muted-foreground">{quiz.title}</p>
          </div>

          {/* Top 3 Podium */}
          {players.length > 0 && (
            <div className="flex items-end justify-center gap-4">
              {/* 2nd Place */}
              {players[1] && (
                <Card className="w-32 border-2 border-muted p-4 text-center">
                  <Medal className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-lg font-bold">2e</p>
                  <p className="truncate text-sm font-medium">{players[1].speler?.name}</p>
                  <p className="mt-1 text-xl font-bold text-primary">{players[1].score}</p>
                </Card>
              )}

              {/* 1st Place */}
              {players[0] && (
                <Card className="w-36 border-4 border-accent bg-accent/10 p-6 text-center">
                  <Trophy className="mx-auto mb-2 h-12 w-12 text-accent" />
                  <p className="text-2xl font-bold">1e</p>
                  <p className="truncate font-bold">{players[0].speler?.name}</p>
                  <p className="mt-2 text-2xl font-bold text-accent">{players[0].score}</p>
                </Card>
              )}

              {/* 3rd Place */}
              {players[2] && (
                <Card className="w-32 border-2 border-muted p-4 text-center">
                  <Award className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-lg font-bold">3e</p>
                  <p className="truncate text-sm font-medium">{players[2].speler?.name}</p>
                  <p className="mt-1 text-xl font-bold text-primary">{players[2].score}</p>
                </Card>
              )}
            </div>
          )}

          {/* Full Leaderboard */}
          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-bold">Eindstand</h2>
            <div className="space-y-2">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    index === 0 ? 'border-accent bg-accent/5' : 'bg-card'
                  }`}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-muted-foreground">{index + 1}.</span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                      {player.speler?.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-lg font-medium">{player.speler?.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{player.score}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/">Terug naar Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
