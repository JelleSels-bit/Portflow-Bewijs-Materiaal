'use client'

import type {FunctionComponent} from 'react'
import type {Theme} from '@/generated/prisma/client'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {BookOpen, Pen, Tag, Trash2} from 'lucide-react'
import {Card} from '@/components/ui/card'
import CrudEmptyList from '@/components/custom/CRUD/CrudEmptyList'

interface ThemesListProps {
  themes: Theme[]
}

const ThemesList: FunctionComponent<ThemesListProps> = ({themes}) => {
  if (themes.length === 0) {
    return <CrudEmptyList subject="Thema's" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Themes List */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid gap-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-4 justify-self-start bg-green-400 hover:bg-green-400"
            asChild>
            <Link href="/themeCRUD/create/ThemeCreate">Nieuw</Link>
          </Button>
          {themes.map(theme => (
            <Card key={theme.id} className="p-6 border-2 hover:border-primary transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-all flex-shrink-0">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>

                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-foreground">{theme.name}</h3>
                    </div>

                    {theme.description && (
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <BookOpen className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span className="text-sm line-clamp-2">{theme.description}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/themeCRUD/put/${theme.id}`}>
                      <Pen className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" className="text-destructive " asChild>
                    <Link href={`/themeCRUD/delete/${theme.id}`}>
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

export default ThemesList
