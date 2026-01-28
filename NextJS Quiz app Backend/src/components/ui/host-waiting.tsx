"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, Users, Play, CheckCircle } from "lucide-react"
import { PlayersSkeleton } from "@/components/ui/skeleton-loader"
// import { getSupabase } from "@/lib/supabase"
import type { Quiz, Spelsessie, Spelerspelsessie } from "@/lib/types"

interface HostWaitingProps {
  session: Spelsessie
  quiz: Quiz
  onCopyCode: () => void
  copied: boolean
}

export function HostWaiting({ session, quiz, onCopyCode, copied }: HostWaitingProps) {
  const [players, setPlayers] = useState<Spelerspelsessie[]>([
    {
      id: "1",
      spelsessie_id: session.id,
      speler_id: "1",
      score: 0,
      joined_at: new Date().toISOString(),
      speler: { id: "1", name: "Alice", created_at: new Date().toISOString() },
    },
    {
      id: "2",
      spelsessie_id: session.id,
      speler_id: "2",
      score: 0,
      joined_at: new Date().toISOString(),
      speler: { id: "2", name: "Bob", created_at: new Date().toISOString() },
    },
    {
      id: "3",
      spelsessie_id: session.id,
      speler_id: "3",
      score: 0,
      joined_at: new Date().toISOString(),
      speler: { id: "3", name: "Charlie", created_at: new Date().toISOString() },
    },
  ])
  const [loading, setLoading] = useState(true)
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)

    /* Original Supabase code:
    loadPlayers()
    const supabase = getSupabase()
    ...
    */
  }, [session.id])

  const toggleReady = (playerId: string) => {
    setReadyPlayers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(playerId)) {
        newSet.delete(playerId)
      } else {
        newSet.add(playerId)
      }
      return newSet
    })
  }

  const startGame = () => {
    if (players.length === 0) {
      alert("Er zijn nog geen spelers!")
      return
    }

    console.log("[v0] Starting game (mock)")
    alert("Game starten (mock mode)")
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          {/* Quiz Title */}
          <div className="text-center">
            <h1 className="text-balance text-3xl md:text-4xl font-bold tracking-tight">{quiz.title}</h1>
            {quiz.description && <p className="mt-2 text-sm md:text-base text-muted-foreground">{quiz.description}</p>}
          </div>

          <Card className="border-4 border-primary bg-primary/5 p-6 md:p-8 animate-pulse-slow">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Room Code</p>
                <div className="mt-2 flex items-center gap-2 md:gap-3">
                  <p className="font-mono text-5xl md:text-7xl font-bold tracking-widest text-primary animate-bounce-slow">
                    {session.room_code}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onCopyCode}
                    className="h-10 w-10 md:h-12 md:w-12 bg-transparent"
                  >
                    {copied ? <Check className="h-5 w-5 md:h-6 md:w-6" /> : <Copy className="h-5 w-5 md:h-6 md:w-6" />}
                  </Button>
                </div>
              </div>
              <p className="text-center text-xs md:text-sm text-muted-foreground px-4">
                Spelers kunnen joinen op <span className="font-semibold">/join</span> met deze code
              </p>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Spelers ({players.length})</h2>
              </div>
              <div className="text-sm text-muted-foreground">
                {readyPlayers.size} / {players.length} klaar
              </div>
            </div>

            {loading ? (
              <PlayersSkeleton />
            ) : players.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Wachten op spelers...</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {players.map((player, index) => {
                  const isReady = readyPlayers.has(player.id)
                  return (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between gap-3 rounded-lg border p-4 transition-all ${
                        isReady ? "border-green-500 bg-green-500/10" : "bg-card hover:bg-accent/5"
                      }`}
                      onClick={() => toggleReady(player.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold ${getAvatarColor(
                            index,
                          )}`}
                        >
                          {player.speler?.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{player.speler?.name}</span>
                      </div>
                      {isReady && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

          {/* Start Game Button */}
          <div className="flex justify-center px-4">
            <Button
              size="lg"
              onClick={startGame}
              disabled={players.length === 0 || loading}
              className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg w-full sm:w-auto"
            >
              <Play className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
