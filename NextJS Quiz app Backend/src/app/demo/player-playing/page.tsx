import { PlayerPlaying } from "@/components/ui/player-playing"

export default function DemoPlayerPlayingPage() {
  const mockSession = {
    id: "demo-session-1",
    quiz_id: "demo-quiz-1",
    room_code: "AB12CD",
    status: "playing" as const,
    current_question_index: 1,
    started_at: new Date().toISOString(),
    ended_at: null,
    created_at: new Date().toISOString(),
  }

  const mockPlayerSession = {
    id: "demo-player-1",
    speler_id: "demo-speler-1",
    spelsessie_id: "demo-session-1",
    score: 250,
    joined_at: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <PlayerPlaying session={mockSession} playerSession={mockPlayerSession} />
    </div>
  )
}
