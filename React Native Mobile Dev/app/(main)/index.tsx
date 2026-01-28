import React, {useCallback, useEffect, useRef, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Button, ButtonText} from '@/components/ui/button'
import {Center} from '@/components/ui/center'
import {FavoriteItem, useGetApiBeers} from '@/api/apiBeers'
import {apiBeer, BeerSource} from '@/model/apiBeer'
import {Link, Redirect} from 'expo-router'
import useUser from '@/hooks/useUser'
import {useGetCustomBeersByUser} from '@/api/customBeers'
import {IcustomBeer} from '@/model/customBeer'
import BeerDisplay from '@/components/beerDisplay'
import {useGetFavoritesWthData} from '@/hooks/useGetFavoritesWthData'
import {Pressable} from 'react-native'
import {Accelerometer} from 'expo-sensors'
import * as Haptics from 'expo-haptics'

type AccelerometerSubscription = ReturnType<typeof Accelerometer.addListener>

export default function HomeScreen() {
  const user = useUser()
  const [activeTab, setActiveTab] = useState<string>('🍺 Random')
  const {data: apiBeers, isLoading, error} = useGetApiBeers()
  const {data: customBeers} = useGetCustomBeersByUser()
  const {data: favoriteBeers} = useGetFavoritesWthData()
  const [currentBeer, setCurrentBeer] = useState<apiBeer | IcustomBeer | null>(null)
  const lastBeerIndexRef = useRef<number | null>(null)
  const lastSpinTimeRef = useRef<number>(0)
  const activeTabRef = useRef(activeTab)
  const spinWheelRef = useRef<(() => void) | null>(null)

  const getActiveBeerPool = useCallback(() => {
    if (activeTab === '🍺 Random') return apiBeers?.map(beer => ({...beer, source: BeerSource.API})) as apiBeer[]
    if (activeTab === '+ Custom') return customBeers as IcustomBeer[]
    if (activeTab === '❤️ Favs') return favoriteBeers as FavoriteItem[]
    return []
  }, [activeTab, apiBeers, customBeers, favoriteBeers])

  const spinWheel = useCallback(() => {
    const pool = getActiveBeerPool()
    if (!pool || pool.length === 0) {
      setCurrentBeer(null)
      return
    }

    if (pool.length === 1) {
      setCurrentBeer(pool[0])
      return
    }

    let newBeerIndex: number
    do {
      newBeerIndex = Math.floor(Math.random() * pool.length)
    } while (newBeerIndex === lastBeerIndexRef.current)

    lastBeerIndexRef.current = newBeerIndex
    setCurrentBeer(pool[newBeerIndex])
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }, [getActiveBeerPool])

  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])

  useEffect(() => {
    spinWheelRef.current = spinWheel
  }, [spinWheel])

  //Hier gebeurt de actie.
  useEffect(() => {
    let sub: AccelerometerSubscription | null = null

    const initSensor = async () => {
      const available = await Accelerometer.isAvailableAsync()
      if (!available) return

      Accelerometer.setUpdateInterval(100)

      sub = Accelerometer.addListener(({x, y, z}) => {
        const now = Date.now()
        const totalForce = Math.sqrt(x ** 2 + y ** 2 + z ** 2)

        if (totalForce > 1.5 && now - lastSpinTimeRef.current > 1500) {
          lastSpinTimeRef.current = now
          spinWheelRef.current?.()
        }
      })
    }

    void initSensor()

    return () => {
      sub?.remove()
    }
  }, [])

  if (!user) return <Redirect href="/(auth)/index" />

  return (
    <SafeAreaView className="flex-1 bg-black">
      <VStack space="sm" className="px-6 pt-2 flex-1">
        {/* 1. Header & Logo */}
        <VStack space="xs" className="mb-4">
          <HStack className="items-center" space="sm">
            <MaterialCommunityIcons name="beer" size={32} color="#E67E22" />
            <Heading size="4xl" className="text-[#E67E22] font-black tracking-tighter">
              BeerSpin
            </Heading>
          </HStack>
          <Text className="text-gray-500 text-lg font-medium">Spin. Sip. Discover. Repeat.</Text>
        </VStack>

        {/* 2. Navigatie Tabs (Pills) */}
        <HStack space="md" className="mt-10 justify-between">
          {['🍺 Random', '+ Custom', '❤️ Favs'].map(tab => (
            <Button
              key={tab}
              onPress={() => {
                setActiveTab(tab)
                setCurrentBeer(null)
              }}
              className={`rounded-full flex-1 ${activeTab === tab ? 'bg-[#E67E22]' : 'bg-neutral-900'}`}>
              <ButtonText className="capitalize">{tab}</ButtonText>
            </Button>
          ))}
        </HStack>

        {/* 3. De Spin Area */}
        <VStack className="flex-1 mt-10 justify-between">
          <Center>
            <BeerDisplay beer={currentBeer} isLoading={isLoading} hasError={error} />
          </Center>

          <VStack className="w-full px-10 pb-6">
            <Box className="h-14">
              {currentBeer && (
                <Link
                  href={{
                    pathname: `/[id]`,
                    params: {
                      id: currentBeer.id,
                      source: currentBeer.source,
                    },
                  }}
                  asChild>
                  <Button size="lg" className="bg-[#E67E22] rounded-full h-14">
                    <ButtonText className="text-black font-bold text-lg">Details</ButtonText>
                  </Button>
                </Link>
              )}
            </Box>
          </VStack>
        </VStack>

        {/* 4. Footer  */}
        <VStack space="lg" className="mt-20 items-center pb-10">
          <Box className="bg-neutral-900 px-5 py-2 rounded-full border border-neutral-800">
            <Text className="text-gray-400 text-sm">💡 Shake your phone to spin!</Text>
          </Box>

          <HStack space="xl" className="items-center">
            <Link href="/(myFavorites)" asChild>
              <Pressable>
                <Text className="text-neutral-600 text-2xl font-bold">❤️ {favoriteBeers?.length}</Text>
              </Pressable>
            </Link>
            <Box className="w-[1px] h-6 bg-neutral-800" />
            <Link href="/(myBeers)" asChild>
              <Text className="text-neutral-600 text-2xl font-bold">➕ {customBeers?.length}</Text>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}
