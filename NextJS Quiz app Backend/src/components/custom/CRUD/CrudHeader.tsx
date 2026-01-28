import {type FunctionComponent} from 'react'
import {Users} from 'lucide-react'

interface CrudHeaderProps {
  subject: string
}


const CrudHeader: FunctionComponent<CrudHeaderProps> = ({ subject }) => {

  return (
    <>
      {/* Header Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  {subject} Beheren
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Beheer alle {subject} van je quiz platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CrudHeader