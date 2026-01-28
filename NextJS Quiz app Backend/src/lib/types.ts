import {type Prisma} from '@/generated/prisma/client'


export type QuizWithRelations = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        themes: {
          include: { theme: true }
        }
      }
    }
    themes: {
      include: { theme: true }
    }
  }
}>

export interface Quiz {
  id: string
  title: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Vraag {
  id: string
  quiz_id: string
  question_text: string
  order_number: number
  time_limit: number
  created_at: string
}

export interface Antwoord {
  id: string
  vraag_id: string
  answer_text: string
  is_correct: boolean
  order_number: number
  created_at: string
}

export interface Spelsessie {
  id: string
  quiz_id: string
  room_code: string
  status: "waiting" | "playing" | "finished"
  current_question_index: number
  started_at: string | null
  ended_at: string | null
  created_at: string
}

export interface Speler {
  id: string
  name: string
  created_at: string
}

export interface Spelerspelsessie {
  id: string
  speler_id: string
  spelsessie_id: string
  score: number
  joined_at: string
  speler?: Speler
}

export interface PlayerAnswer {
  id: string
  spelerspelsessie_id: string
  vraag_id: string
  antwoord_id: string | null
  answered_at: string
  time_taken: number
}



