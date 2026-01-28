import React, {FunctionComponent} from 'react'
import {useLocalSearchParams} from 'expo-router'
import {Text} from '@/components/ui/text'
import {useGetApiBeers} from '@/api/apiBeers'
import {apiBeer, BeerSource} from '@/model/apiBeer'
import {IcustomBeer} from '@/model/customBeer'
import ApiBeerDetail from '@/components/apiBeerDetail'
import {useGetCustomBeersByUser} from '@/api/customBeers'
import CustomBeerDetail from '@/components/customBeerDetail'

const BeerDetailScreen: FunctionComponent = () => {
  const {id, source} = useLocalSearchParams()
  const {data: apiBeers} = useGetApiBeers()
  const {data: customBeers} = useGetCustomBeersByUser()

  if (source === BeerSource.API) {
    const beer: apiBeer | undefined = apiBeers?.find(beer => beer.id.toString() === id)
    if (!beer) return <Text>Laden...</Text>
    return <ApiBeerDetail beer={beer} />
  }

  if (source === BeerSource.DB) {
    const beer: IcustomBeer | undefined = customBeers?.find(beer => beer.id.toString() === id)
    if (!beer) return <Text>Laden...</Text>
    return <CustomBeerDetail beer={beer} />
  }
}

export default BeerDetailScreen
