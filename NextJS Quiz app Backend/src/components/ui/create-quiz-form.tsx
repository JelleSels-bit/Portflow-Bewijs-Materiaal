'use client'

import type React from 'react'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {Plus, X, Check} from 'lucide-react'

interface Question {
  question_text: string
  time_limit: number
  answers: {
    answer_text: string
    is_correct: boolean
  }[]
}

export function CreateQuizForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    {
      question_text: '',
      time_limit: 20,
      answers: [
        {answer_text: '', is_correct: true},
        {answer_text: '', is_correct: false},
        {answer_text: '', is_correct: false},
        {answer_text: '', is_correct: false},
      ],
    },
  ])
  const [loading, setLoading] = useState(false)

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question_text: '',
        time_limit: 20,
        answers: [
          {answer_text: '', is_correct: true},
          {answer_text: '', is_correct: false},
          {answer_text: '', is_correct: false},
          {answer_text: '', is_correct: false},
        ],
      },
    ])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = {...newQuestions[index], [field]: value}
    setQuestions(newQuestions)
  }

  const updateAnswer = (
    questionIndex: number,
    answerIndex: number,
    field: 'answer_text' | 'is_correct',
    value: any,
  ) => {
    const newQuestions = [...questions]
    const newAnswers = [...newQuestions[questionIndex].answers]

    if (field === 'is_correct' && value) {
      // Only one correct answer allowed
      newAnswers.forEach((a, i) => {
        a.is_correct = i === answerIndex
      })
    } else {
      newAnswers[answerIndex] = {...newAnswers[answerIndex], [field]: value}
    }

    newQuestions[questionIndex].answers = newAnswers
    setQuestions(newQuestions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate saving delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Instead of saving to database, redirect to demo host [sessionId]
      router.push('/demo/host-waiting')

      // Original database code - commented out
      // const supabase = getSupabase()
      // const { data: quiz, error: quizError } = await supabase
      //   .from("quiz")
      //   .insert({ title, description })
      //   .select()
      //   .single()
      // if (quizError) throw quizError
      // ... rest of database logic
    } catch (error) {
      console.error('Error creating quiz:', error)
      alert('Er ging iets mis bij het aanmaken van de quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      {/* Quiz Info */}
      <Card className="p-4 md:p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Titel</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Algemene Kennis Quiz"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Beschrijving (optioneel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Een leuke quiz om je kennis te testen"
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold">Vragen</h2>
          <Button
            type="button"
            onClick={addQuestion}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto bg-transparent">
            <Plus className="mr-2 h-4 w-4" />
            Vraag Toevoegen
          </Button>
        </div>

        {questions.map((question, qIndex) => (
          <Card key={qIndex} className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold">Vraag {qIndex + 1}</h3>
                {questions.length > 1 && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(qIndex)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>Vraag</Label>
                <Input
                  value={question.question_text}
                  onChange={e => updateQuestion(qIndex, 'question_text', e.target.value)}
                  placeholder="Wat is de hoofdstad van Nederland?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Tijd (seconden)</Label>
                <Input
                  type="number"
                  min="5"
                  max="60"
                  value={question.time_limit}
                  onChange={e => updateQuestion(qIndex, 'time_limit', Number.parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Antwoorden</Label>
                {question.answers.map((answer, aIndex) => (
                  <div key={aIndex} className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={answer.is_correct ? 'default' : 'outline'}
                      size="icon"
                      className="shrink-0 h-9 w-9 md:h-10 md:w-10"
                      onClick={() => updateAnswer(qIndex, aIndex, 'is_correct', true)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Input
                      value={answer.answer_text}
                      onChange={e => updateAnswer(qIndex, aIndex, 'answer_text', e.target.value)}
                      placeholder={`Antwoord ${aIndex + 1}`}
                      required
                      className="text-sm md:text-base"
                    />
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Klik op het vinkje om het juiste antwoord te markeren</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Bezig met opslaan...' : 'Quiz Opslaan'}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => router.push('/')} className="w-full sm:w-auto">
          Annuleren
        </Button>
      </div>
    </form>
  )
}
