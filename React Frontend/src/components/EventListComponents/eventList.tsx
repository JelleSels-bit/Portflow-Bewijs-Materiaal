import type {FunctionComponent, ReactNode} from 'react'
import EventCard from './eventCard.tsx'
import type {IEventCard} from '../../models/IEventCard.ts'

export interface Props {
  data: IEventCard[]
  ShowToastFunction?: () => void
  showDeleteUpdateButton?: boolean
  showAddButton?: boolean
}


const EventList: FunctionComponent<Props> = ({data, ShowToastFunction, showAddButton, showDeleteUpdateButton}) => {

  const output: ReactNode[] = []

  for (const item of data)
  {
      output.push(<EventCard
        key={item.id}
        {...item}
        showSuccesToast={ShowToastFunction}
        showAddButton={showAddButton}
        showDeleteUpdateButton={showDeleteUpdateButton} />)

  }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {output}
    </div>
  )
}

export default EventList