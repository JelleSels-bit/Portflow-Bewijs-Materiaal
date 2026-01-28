import {Stack} from 'expo-router'
import ThemeProvider from '@/context/themeProvider'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import GluestackUIProvider from '@/components/ui/gluestack-ui-provider'

const globalThisForRNFB = globalThis as unknown as {RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS: boolean}
globalThisForRNFB.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <ThemeProvider>
            <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="(auth)/index" />
              <Stack.Screen name="(main)" />
              <Stack.Screen
                name="(details)/[id]"
                options={{
                  presentation: 'card',
                  animation: 'slide_from_right',
                }}
              />
              <Stack.Screen
                name="(myFavorites)/index"
                options={{
                  headerShown: false,
                  animation: 'slide_from_bottom',
                }}
              />
            </Stack>
          </ThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </GluestackUIProvider>
  )
}
