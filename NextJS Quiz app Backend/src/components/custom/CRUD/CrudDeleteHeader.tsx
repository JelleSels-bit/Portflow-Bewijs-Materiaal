import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {AlertTriangle, ArrowLeft} from 'lucide-react'
import type {ComponentProps, FunctionComponent} from 'react'

interface CrudPutHeaderProps {
  name: string
  returnLink: ComponentProps<typeof Link>['href']
}

const CrudDeleteHeader: FunctionComponent<CrudPutHeaderProps> = ({name, returnLink}) => {
  return (
    <section className="border-b border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link href={returnLink}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug naar overzicht
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-destructive/10 w-14 h-14 flex items-center justify-center">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">{name} verwijderen</h1>
              <p className="text-lg text-muted-foreground mt-1">Deze actie kan niet ongedaan gemaakt worden</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrudDeleteHeader
