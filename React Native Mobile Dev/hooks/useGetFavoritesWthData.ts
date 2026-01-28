import {FavoriteItem, useGetApiBeers, useGetFavorites} from '@/api/apiBeers'
import {useGetCustomBeersByUser} from '@/api/customBeers'
import {BeerSource} from '@/model/apiBeer'

export const useGetFavoritesWthData = () => {
  const {data: apiBeers} = useGetApiBeers()
  const {data: customBeers} = useGetCustomBeersByUser()
  const {data: favoriteRefs, isLoading: favLoading} = useGetFavorites()

  const favoritesWthData = favoriteRefs
    ?.map(ref => {
      const pool = ref.source === BeerSource.API ? apiBeers : customBeers
      const originalBeer = pool?.find(b => String(b.id) === String(ref.beerId))

      return originalBeer ? {...originalBeer, source: ref.source} : null
    })
    .filter(Boolean)

  return {
    data: favoritesWthData || [],
    isLoading: favLoading,
  }
}
