import {apiBeer, BeerSource} from '@/model/apiBeer'
import {useMutation, UseMutationResult, useQuery, useQueryClient} from '@tanstack/react-query'
import {getCurrentUser} from '@/api/auth'
import {getCollectionRef, getDataFromQuerySnapshot, getDocumentRef} from '@/api/fireStoreUtils'
import {IcustomBeer} from '@/model/customBeer'
import useUser from '@/hooks/useUser'

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetApiBeers = () => {
  return useQuery({
    queryKey: ['apiBeers'],
    queryFn: getApiBeers,
  })
}

export const useToggleFavoriteBeer = (): UseMutationResult<void, Error, FavoriteItem, void> => {
  const user = useUser()

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: toggleBeerFavorite,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['favorites', user?.uid]})
    },
  })
}

export const useGetFavorites = () => {
  const user = useUser()

  return useQuery({
    queryKey: ['favorites', user?.uid],
    queryFn: () => getFavorites(user?.uid),
  })
}

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

interface RawApiBeer {
  id: number
  name: string
  price: string
  image: string
  rating: {
    average: number
    reviews: number
  }
}

const getApiBeers = async (): Promise<apiBeer[]> => {
  const url = 'https://api.sampleapis.com/beers/ale'

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Er ging iets mis met het ophalen van de api bieren')
  }

  const data = (await response.json()) as RawApiBeer[]

  // Return direct de gemapte data
  return data.map(
    (beer: RawApiBeer): apiBeer => ({
      ...beer,
      id: String(beer.id),
      beerId: String(beer.id),
      source: BeerSource.API,
      userId: '',
      favoriteAt: new Date(),
    }),
  )
}

export type FavoriteItem = apiBeer | IcustomBeer

const getFavorites = async (userId: string | undefined): Promise<FavoriteReference[]> => {
  const snapshot = await getCollectionRef<FavoriteReference>('favorites').where('userId', '==', userId).get()

  return getDataFromQuerySnapshot<FavoriteReference>(snapshot, 'id')
}

const toggleBeerFavorite = async (beer: FavoriteItem): Promise<void> => {
  const user = getCurrentUser()
  if (!user) throw new Error('User not logged in')

  // Samen voegen van user.id & beer.id zodat user a bier 1 kan favoriten & user b bier 1 ook kan favoriten
  const favoriteDocId = `${user.uid}_${beer.id}`
  const docRef = getDocumentRef<FavoriteReference>('favorites', favoriteDocId)

  const docSnapshot = await docRef.get()

  if (docSnapshot.exists()) {
    await docRef.delete()
  } else {
    const favoriteData: Omit<FavoriteReference, 'id'> = {
      userId: user.uid,
      beerId: String(beer.id),
      source: beer.source || BeerSource.API,
      favoriteAt: new Date(),
    }
    await docRef.set(favoriteData as FavoriteReference)
  }
}

//dit is hoe we het opslaan in firebase om ervoor te zorgen dat de data consistent blijft en niet verouderd.
export interface FavoriteReference {
  id: string
  userId: string
  beerId: string
  source: BeerSource
  favoriteAt: Date
}
