'use client'

import {Search} from 'lucide-react'
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import type {FunctionComponent} from 'react'

interface CrudSearchHeaderProps {
  title: string
  subtitle?: string
  placeholder?: string
  defaultValue?: string
  inputName?: string // De 'name' property voor FormData
}

const CrudSearchHeader: FunctionComponent<CrudSearchHeaderProps> = ({
  title,
  subtitle = 'Je kan zoeken op naam',
  placeholder = 'Zoeken...',
  defaultValue = '',
  inputName = 'search',
}) => {
  return (
    <section className="border-b border-border bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6 border-2">
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor={inputName} className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  {title}
                </label>

                <p className="text-sm text-muted-foreground">{subtitle}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    id={inputName}
                    name={inputName}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    className="flex-1 text-base"
                  />
                  <Button type="submit" size="lg" className="px-8 font-semibold">
                    <Search className="h-4 w-4 mr-2" />
                    Zoeken
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CrudSearchHeader
