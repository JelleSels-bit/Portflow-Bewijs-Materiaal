import React, {FunctionComponent} from 'react'
import {ScrollView} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useRouter} from 'expo-router'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Pressable} from '@/components/ui/pressable'
import {Image} from '@/components/ui/image'
import {Spinner} from '@/components/ui/spinner'
import {useGetFavoritesWthData} from '@/hooks/useGetFavoritesWthData'
import {FavoriteItem} from '@/api/apiBeers'
import {BeerSource} from '@/model/apiBeer'

const MyFavoritesPage: FunctionComponent = () => {
  const router = useRouter()
  const {data: favoriteBeers, isLoading} = useGetFavoritesWthData()

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Box className="px-6 py-4 flex-1">
        {/* Header */}
        <HStack className="items-center justify-between mb-10" space="md">
          <HStack space="sm" className="items-center">
            <Pressable onPress={() => router.back()} className="bg-[#E67E22] p-2 rounded-full mr-2">
              <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
            </Pressable>
            <VStack>
              <Heading size="2xl" className="text-white font-black">
                My <Text className="text-[#E67E22]">Favorites</Text>
              </Heading>
              <Text className="text-gray-500 text-sm">Your personal craft beer collection</Text>
            </VStack>
          </HStack>
          <Box className="bg-neutral-900 p-3 rounded-2xl border border-neutral-800">
            <Text className="text-[#E67E22] font-bold">{favoriteBeers?.length || 0}</Text>
          </Box>
        </HStack>

        {/* Content */}
        {isLoading ? (
          <Box className="flex-1 justify-center items-center">
            <Spinner size="large" color="#E67E22" />
            <Text className="text-gray-500 mt-4">Tapping your favorites...</Text>
          </Box>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 40}}>
            {favoriteBeers && favoriteBeers.length > 0 ? (
              <VStack space="lg">
                {favoriteBeers
                  .filter((beer): beer is FavoriteItem => beer !== null)
                  .map((beer: FavoriteItem) => (
                    <FavoriteCard key={beer.id} beer={beer} />
                  ))}
              </VStack>
            ) : (
              <Box className="mt-20 items-center justify-center">
                <MaterialCommunityIcons name="beer-outline" size={80} color="#333" />
                <Heading size="md" className="text-gray-400 mt-4 text-center">
                  No favorites yet
                </Heading>
                <Text className="text-gray-600 text-center mt-2 px-10">
                  Go back to the home screen and spin the wheel to discover new beers!
                </Text>
              </Box>
            )}
          </ScrollView>
        )}
      </Box>
    </SafeAreaView>
  )
}

const FavoriteCard = ({beer}: {beer: FavoriteItem}) => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: `/(details)/[id]`,
          params: {id: beer.id, source: beer.source},
        })
      }>
      <Box className="bg-neutral-900/50 border border-neutral-800 rounded-[25px] p-4">
        <HStack space="md" className="items-center">
          {/* Beer Image Thumb */}
          <Box className="w-20 h-20 bg-neutral-800 rounded-2xl items-center justify-center overflow-hidden border border-neutral-700">
            {'image' in beer && beer.image ? (
              <Image source={{uri: beer.image}} alt={beer.name} className="w-full h-full" resizeMode="contain" />
            ) : (
              <MaterialCommunityIcons name="image-off" size={24} color="#555" />
            )}
          </Box>

          {/* Info */}
          <VStack className="flex-1">
            <HStack className="justify-between items-start">
              <VStack className="flex-1">
                <Text className="text-[#E67E22] text-xs font-bold uppercase tracking-wider mb-1">
                  {beer.source === BeerSource.API ? 'Random Beer' : 'My beer'}
                </Text>
                <Heading size="md" className="text-white font-bold" numberOfLines={1}>
                  {beer.name}
                </Heading>
              </VStack>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#E67E22" />
            </HStack>

            <HStack className="mt-2 items-center justify-between">
              <Text className="text-gray-400 font-medium">
                {' '}
                {'price' in beer ? `${beer.price}` : `${beer.alcohol}%`}
              </Text>
              <HStack space="xs" className="items-center">
                <HStack space="xs" className="items-center">
                  {'rating' in beer && beer.rating?.average ? (
                    <>
                      <MaterialCommunityIcons name="star" size={14} color="#E67E22" />
                      <Text className="text-white text-xs font-bold">{beer.rating.average.toFixed(1)}</Text>
                    </>
                  ) : (
                    <Text className="text-gray-500 text-xs italic">No rating</Text>
                  )}
                </HStack>
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  )
}

export default MyFavoritesPage
