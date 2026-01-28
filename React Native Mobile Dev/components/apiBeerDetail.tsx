import React, {FunctionComponent, useState} from 'react'
import {ScrollView} from 'react-native'
import {useRouter} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Button, ButtonText} from '@/components/ui/button'
import {Image} from '@/components/ui/image'
import {Pressable} from '@/components/ui/pressable'
import {apiBeer} from '@/model/apiBeer'
import {useGetFavorites, useToggleFavoriteBeer} from '@/api/apiBeers'

interface ApiBeerDetailProps {
  beer: apiBeer
}

const ApiBeerDetail: FunctionComponent<ApiBeerDetailProps> = ({beer}) => {
  const router = useRouter()
  const [hasError, setHasError] = useState(false)
  const {mutate: toggleFavorite} = useToggleFavoriteBeer()
  const {data: favorites} = useGetFavorites()
  const isFavorite = favorites?.some(fav => String(fav.beerId) === String(beer.id))

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView>
        <Box className="px-6 py-4">
          {/* Header met Back Button */}
          <HStack className="items-center" space="md">
            <Pressable onPress={() => router.back()} className="bg-[#E67E22] p-2 rounded-full">
              <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
            </Pressable>
            <HStack space="xs" className="items-center">
              <Text size="2xl">🍺</Text>
              <Heading size="xl" className="text-[#E67E22]">
                BeerSpin
              </Heading>
            </HStack>
          </HStack>

          {/* Beer Image Card */}
          <Box className="w-full border-2 border-[#E67E22] rounded-[30px] p-6 bg-neutral-900/40 items-center justify-center overflow-hidden mt-6">
            {beer.image && !hasError ? (
              <Image
                source={{uri: beer.image}}
                alt={beer.name}
                className="w-full h-64"
                resizeMode="contain"
                key={beer.id}
                onError={() => setHasError(true)}
              />
            ) : (
              <VStack space="xs" className="items-center justify-center p-4">
                <MaterialCommunityIcons name="image-off-outline" size={28} color="#E67E22" />
                <Text className="text-gray-400 italic text-xs text-center leading-tight" numberOfLines={2}>
                  Afbeelding niet{'\n'}beschikbaar
                </Text>
              </VStack>
            )}
          </Box>

          {/* Title Section */}
          <VStack className="items-center mt-6" space="xs">
            <Heading size="3xl" className="text-white text-center font-black">
              {beer.name}
            </Heading>
            <Text className="text-gray-500 text-lg">€ {beer.price}</Text>
          </VStack>

          {/* Rating Section */}
          <SectionContainer title="Rating">
            <VStack space="md" className="mt-2 bg-neutral-900/50 p-6 rounded-[25px] border border-neutral-800">
              <HStack className="items-center justify-between">
                {/* Gemiddelde Score */}
                <VStack className="items-center flex-1">
                  <HStack space="xs" className="items-end">
                    <Text className="text-white text-3xl font-bold leading-none">
                      {beer.rating?.average?.toFixed(1) || '0.0'}
                    </Text>
                    <Text className="text-gray-500 text-lg mb-0.5">/ 5</Text>
                  </HStack>
                  <Text className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Average Score</Text>
                </VStack>

                <Box className="w-[1px] h-12 bg-neutral-800" />

                {/* Reviews */}
                <VStack className="items-center flex-1">
                  <HStack space="xs" className="items-center">
                    <MaterialCommunityIcons name="account-group-outline" size={20} color="#E67E22" />
                    <Text className="text-white text-2xl font-bold">{beer.rating?.reviews || '0'}</Text>
                  </HStack>
                  <Text className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Total Reviews</Text>
                </VStack>
              </HStack>

              {/* Progress Bar */}
              <VStack space="xs" className="mt-2">
                <Box className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <Box
                    className="h-full bg-[#E67E22] rounded-full"
                    style={{width: `${((beer.rating?.average ?? 0) / 5) * 100}%`}}
                  />
                </Box>
              </VStack>
            </VStack>
          </SectionContainer>

          {/* Footer Buttons */}
          <HStack space="md" className="mt-10 mb-10 items-center">
            <Pressable
              onPress={() => toggleFavorite(beer)}
              className="bg-neutral-900 p-3 rounded-2xl border border-neutral-800">
              <MaterialCommunityIcons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={32}
                color={isFavorite ? '#E74C3C' : '#E67E22'}
              />
            </Pressable>

            <Button className="flex-1 bg-[#E67E22] rounded-full h-14" onPress={() => router.back()}>
              <ButtonText className="text-black font-bold text-lg">Go back</ButtonText>
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

const SectionContainer = ({title, children}: {title: string; children: React.ReactNode}) => (
  <VStack space="sm" className="mt-8 bg-neutral-900/50 p-6 rounded-3xl border border-neutral-800">
    <Heading size="md" className="text-[#E67E22]">
      {title}
    </Heading>
    {children}
  </VStack>
)

export default ApiBeerDetail
