'use client'

import {type ComponentProps, type FunctionComponent} from 'react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {ArrowLeft, Tag} from 'lucide-react'

interface CrudPutHeaderProps {
  name: string
  returnLink: ComponentProps<typeof Link>['href']
}

const CrudCreateHeader: FunctionComponent<CrudPutHeaderProps> = ({name, returnLink}) => {
  return (
    <section className="border-b border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link href={returnLink}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar overzicht
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-700/10 w-14 h-14 flex items-center justify-center">
              <Tag className="h-7 w-7 text-green-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{name} Creëren</h1>
              <p className="text-lg text-muted-foreground mt-1">Vul de gegevens in</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrudCreateHeader
