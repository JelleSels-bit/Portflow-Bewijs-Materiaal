"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, Users, Clock } from "lucide-react"
// import { getSupabase } from "@/lib/supabase"
import type { Quiz, Spelsessie, Vraag, Antwoord, Spelerspelsessie } from "@/lib/types"

interface HostPlayingProps {
  session: Spelsessie
  quiz: Quiz
}

export function HostPlaying({ session, quiz }: HostPlayingProps) {
  const [questions, setQuestions] = useState<(Vraag & { antwoord: Antwoord[] })[]>([
    {
      id: "1",
      quiz_id: quiz.id,
      question_text: "Wat is de hoofdstad van Nederland?",
      time_limit: 20,
      order_number: 0,
      created_at: new Date().toISOString(),
      antwoord: [
        {
          id: "1a",
          vraag_id: "1",
          answer_text: "Amsterdam",
          is_correct: true,
          order_number: 0,
          created_at: new Date().toISOString(),
        },
        {
          id: "1b",
          vraag_id: "1",
          answer_text: "Rotterdam",
          is_correct: false,
          order_number: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: "1c",
          vraag_id: "1",
          answer_text: "Den Haag",
          is_correct: false,
          order_number: 2,
          created_at: new Date().toISOString(),
        },
        {
          id: "1d",
          vraag_id: "1",
          answer_text: "Utrecht",
          is_correct: false,
          order_number: 3,
          created_at: new Date().toISOString(),
        },
      ],
    },
  ])
  const [currentQuestion, setCurrentQuestion] = useState<(Vraag & { antwoord: Antwoord[] }) | null>(null)
  const [players, setPlayers] = useState<Spelerspelsessie[]>([
    {
      id: "1",
      spelsessie_id: session.id,
      speler_id: "1",
      score: 150,
      joined_at: new Date().toISOString(),
      speler: { id: "1", name: "Alice", created_at: new Date().toISOString() },
    },
    {
      id: "2",
      spelsessie_id: session.id,
      speler_id: "2",
      score: 120,
      joined_at: new Date().toISOString(),
      speler: { id: "2", name: "Bob", created_at: new Date().toISOString() },
    },
    {
      id: "3",
      spelsessie_id: session.id,
      speler_id: "3",
      score: 100,
      joined_at: new Date().toISOString(),
      speler: { id: "3", name: "Charlie", created_at: new Date().toISOString() },
    },
  ])
  const [answeredCount, setAnsweredCount] = useState(2)
  const [timeLeft, setTimeLeft] = useState(15)
  const [showingResults, setShowingResults] = useState(false)

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[0])
    }
  }, [])

  useEffect(() => {
    if (currentQuestion && !showingResults) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            showQuestionResults()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentQuestion, showingResults])

  /* Removed all Supabase useEffect subscriptions */

  const showQuestionResults = () => {
    setShowingResults(true)
  }

  const nextQuestion = async () => {
    console.log("[v0] Next question (mock)")
    alert("Volgende vraag (mock mode)")
  }

  const finishGame = async () => {
    console.log("[v0] Finish game (mock)")
    alert("Game eindigen (mock mode)")
  }

  const progressPercent = ((session.current_question_index + 1) / questions.length) * 100

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Laden...</p>
      </div>
    )
  }

  const correctAnswer = currentQuestion.antwoord.find((a) => a.is_correct)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto max-w-6xl px-4 py-6 md:py-12">
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="rounded-lg bg-primary px-3 py-1.5 md:px-4 md:py-2 text-primary-foreground">
                <span className="text-base md:text-lg font-bold">
                  Vraag {session.current_question_index + 1} / {questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                <Users className="h-4 w-4 md:h-5 md:w-5" />
                <span>
                  {answeredCount} / {players.length} beantwoord
                </span>
              </div>
            </div>
            {!showingResults && (
              <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
                <Clock className="h-5 w-5 md:h-6 md:w-6" />
                {timeLeft}s
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Timer Progress */}
          {!showingResults && <Progress value={(timeLeft / currentQuestion.time_limit) * 100} className="h-2" />}

          <Card className="border-4 p-6 md:p-8">
            <h2 className="text-balance text-center text-2xl md:text-3xl font-bold">{currentQuestion.question_text}</h2>
          </Card>

          <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
            {currentQuestion.antwoord
              .sort((a, b) => a.order_number - b.order_number)
              .map((answer, index) => (
                <Card
                  key={answer.id}
                  className={`border-2 p-4 md:p-6 transition-all ${
                    showingResults
                      ? answer.is_correct
                        ? "border-green-500 bg-green-500/10"
                        : "border-muted bg-muted/20 opacity-60"
                      : "border-muted"
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className={`flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg text-lg md:text-xl font-bold ${
                        showingResults && answer.is_correct
                          ? "bg-green-500 text-white"
                          : "bg-accent text-accent-foreground"
                      }`}
                    >
                      {["A", "B", "C", "D"][index]}
                    </div>
                    <p className="text-base md:text-lg font-medium">{answer.answer_text}</p>
                  </div>
                </Card>
              ))}
          </div>

          {/* Next Button */}
          {showingResults && (
            <div className="flex justify-center pt-4">
              <Button
                size="lg"
                onClick={nextQuestion}
                className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg w-full sm:w-auto"
              >
                {session.current_question_index + 1 < questions.length ? (
                  <>
                    Volgende Vraag
                    <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </>
                ) : (
                  "Toon Resultaten"
                )}
              </Button>
            </div>
          )}

          <Card className="p-4 md:p-6">
            <h3 className="mb-4 text-lg md:text-xl font-bold">Scorebord</h3>
            <div className="space-y-2">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded-lg border bg-card p-2.5 md:p-3"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-base md:text-lg font-bold text-muted-foreground">{index + 1}.</span>
                    <span className="text-sm md:text-base font-medium">{player.speler?.name}</span>
                  </div>
                  <span className="text-lg md:text-xl font-bold text-primary">{player.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
