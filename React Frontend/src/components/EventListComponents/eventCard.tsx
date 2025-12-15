import type {FunctionComponent} from 'react'
import {useState}  from 'react'
import {Button, Card, CardBody, CardHeader, Image} from '@heroui/react'
import {useAddToMyEvents, useRemoveFromMyEvents} from '../../api/events.ts'
import type {IEventCard} from '../../models/IEventCard.ts'
import {useSettingsContext} from '../../context/SettingsContext.tsx'
import EventCardTranslation from '../../data/EventCardTranslation.ts'

export interface EventCardProps extends IEventCard {
  showSuccesToast?: () => void
  showDeleteUpdateButton?: boolean
  showAddButton?: boolean
}

const EventCard: FunctionComponent<EventCardProps> = (props) => {
  const {language, font} = useSettingsContext()
  const l = EventCardTranslation[language]
  const addEventMutation = useAddToMyEvents()
  const removeEventMutation = useRemoveFromMyEvents()
  const eventToAdd: IEventCard = {
    ...props,
    id: 'optimistic-' + window.crypto.randomUUID(),
  }
  const [isDisabled,setIsDisabled] = useState<boolean>()



  return (
    <Card className="bg-gray-800 border border-gray-700 hover:border-red-500 transition-all shadow-lg hover:shadow-red-500/20 mt-10 light">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4
          className={`font-bold font-${font} text-xl text-red-400 h-14 overflow-hidden font-$\{font} text-$\{fontSize}`}>
          {props.title}
        </h4>

        <div className="w-full flex justify-center mt-2">
          <Image alt={props.title} className="w-full h-48 object-contain" src={props.img} width={300} radius="sm" />
        </div>
      </CardHeader>

      <CardBody className="text-gray-300 space-y-2">
        <p className={`uppercase text-sm text-gray-400 font-${font}`}>
          {l.date} {props.date}
        </p>
        <p className={`text-sm font-${font} `}>
          {l.location} {props.place}
        </p>
        <a href={props.ticket} target="_blank" className={`font-${font}text-red-500 hover:underline`}>
          {l.tickets}
        </a>
        <span className={`text-xs bg-gray-700 px-2 py-1 rounded font-${font}`}>Status: {props.status}</span>

        {props.showAddButton && (
          <Button
            disabled={isDisabled}
            className={`bg-green-400 font-${font} `}
            onPress={() => {
              addEventMutation.mutate(eventToAdd)
              props.showSuccesToast?.()
              setIsDisabled(true)
            }}>
            {l.addEvent}
          </Button>
        )}

        {props.showDeleteUpdateButton && (
          <div>
            <Button
              className={`bg-red-400 w-full font-${font}`}
              onPress={() => {
                removeEventMutation.mutate(props.id)
                props.showSuccesToast?.()
              }}>
              {l.deleteEvent}
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default EventCard