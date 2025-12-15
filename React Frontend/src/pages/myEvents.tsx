import type {FunctionComponent, } from 'react'
import type {IEventCard} from '../models/IEventCard.ts'
import {useState} from 'react'
import EventList from '../components/EventListComponents/eventList.tsx'
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import SuccesToast from '../components/SuccesToast.tsx'

const Myevents: FunctionComponent = () => {
  const queryClient = useQueryClient()
  const [showAddEventToast,setShowAddEventToast] = useState<boolean>(false)


  const addEventToastHandler = () => {
    setShowAddEventToast(true)
    setTimeout(() => setShowAddEventToast(false), 2500)
  }

  const getMyEvents = async (): Promise<IEventCard[]> => {
    return Promise.resolve(queryClient.getQueryData<IEventCard[]>(['my-events']) ?? [])
  }
  const {data: myEvents = [] } = useSuspenseQuery({
    queryKey: ['my-events'],
    queryFn: getMyEvents,
  })

  const getUniqueEvents = (sport: string) => {
    return myEvents.filter(x => { return x.sport === sport;})
  }

  return (
    <div className="mt-16 px-6">

      <div  className="mb-12">
        <h2 className="text-2xl font-bold text-red-500 border-b border-red-500 pb-2 mb-4">
          NFL
        </h2>
        <EventList

          ShowToastFunction={addEventToastHandler}
          showDeleteUpdateButton={true}
          data={getUniqueEvents("NFL")}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-red-500 border-b border-red-500 pb-2 mb-4">
          NHL
        </h2>
        <EventList
          ShowToastFunction={addEventToastHandler}
          showDeleteUpdateButton={true}
          data={getUniqueEvents("NHL")}
        />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-red-500 border-b border-red-500 pb-2 mb-4">
          NBL
        </h2>
        <EventList
          ShowToastFunction={addEventToastHandler}
          showDeleteUpdateButton={true}
          data={getUniqueEvents("NBL")}
        />
      </div>

      {showAddEventToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <SuccesToast />
        </div>
      )}
    </div>

  )
}

export default Myevents