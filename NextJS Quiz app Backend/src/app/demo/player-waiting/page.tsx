import { PlayerWaiting } from "@/components/ui/player-waiting"

export default function DemoPlayerWaitingPage() {
  const mockSession = {
    id: "demo-session-1",
    quiz_id: "demo-quiz-1",
    room_code: "AB12CD",
    status: "waiting" as const,
    current_question_index: 0,
    started_at: null,
    ended_at: null,
    created_at: new Date().toISOString(),
  }

  const mockPlayerSession = {
    id: "demo-player-1",
    speler_id: "demo-speler-1",
    spelsessie_id: "demo-session-1",
    score: 0,
    joined_at: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <PlayerWaiting session={mockSession} playerSession={mockPlayerSession} />
    </div>
  )
}
