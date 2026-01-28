import {Tabs, Redirect, useRouter} from 'expo-router'
import {useGetCurrentUser} from '@/api/auth'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import auth from '@react-native-firebase/auth'
import {useQueryClient} from '@tanstack/react-query'

export default function MainLayout() {
  const {data: user, isLoading} = useGetCurrentUser()
  const router = useRouter()
  const queryClient = useQueryClient()

  if (isLoading) return null
  if (!user) return <Redirect href="/(auth)/index" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E67E22',
        tabBarStyle: {backgroundColor: '#000', borderTopColor: '#1A1A1A'},
      }}>
      {/* 1. Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <MaterialCommunityIcons name="beer" size={28} color={color} />,
        }}
      />

      {/* 2. My Beers */}
      <Tabs.Screen
        name="(myBeers)/index"
        options={{
          title: 'My Beers',
          tabBarIcon: ({color}) => <MaterialCommunityIcons name="plus-box" size={28} color={color} />,
        }}
      />

      {/* 3. Logout */}
      <Tabs.Screen
        name="logout-trigger"
        options={{
          title: 'Log out',
          tabBarIcon: ({color}) => <MaterialCommunityIcons name="logout" size={28} color={color} />,
        }}
        listeners={{
          tabPress: async e => {
            e.preventDefault()
            await auth().signOut()
            queryClient.clear()
            router.replace('/(auth)')
          },
        }}
      />

      <Tabs.Screen name="(myBeers)/create" options={{href: null}} />
      <Tabs.Screen name="(myBeers)/edit/[id]" options={{href: null}} />
    </Tabs>
  )
}
