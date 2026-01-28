"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
// import { getSupabase } from "@/lib/supabase"
import type { Spelsessie, Spelerspelsessie } from "@/lib/types"

interface PlayerWaitingProps {
  session: Spelsessie
  playerSession: Spelerspelsessie
}

export function PlayerWaiting({ session, playerSession }: PlayerWaitingProps) {
  const [playerCount, setPlayerCount] = useState(3)

  useEffect(() => {
    // Mock player count that increments
    const interval = setInterval(() => {
      setPlayerCount((prev) => Math.min(prev + 1, 8))
    }, 3000)

    return () => {
      clearInterval(interval)
    }

    /* Original Supabase code:
    loadPlayerCount()

    const supabase = getSupabase()
    const channel = supabase
      .channel(`session-players-${session.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "spelerspelsessie",
          filter: `spelsessie_id=eq.${session.id}`,
        },
        () => {
          loadPlayerCount()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    */
  }, [session.id])

  /* Original Supabase function:
  const loadPlayerCount = async () => {
    const supabase = getSupabase()
    const { count } = await supabase
      .from("spelerspelsessie")
      .select("*", { count: "exact", head: true })
      .eq("spelsessie_id", session.id)

    if (count !== null) {
      setPlayerCount(count)
    }
  }
  */

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 px-4">
      <Card className="w-full max-w-md border-2 p-12">
        <div className="space-y-8 text-center">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight">Je bent binnen!</h1>
            <p className="mt-2 text-muted-foreground">Wachten tot de host de quiz start...</p>
          </div>

          <div className="flex justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Room Code</p>
            <p className="font-mono text-4xl font-bold tracking-wider text-primary">{session.room_code}</p>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Spelers wachtend</p>
            <p className="text-3xl font-bold text-foreground">{playerCount}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
