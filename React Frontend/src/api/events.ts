import type {UseMutationResult, UseSuspenseQueryResult} from '@tanstack/react-query'
import type {QueryKey, } from '@tanstack/react-query'
import {useMutation, useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import type {IEventCard} from '../models/IEventCard.ts'
import type {ITicketMasterEvent, ITicketMasterResponse} from '../models/ITicketMasterEvent.ts'

interface MutationContext<T> {
  oldData: T | undefined
  queryKey: QueryKey
}

export const useAddToMyEvents = (): UseMutationResult<IEventCard, Error, IEventCard, MutationContext<IEventCard[]>> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addToMyEvents,
    onMutate: async newEvent => {
      const queryKey = ['my-events']
      await queryClient.cancelQueries({queryKey})
      const oldData = queryClient.getQueryData<IEventCard[]>(queryKey) ?? []
      queryClient.setQueryData<Partial<IEventCard>[]>(queryKey, [
        ...(oldData ?? []),
        {...newEvent, id: 'optimistic-' + window.crypto.randomUUID()},
      ])
      return {oldData, queryKey}
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(context.queryKey, context.oldData)
      }
    },
  })
}

const addToMyEvents = async (eventToAdd: IEventCard): Promise<IEventCard> => {
  return Promise.resolve(eventToAdd)
}

export const useGetEvents = (query: string): UseSuspenseQueryResult<IEventCard[], Error> => {
  return useSuspenseQuery({
    queryKey: ['events', query],
    queryFn: () => getEvents(query),
    refetchInterval: 1000 * 60 * 5, // 1 uur
  })
}

const baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=`

const getEvents = async (query: string) => {
  const apiKey = import.meta.env.VITE_TICKET_MASTER_API_KEY as string
  const url = `${baseUrl}${apiKey}${query}`
  await new Promise(resolve => setTimeout(resolve, 500))

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`failed to fetch for events ${query}`)
  }

  //raw json object
  const unMappedData = (await response.json()) as ITicketMasterResponse
  const eventsArray = unMappedData._embedded?.events ?? [] as ITicketMasterEvent[]

  //Omvormen van raw object naar wat ik specifiek nodig heb
  const mappedEvents: IEventCard[] = eventsArray.map(event => ({
    title: event.name,
    img: event.images?.[0].url ?? '',
    date: event.dates?.start?.localDate ?? 'TBA',
    place: event._embedded?.venues?.[0]?.city?.name ?? 'Unknown',
    ticket: event.url ?? '',
    status: event.dates?.status?.code ?? 'Unknown',
    sport: event.classifications?.[0]?.subGenre?.name ?? 'Unknown',
    id: event.id,
  }))

  return mappedEvents.filter((event: IEventCard, index: number, self: IEventCard[]) => index === self.findIndex(e => e.title === event.title))
}

export const useRemoveFromMyEvents = (): UseMutationResult<string, Error, string, MutationContext<IEventCard[]>> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: removeFromMyEvents,
    onMutate: async idToDelete => {
      const queryKey = ['my-events']
      await queryClient.cancelQueries({queryKey})
      const oldData = queryClient.getQueryData<IEventCard[]>(queryKey) ?? []
      queryClient.setQueryData<IEventCard[]>(
        queryKey,
        oldData.filter(event => event.id !== idToDelete),
      )
      return {oldData, queryKey}
    },
    onError: (_, __, context) => {
      if (context?.oldData) {
        queryClient.setQueryData(context.queryKey, context.oldData)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['my-events']})
    },
  })
}

const removeFromMyEvents = async (eventId: string): Promise<string> => {
  return Promise.resolve(eventId)
}
