import type {FunctionComponent} from 'react'
import {useState, useRef, useEffect} from 'react'
import {Button, Checkbox, Input} from '@heroui/react'
import {useGetEvents} from '../api/events.ts'
import EventList from '../components/EventListComponents/eventList.tsx'
import {useQueryClient } from '@tanstack/react-query'
import type {QueryClient} from '@tanstack/react-query'
import type {IEventCard} from '../models/IEventCard.ts'
import SuccesToast from '../components/SuccesToast.tsx'
import {useSettingsContext} from '../context/SettingsContext.tsx'
import homePageTranslationData from '../data/homePageTranslationData.ts'



const Home: FunctionComponent = () => {
  const queryClient:QueryClient = useQueryClient()

  const lastQueryKey: string = queryClient.getQueryData<string>(['last-query']) ?? ""
  const [query, setQuery] = useState<string>(lastQueryKey)
  const lastSportTitle: string = queryClient.getQueryData<string>(['last-SportTitle']) ?? ""
  const [sportTitle, setSportTitle] = useState<string>(lastSportTitle)
  const [showAddEventToast,setShowAddEventToast] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredEvents, setFilteredEvents] = useState<IEventCard[]>([])
  const {font, fontSize} = useSettingsContext()
  const {language} = useSettingsContext()
  const l = homePageTranslationData[language]
  const [isOnSale,setIsOnSale] = useState<boolean>(false)

  const {data: events = [] } = useGetEvents(query)


  const cardSectionRef = useRef<HTMLDivElement>(null)
  const backToTopRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  queryClient.getQueryCache()
   useEffect(() => {
    if (query !== '' && sportTitle !== '') {
      {
        queryClient.setQueryData(['last-query'], query)
        queryClient.setQueryData(['last-SportTitle'], sportTitle)
      }
      if (cardSectionRef.current) {
        cardSectionRef.current.scrollIntoView({behavior: 'smooth'})
      }

    }
  }, [query, queryClient, sportTitle])

  const searchInputHandler = (value: string, isOnSale: boolean) => {
    setInputValue(value)
    let filtered = events
    filtered = filtered.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))
    if (isOnSale)
      filtered = filtered.filter(x => x.status.toLowerCase() === 'onSale'.toLowerCase())
    setFilteredEvents(filtered)

  }

  const backToTopHandler = () => {
    if (backToTopRef.current)
    backToTopRef.current.scrollIntoView({ behavior: "smooth"})
  }

  const addEventToastHandler = () => {
    setShowAddEventToast(true)
    setTimeout(() => setShowAddEventToast(false), 2500)
  }



  return (
    <main ref={backToTopRef} className={`font-${font} text-${fontSize} light`}>
      <Button
        onPress={backToTopHandler}
        className="fixed bottom-4 right-4 z-50 mr-40 bg-black text-red-500 hover:bg-red-500 hover:text-black">
        {' '}
        ↑ Back Top
      </Button>
      <div
        className={`min-h-screen text-${fontSize} bg-gray-900 text-white flex flex-col items-center justify-center p-6 `}>
        <h1 className="text-4xl font-bold mb-4 text-red-500 text-center">{l.title}</h1>
        <p className="text-center max-w-xl mb-8 text-gray-300">{l.body}</p>

        <div ref={buttonsRef} className="flex sticky flex-col sm:flex-row gap-4 text-${fontSize}">
          <Button
            onPress={() => {
              setQuery('&segmentName=Sports&keyword=NHL&size=175&page=0')
              setSportTitle('NHL')
            }}
            className={`bg-black text-${fontSize} font-${font} text-red-500 hover:bg-red-500 hover:text-white transition-colors w-56`}>
            NHL
          </Button>
          <Button
            onPress={() => {
              setQuery('&segmentName=Sports&keyword=NFL&size=175&page=0')
              setSportTitle('NFL')
            }}
            className={`bg-black text-${fontSize} font-${font} text-red-500 hover:bg-red-500 hover:text-white transition-colors w-56 `}>
            NFL
          </Button>
          <Button
            onPress={() => {
              //
              setQuery('&segmentName=Sports&keyword=NBL&size=100&page=0  ')
              setSportTitle('NBL')
            }}
            className={`bg-black text-${fontSize} font-${font} text-red-500 hover:bg-red-500 hover:text-white transition-colors w-56`}>
            NBL
          </Button>
        </div>
      </div>
      <div ref={cardSectionRef}> </div>
      <div className="mt-20">
        {query !== '' && (
          <>
            <h1 className={`text-3xl font-${font} font-bold text-center text-red-500 mt-6`}>{sportTitle}:</h1>
            <h2 className="w-full max-w-xl mx-auto text-center px-3 py-2">{l.searchField}</h2>
            <Input
              value={inputValue}
              onChange={e => searchInputHandler(e.target.value, isOnSale)}
              placeholder="Search for a team..."
              className={`text-${fontSize} font-${font} w-full mx-auto max-w-xl px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400`}
            />
            <Checkbox
              className="flex justify-center items-center mx-auto mt-4"
              isSelected={isOnSale}
              onValueChange={(checked: boolean) => {
                setIsOnSale(checked)
                searchInputHandler(inputValue, checked)
              }}>
              Onsale
            </Checkbox>
            <EventList
              showAddButton={true}
              data={inputValue || isOnSale ? filteredEvents : events}
              ShowToastFunction={addEventToastHandler}
            />
          </>
        )}
      </div>

      <div>{showAddEventToast && <SuccesToast />}</div>
    </main>
  )
}

export default Home;






