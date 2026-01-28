"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"
// import { getSupabase } from "@/lib/supabase"
import type { Spelsessie, Spelerspelsessie } from "@/lib/types"

interface PlayerJoinProps {
  onJoin: (session: Spelsessie, playerSession: Spelerspelsessie) => void
}

export function PlayerJoin({ onJoin }: PlayerJoinProps) {
  const [roomCode, setRoomCode] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockSession: Spelsessie = {
        id: "demo-session-1",
        quiz_id: "1",
        room_code: roomCode,
        status: "waiting",
        current_question_index: 0,
        created_at: new Date().toISOString(),
        started_at : new Date().toISOString(),
        ended_at: new Date().toISOString(),

      }

      const mockPlayerSession: Spelerspelsessie = {
        id: "demo-player-1",
        speler_id: "player-1",
        spelsessie_id: mockSession.id,
        score: 0,
        joined_at: new Date().toISOString(),
      }

      onJoin(mockSession, mockPlayerSession)

      // Original Supabase code - commented out
      // const supabase = getSupabase()
      // const { data: session } = await supabase.from("spelsessie").select("*").eq("room_code", roomCode).single()
      // const { data: player } = await supabase.from("speler").insert({ name: playerName }).select().single()
      // const { data: playerSession } = await supabase.from("spelerspelsessie").insert({ ... }).select().single()
    } catch (err) {
      console.error("Error joining:", err)
      setError("Er ging iets mis bij het joinen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
      <Card className="w-full max-w-md border-2 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight">Join Quiz</h1>
          <p className="mt-2 text-muted-foreground">Voer de room code in om mee te doen</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomCode">Room Code</Label>
            <Input
              id="roomCode"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="text-center text-2xl font-bold tracking-wider"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="playerName">Je Naam</Label>
            <Input
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="John Doe"
              maxLength={30}
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            <LogIn className="mr-2 h-5 w-5" />
            {loading ? "Bezig met joinen..." : "Join Quiz"}
          </Button>
        </form>
      </Card>
    </div>
  )
}
