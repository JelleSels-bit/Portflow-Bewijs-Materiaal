declare global {
  namespace PrismaJson {
    type AnswerData = {
      id?: string // ID voor React keys.
      answer: string
      isCorrect: boolean
    }[]
  }
}

export {}
