import React, {useState} from 'react'
import {Redirect} from 'expo-router'
import {SafeAreaView} from 'react-native-safe-area-context'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View} from 'react-native'
import {AuthProvider, useSignIn} from '@/api/auth'
import useUser from '@/hooks/useUser'

import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Button, ButtonText} from '@/components/ui/button'

import {Spinner} from '@/components/ui/spinner'

const Index = () => {
  const {mutate: signIn, isPending} = useSignIn()
  const user = useUser()

  if (user) {
    return <Redirect href="/(main)" />
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-8 justify-between py-12">
        <VStack className="mt-20 items-center">
          <View className="bg-[#E67E22]/10 p-8 rounded-[40px] mb-8 border border-[#E67E22]/20">
            <MaterialCommunityIcons name="beer" size={80} color="#E67E22" />
          </View>
          <Heading size="4xl" className="text-white font-black text-center tracking-tight">
            Brew Spinner
          </Heading>
          <Text className="text-gray-500 text-center mt-4 text-xl px-4">
            Manage youre own beers and discover new taste
          </Text>
        </VStack>

        <VStack space="xl" className="w-full">
          <Button
            className="rounded-2xl h-16 bg-white active:bg-gray-200 shadow-xl"
            onPress={() => signIn({provider: AuthProvider.GOOGLE})}
            disabled={isPending}>
            {isPending ? (
              <Spinner color="black" />
            ) : (
              <HStack space="md" className="items-center justify-center w-full">
                <MaterialCommunityIcons name="google" size={24} color="black" />
                <ButtonText className="text-black font-bold text-lg">Continue with Google</ButtonText>
              </HStack>
            )}
          </Button>

          <Text className="text-neutral-600 text-center text-xs px-6 leading-5">
            Door in te loggen ga je akkoord met onze{'\n'}
            <Text className="text-neutral-500 underline">Terms of Service</Text> &{' '}
            <Text className="text-neutral-500 underline">Privacy Policy</Text>
          </Text>
        </VStack>
      </View>
    </SafeAreaView>
  )
}

export default Index
