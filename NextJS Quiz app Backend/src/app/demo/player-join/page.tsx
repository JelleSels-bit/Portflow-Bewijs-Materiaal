'use client'
import { PlayerJoin } from "@/components/ui/player-join"

export default function DemoPlayerJoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <PlayerJoin onJoin={() => {}} />
      </div>
    </div>
  )
}
