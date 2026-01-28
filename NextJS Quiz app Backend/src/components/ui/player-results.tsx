"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"
// import { getSupabase } from "@/lib/supabase"
import type { Spelsessie, Spelerspelsessie } from "@/lib/types"
import Link from "next/link"

interface PlayerResultsProps {
  session: Spelsessie
  playerSession: Spelerspelsessie
}

export function PlayerResults({ session, playerSession }: PlayerResultsProps) {
  const [finalScore, setFinalScore] = useState(0)
  const [rank, setRank] = useState(0)
  const [totalPlayers, setTotalPlayers] = useState(0)

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    // Mock final score
    const mockScore = 450
    setFinalScore(mockScore)

    // Mock players data
    const mockTotalPlayers = 6
    const mockRank = 2

    setTotalPlayers(mockTotalPlayers)
    setRank(mockRank)

  }

  const getRankMessage = () => {
    if (rank === 1) return "Je hebt gewonnen!"
    if (rank === 2) return "Tweede plaats!"
    if (rank === 3) return "Derde plaats!"
    return `Je eindigde ${rank}e`
  }

  const getRankColor = () => {
    if (rank === 1) return "text-accent"
    if (rank <= 3) return "text-primary"
    return "text-foreground"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <Card className="w-full max-w-md border-2 p-8">
        <div className="space-y-6 text-center">
          <div>
            <Trophy className={`mx-auto h-20 w-20 ${rank <= 3 ? "text-accent" : "text-muted-foreground"}`} />
          </div>

          <div>
            <h1 className={`text-balance text-4xl font-bold tracking-tight ${getRankColor()}`}>{getRankMessage()}</h1>
            <p className="mt-2 text-muted-foreground">
              {rank} van {totalPlayers} spelers
            </p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-6">
            <p className="text-sm text-muted-foreground">Je Score</p>
            <p className="text-5xl font-bold text-primary">{finalScore}</p>
          </div>

          <div className="space-y-3 pt-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/join">Speel Opnieuw</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full bg-transparent">
              <Link href="/">Terug naar Home</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
