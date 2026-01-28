import {FunctionComponent} from 'react'
import {FileQuestion} from 'lucide-react'
import {Card} from '@/components/ui/card'

interface CrudEmptyListProps {
  subject: string
}

const CrudEmptyList: FunctionComponent<CrudEmptyListProps> = ({subject}) => {
  return (
    <Card className="p-12 border-2 border-dashed text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileQuestion className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Geen {subject} gevonden</h3>
      <p className="text-muted-foreground">Probeer een andere zoekopdracht</p>
    </Card>
  )
}

export default CrudEmptyList
