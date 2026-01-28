import { HostResults } from "@/components/ui/host-results"

export default function DemoHostResultsPage() {
  const mockSession = {
    id: "demo-session-1",
    quiz_id: "demo-quiz-1",
    room_code: "AB12CD",
    status: "finished" as const,
    current_question_index: 5, // Fixed field name to match Spelsessie type
    started_at: new Date().toISOString(),
    ended_at: new Date().toISOString(),
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
      <HostResults session={mockSession} quiz={mockQuiz} />
    </div>
  )
}
