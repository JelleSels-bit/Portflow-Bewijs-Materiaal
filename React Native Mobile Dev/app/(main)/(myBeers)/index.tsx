import 'react-native-gesture-handler'
import React, {FunctionComponent, useState} from 'react'
import {FlatList} from 'react-native'
import {Link, useRouter} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Button, ButtonText} from '@/components/ui/button'
import {Pressable} from '@/components/ui/pressable'
import {Spinner} from '@/components/ui/spinner'
import {useDeleteCustomBeer, useGetCustomBeersByUser} from '@/api/customBeers'
import {Input, InputField} from '@/components/ui/input'
import {Alert} from 'react-native'
import SwipeToDetail from '@/components/custom/swipeToDetail'

const MyBeersPage: FunctionComponent = () => {
  const {data: beers, isLoading} = useGetCustomBeersByUser()
  const {mutate: deleteBeer} = useDeleteCustomBeer()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <Spinner size="large" color="#E67E22" />
      </SafeAreaView>
    )
  }

  const filteredBeers = beers?.filter(
    beer =>
      beer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beer.brewery.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Box className="px-6 py-4 flex-1">
        {/* Header */}
        <HStack className="items-center justify-between" space="md">
          <HStack space="xs" className="items-center">
            <Text size="2xl">🍺</Text>
            <Heading size="xl" className="text-[#E67E22]">
              My beerss
            </Heading>
          </HStack>
        </HStack>

        <Text className="text-gray-500 text-lg mt-2 mb-6">Manage your beers.</Text>

        <VStack space="md" className="mt-4 mb-6">
          <Input className="border-neutral-800 bg-neutral-900/50 h-12 rounded-2xl px-4 flex-row items-center">
            <MaterialCommunityIcons name="magnify" size={20} color="#666" />
            <InputField
              className="text-white flex-1 ml-2"
              placeholder="Search on Name, Style or Brewery..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <MaterialCommunityIcons name="close-circle" size={18} color="#666" />
              </Pressable>
            )}
          </Input>
        </VStack>
        <Text className="mb-6">Swipe naar links om de detail pagina te zien.</Text>

        <FlatList
          data={filteredBeers}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 100}}
          ListEmptyComponent={
            <VStack
              space="md"
              className="mt-20 items-center bg-neutral-900/50 p-10 rounded-[30px] border border-neutral-800">
              <MaterialCommunityIcons name="beer-outline" size={48} color="#333" />
              <Text className="text-gray-500 text-center">Nog geen eigen bieren toegevoegd.</Text>
            </VStack>
          }
          renderItem={({item}) => (
            <SwipeToDetail
              onSwipeLeft={() => {
                router.push({
                  pathname: `/[id]`,
                  params: {id: item.id, source: item.source},
                })
              }}>
              <Box className="bg-neutral-900/60 p-5 rounded-[25px] border border-neutral-800 mb-4 flex 1">
                <HStack className="items-center justify-between">
                  <VStack space="xs">
                    <Heading size="md" className="text-white font-black">
                      {item.name}
                    </Heading>
                    <Text size="sm" className="text-[#E67E22] font-bold">
                      {item.category || 'Eigen recept'}
                    </Text>
                    <HStack space="xs" className="items-center">
                      <MaterialCommunityIcons name="percent" size={14} color="#666" />
                      <Text className="text-gray-500 text-xs">{item.alcohol || '0'}% alcohol</Text>
                    </HStack>
                  </VStack>

                  {/* Action buttons */}
                  <HStack space="md" className="items-center ml-2">
                    <Pressable
                      onPress={() => router.push(`/(main)/(myBeers)/edit/${item.id}`)}
                      className="p-3 bg-neutral-800 rounded-full">
                      <MaterialCommunityIcons name="pencil" size={20} color="#E67E22" />
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        Alert.alert('Delete', 'Do you want to remove the bier from the list?', [
                          {text: 'No', style: 'cancel'},
                          {text: 'Yes', onPress: () => deleteBeer({id: item.id})},
                        ])
                      }}
                      className="p-3 bg-red-500/20 rounded-full">
                      <MaterialCommunityIcons name="trash-can-outline" size={20} color="#EF4444" />
                    </Pressable>
                  </HStack>
                </HStack>
              </Box>
            </SwipeToDetail>
          )}
        />

        <Link href="/create" asChild>
          <Button className="absolute bottom-10 left-6 right-6 bg-[#E67E22] rounded-full h-14 shadow-lg ">
            <ButtonText className="text-black font-bold">NIEUW BIER TOEVOEGEN</ButtonText>
          </Button>
        </Link>
      </Box>
    </SafeAreaView>
  )
}

export default MyBeersPage
