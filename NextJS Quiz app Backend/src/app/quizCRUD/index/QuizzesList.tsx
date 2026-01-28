'use client'

import {type FunctionComponent, useState} from 'react'
import {Card} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {FileQuestion, BookOpen, Tag, X, Pen, Trash2, FileSearchCorner} from 'lucide-react'
import Link from 'next/link'
import type {QuizWithRelations} from '@/lib/types'
import CrudEmptyList from '@/components/custom/CRUD/CrudEmptyList'

interface QuizzesListProps {
  initialQuizzes: QuizWithRelations[]
}

export const QuizzesList: FunctionComponent<QuizzesListProps> = ({initialQuizzes}: QuizzesListProps) => {
  const [quizzes] = useState(initialQuizzes)

  if (quizzes.length === 0) {
    return <CrudEmptyList subject="Quizzes" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Quizzes List */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid gap-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-4 justify-self-start bg-green-400 hover:bg-green-400"
            asChild>
            <Link href="/quizCRUD/create/QuizCreate">Nieuw</Link>
          </Button>
          {quizzes.map(quiz => (
            <Card key={quiz.id} className="p-6 border-2 hover:border-primary transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-all flex-shrink-0">
                    <FileQuestion className="h-6 w-6 text-primary" />
                  </div>

                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-foreground">{quiz.title}</h3>
                    </div>

                    {quiz.description && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span className="text-sm line-clamp-2">{quiz.description}</span>
                      </div>
                    )}

                    {quiz.themes && quiz.themes.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        {quiz.themes.map(themeRelation => (
                          <span
                            key={themeRelation.theme.id}
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {themeRelation.theme.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/quizCRUD/put/${quiz.id}`}>
                      <Pen className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" className="text-black hover:text-white bg-transparent" asChild>
                    <Link href={`/quizCRUD/detail/${quiz.id}`}>
                      <FileSearchCorner />
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" className="text-destructive hover: bg-transparent" asChild>
                    <Link href={`/quizCRUD/delete/${quiz.id}`}>
                      <Trash2 className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
