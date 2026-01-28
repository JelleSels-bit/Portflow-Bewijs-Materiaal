import React, {FunctionComponent} from 'react'
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
import {Pressable} from '@/components/ui/pressable'
import {IcustomBeer} from '@/model/customBeer'
import {useGetFavorites, useToggleFavoriteBeer} from '@/api/apiBeers'

interface CustomBeerDetailProps {
  beer: IcustomBeer
}

const CustomBeerDetail: FunctionComponent<CustomBeerDetailProps> = ({beer}) => {
  const router = useRouter()

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
              <Heading size="xl" className="text-[#E67E22]">
                Custom Brew
              </Heading>
            </HStack>
          </HStack>

          {/* Icon/Placeholder  */}
          {/*Zelf nemen van een foto is nog niet geimplementeerd maar als dit er is kunnnen we dit aanpassen naar de img*/}
          <Box className="w-full border-2 border-[#E67E22] rounded-[30px] p-10 bg-neutral-900/40 items-center justify-center mt-6">
            <MaterialCommunityIcons name="beer" size={100} color="#E67E22" />
            <Box className="mt-4 bg-[#E67E22]/20 px-4 py-1 rounded-full">
              <Text className="text-[#E67E22] font-bold text-xs uppercase tracking-widest">{beer.category}</Text>
            </Box>
          </Box>

          {/* Title & Brewery Section */}
          <VStack className="items-center mt-6" space="xs">
            <Heading size="3xl" className="text-white text-center font-black">
              {beer.name}
            </Heading>
            <Text className="text-[#E67E22] text-lg font-medium">{beer.brewery}</Text>
          </VStack>

          {/* Info Grid */}
          <HStack space="md" className="mt-8">
            <InfoCard label="Alcohol" value={`${beer.alcohol}%`} icon="percent" />
            <InfoCard label="Type" value={beer.category} icon="tag-outline" />
          </HStack>

          {/* Description Section */}
          <SectionContainer title="Beschrijving">
            <Text className="text-gray-400 leading-relaxed text-base">
              {beer.description || 'Geen beschrijving beschikbaar voor dit bier.'}
            </Text>
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

const InfoCard = ({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: keyof typeof MaterialCommunityIcons.glyphMap // opgezocht wat dit moest zijn, anders moest ik any gebruiken.
}) => (
  <VStack className="flex-1 bg-neutral-900/50 p-4 rounded-[25px] border border-neutral-800 items-center" space="xs">
    <MaterialCommunityIcons name={icon} size={20} color="#E67E22" />
    <Text className="text-white font-bold text-lg">{value}</Text>
    <Text className="text-gray-500 text-[10px] uppercase tracking-tighter">{label}</Text>
  </VStack>
)

const SectionContainer = ({title, children}: {title: string; children: React.ReactNode}) => (
  <VStack space="sm" className="mt-6 bg-neutral-900/50 p-6 rounded-3xl border border-neutral-800">
    <Heading size="sm" className="text-[#E67E22] uppercase tracking-widest text-xs">
      {title}
    </Heading>
    {children}
  </VStack>
)

export default CustomBeerDetail
