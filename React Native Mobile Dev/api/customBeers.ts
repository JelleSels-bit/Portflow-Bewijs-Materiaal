import {BeerSource} from '@/model/apiBeer'
import {documentData, getCollectionRef, getDataFromQuerySnapshot, getDocumentRef} from '@/api/fireStoreUtils'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import useUser from '@/hooks/useUser'
import {getCurrentUser} from '@/api/auth'
import {BeerCategory, IcustomBeer} from '@/model/customBeer'

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetCustomBeersByUser = (): UseQueryResult<IcustomBeer[], Error> => {
  const user = useUser()

  return useQuery({
    queryKey: ['customBeersByUser', user?.uid],
    queryFn: () => getCustomBeersByUser(user?.uid),
    enabled: !!user?.uid,
  })
}

export const useGetCustomBeerById = (beerId: string): UseQueryResult<IcustomBeer, Error> => {
  return useQuery({
    queryKey: ['customBeerById', beerId],
    queryFn: () => getCustomBeerById(beerId),
  })
}

export const useAddCustomBeer = (): UseMutationResult<IcustomBeer, Error, addCustomBeerParam, void> => {
  const queryClient = useQueryClient()
  const user = useUser()

  return useMutation({
    mutationFn: addCustomBeer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['customBeersByUser', user?.uid]})
    },
  })
}

export const useDeleteCustomBeer = (): UseMutationResult<void, Error, DeleteCustomBeerParams, void> => {
  const queryClient = useQueryClient()
  const user = useUser()

  return useMutation({
    mutationFn: deleteCustomBeer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['customBeersByUser', user?.uid]})
    },
  })
}

export const useUpdateCustomBeer = (): UseMutationResult<IcustomBeer, Error, UpdateCustomBeerParams, void> => {
  const queryClient = useQueryClient()
  const user = useUser()
  return useMutation({
    mutationFn: updateCustomBeer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['customBeersByUser', user?.uid]})
    },
  })
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

const getCustomBeersByUser = async (userId: string | undefined): Promise<IcustomBeer[]> => {
  const querySnapshot = await getCollectionRef<IcustomBeer>('customBeers')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()
  return getDataFromQuerySnapshot(querySnapshot, 'id')
}

const getCustomBeerById = async (beerId: string): Promise<IcustomBeer> => {
  const beer = await documentData<IcustomBeer>('customBeers', beerId, 'id')

  if (!beer) {
    throw new Error('Could not find custom beer')
  }

  return beer
}

interface addCustomBeerParam {
  name: string
  brewery: string
  alcohol: string
  category?: BeerCategory
  description: string
}

const addCustomBeer = async (beerData: addCustomBeerParam): Promise<IcustomBeer> => {
  const user = getCurrentUser()

  if (!user) {
    throw new Error('User not logged in')
  }

  const docRef = await getCollectionRef<IcustomBeer>('customBeers').add({
    ...beerData,
    userId: user.uid,
    createdAt: Date.now(),
    source: BeerSource.DB,
  } as IcustomBeer)

  const beer = await documentData<IcustomBeer>('customBeers', docRef.id, 'id')
  if (!beer) {
    throw new Error('Cant retrieve the newly made beer')
  }

  return beer
}

interface DeleteCustomBeerParams {
  id: string
}

const deleteCustomBeer = async ({id}: DeleteCustomBeerParams): Promise<void> => {
  await getDocumentRef<IcustomBeer>('customBeers', id).delete()
}

interface UpdateCustomBeerParams {
  id: string
  data: {
    name: string
    brewery: string
    alcohol: string
    category: BeerCategory
    description: string
  }
}

const updateCustomBeer = async ({id, data}: UpdateCustomBeerParams): Promise<IcustomBeer> => {
  await getDocumentRef<IcustomBeer>('customBeers', id).update(data)
  const updatedBeer = await documentData<IcustomBeer>('customBeers', id, 'id')
  return updatedBeer as IcustomBeer
}
