'use client'

import { HostWaiting } from "@/components/ui/host-waiting"

export default function DemoHostWaitingPage() {
  const mockSession = {
    id: "demo-session-1",
    quiz_id: "demo-quiz-1",
    room_code: "AB12CD",
    status: "waiting" as const,
    current_question_index: 0, // Fixed field name to match Spelsessie type
    started_at: null,
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
      <HostWaiting session={mockSession} quiz={mockQuiz} onCopyCode={() => {}} copied={false} />
    </div>
  )
}
