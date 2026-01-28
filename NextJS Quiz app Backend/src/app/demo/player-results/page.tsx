import { PlayerResults } from "@/components/ui/player-results"

export default function DemoPlayerResultsPage() {
  const mockSession = {
    id: "demo-session-1",
    quiz_id: "demo-quiz-1",
    room_code: "AB12CD",
    status: "finished" as const,
    current_question_index: 5,
    started_at: new Date().toISOString(),
    ended_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  }

  const mockPlayerSession = {
    id: "demo-player-1",
    speler_id: "demo-speler-1",
    spelsessie_id: "demo-session-1",
    score: 850,
    joined_at: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <PlayerResults session={mockSession} playerSession={mockPlayerSession} />
    </div>
  )
}
