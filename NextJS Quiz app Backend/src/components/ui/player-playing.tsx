"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Check } from "lucide-react"
import { Confetti } from "@/components/ui/confetti"
// import { getSupabase } from "@/lib/supabase"
import type { Spelsessie, Spelerspelsessie, Vraag, Antwoord } from "@/lib/types"

interface PlayerPlayingProps {
  session: Spelsessie
  playerSession: Spelerspelsessie
}

export function PlayerPlaying({ session, playerSession }: PlayerPlayingProps) {
  const [currentQuestion, setCurrentQuestion] = useState<(Vraag & { antwoord: Antwoord[] }) | null>({
    id: "1",
    quiz_id: session.quiz_id,
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
  })
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [shake, setShake] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    if (currentQuestion && !hasAnswered) {
      const startTime = Date.now()

      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        const remaining = currentQuestion.time_limit - elapsed

        if (remaining <= 0) {
          clearInterval(interval)
          setTimeLeft(0)
        } else {
          setTimeLeft(remaining)
        }
      }, 100)

      return () => clearInterval(interval)
    }
  }, [currentQuestion, hasAnswered])

  const submitAnswer = async (answerId: string) => {
    if (hasAnswered || !currentQuestion) return

    setSelectedAnswer(answerId)
    setHasAnswered(true)

    const selectedAnswerData = currentQuestion.antwoord.find((a) => a.id === answerId)
    if (selectedAnswerData?.is_correct) {
      const speedBonus = Math.floor((timeLeft / currentQuestion.time_limit) * 50)
      const points = 100 + speedBonus
      setScore((prev) => prev + points)
      setIsCorrect(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
      console.log("[v0] Correct answer! Score:", score + points)
    } else {
      setIsCorrect(false)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      console.log("[v0] Wrong answer")
    }
  }

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Laden...</p>
      </div>
    )
  }

  const sortedAnswers = [...currentQuestion.antwoord].sort((a, b) => a.order_number - b.order_number)
  const progressPercent = ((session.current_question_index + 1) / 10) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <Confetti active={showConfetti} />

      <div className="container mx-auto max-w-3xl px-4 py-6 md:py-8">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="rounded-lg bg-primary px-3 py-1.5 md:px-4 md:py-2 text-primary-foreground">
              <span className="text-base md:text-lg font-bold">Score: {score}</span>
            </div>
            {!hasAnswered && (
              <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
                <Clock className="h-5 w-5 md:h-6 md:w-6" />
                {timeLeft}s
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Vraag {session.current_question_index + 1} van 10</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {!hasAnswered && <Progress value={(timeLeft / currentQuestion.time_limit) * 100} className="h-2" />}

          <Card className={`border-2 p-4 md:p-6 transition-all ${shake ? "animate-shake" : ""}`}>
            <h2 className="text-balance text-center text-xl md:text-2xl font-bold">{currentQuestion.question_text}</h2>
          </Card>

          {hasAnswered && (
            <div
              className={`rounded-lg border p-3 md:p-4 text-center ${
                isCorrect ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Check className={`h-5 w-5 ${isCorrect ? "text-green-500" : "text-red-500"}`} />
                <p className={`text-sm md:text-base font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                  {isCorrect ? "Correct! 🎉" : "Helaas, fout antwoord"}
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-3 md:gap-4">
            {sortedAnswers.map((answer, index) => {
              const isSelected = selectedAnswer === answer.id
              const letterLabels = ["A", "B", "C", "D"]

              return (
                <Button
                  key={answer.id}
                  onClick={() => submitAnswer(answer.id)}
                  disabled={hasAnswered || timeLeft === 0}
                  variant={isSelected ? "default" : "outline"}
                  size="lg"
                  className={`h-auto min-h-[70px] md:min-h-[80px] w-full justify-start gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 text-left ${
                    isSelected ? "border-4 border-accent" : "border-2"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg text-xl md:text-2xl font-bold ${
                      isSelected ? "bg-accent-foreground text-accent" : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {letterLabels[index]}
                  </div>
                  <span className="text-base md:text-lg font-medium leading-relaxed">{answer.answer_text}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
