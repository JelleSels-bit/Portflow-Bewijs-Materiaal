"use client"

import { useState, useEffect } from "react"
import type { Spelsessie, Spelerspelsessie } from "@/lib/types"
import { PlayerJoin } from "@/components/ui/player-join"
import { PlayerWaiting } from "@/components/ui/player-waiting"
import { PlayerPlaying } from "@/components/ui/player-playing"
import { PlayerResults } from "@/components/ui/player-results"

export function PlayerGame() {
  const [session, setSession] = useState<Spelsessie | null>(null)
  const [playerSession, setPlayerSession] = useState<Spelerspelsessie | null>(null)

  useEffect(() => {
    if (!session) return

    // Mock function for demo mode
    // Original Supabase code - commented out
    // const supabase = getSupabase()
    // const channel = supabase.channel(`session-status-${session.id}`).subscribe()
    // return () => { supabase.removeChannel(channel) }
  }, [session])

  const loadSession = async () => {
    // Mock function for demo mode
    // Original Supabase code - commented out
    // if (!session) return
    // const supabase = getSupabase()
    // const { data } = await supabase.from("spelsessie").select("*").eq("id", session.id).single()
  }

  if (!session || !playerSession) {
    return (
      <PlayerJoin
        onJoin={(s, ps) => {
          setSession(s)
          setPlayerSession(ps)
        }}
      />
    )
  }

  if (session.status === "waiting") {
    return <PlayerWaiting session={session} playerSession={playerSession} />
  }

  if (session.status === "playing") {
    return <PlayerPlaying session={session} playerSession={playerSession} />
  }

  if (session.status === "finished") {
    return <PlayerResults session={session} playerSession={playerSession} />
  }

  return null
}
