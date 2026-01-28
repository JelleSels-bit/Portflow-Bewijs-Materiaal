import React, {FunctionComponent} from 'react'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {Text} from '@/components/ui/text'
import {apiBeer, BeerSource} from '@/model/apiBeer'
import {Spinner} from '@/components/ui/spinner'
import {IcustomBeer} from '@/model/customBeer'

interface BeerDisplayProps {
  beer: apiBeer | IcustomBeer | null
  isLoading: boolean
  hasError: Error | null
}

const BeerDisplay: FunctionComponent<BeerDisplayProps> = ({beer, isLoading, hasError}) => {
  if (hasError) {
    return <Text className="text-white">Something went wrong loading the beer</Text>
  }

  if (isLoading) {
    return <Spinner size="large" color="$amber500" />
  }

  return (
    <VStack className="items-center w-full" space="xl">
      {/* 1. De Cirkel */}
      <Box
        className={`w-64 h-64 rounded-full border-[12px] items-center justify-center ${beer ? 'border-[#4ADE80]' : 'border-[#E67E22]'}`}
        style={
          !beer
            ? {
                shadowColor: '#E67E22',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0.5,
                shadowRadius: 15,
                elevation: 10,
              }
            : {}
        }>
        <Box className="w-44 h-44 rounded-full bg-neutral-900 items-center justify-center p-4">
          {!beer ? (
            <Text size="xl">🎲</Text>
          ) : beer.source === BeerSource.API ? (
            <VStack space="xs" className="items-center">
              <Text className="text-white text-center font-bold text-lg" numberOfLines={2}>
                {beer.name}
              </Text>
              <Text className="text-gray-400">{(beer as apiBeer).price}</Text>
            </VStack>
          ) : (
            <VStack space="xs" className="items-center">
              <Text className="text-white text-center font-bold text-lg" numberOfLines={2}>
                {beer.name}
              </Text>
              <Text className="text-[#E67E22] font-semibold">{(beer as IcustomBeer).alcohol}% Vol.</Text>
            </VStack>
          )}
        </Box>
      </Box>

      <Box className="h-10 justify-center">
        <Text className={`${beer ? 'text-green-400' : 'text-white opacity-80'} text-xl font-semibold text-center`}>
          {beer ? 'Cheers! 🍻' : 'Spin to discover your first beer!'}
        </Text>
      </Box>

      <Box className="h-32 w-full" />
    </VStack>
  )
}

export default BeerDisplay
