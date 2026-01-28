import { HostPlaying } from "@/components/ui/host-playing"

export default function DemoHostPlayingPage() {
  const mockSession = {
    id: "demo-session-1",
    quiz_id: "demo-quiz-1",
    room_code: "AB12CD",
    status: "playing" as const,
    current_question_index: 1, // Fixed field name to match Spelsessie type
    started_at: new Date().toISOString(),
    ended_at: null,
    created_at: new Date().toISOString(),
  }

  const mockQuiz = {
    id: "demo-quiz-1",
    title: "Algemene Kennis Quiz",
    description: "Test je kennis!",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <HostPlaying session={mockSession} quiz={mockQuiz} />
    </div>
  )
}
