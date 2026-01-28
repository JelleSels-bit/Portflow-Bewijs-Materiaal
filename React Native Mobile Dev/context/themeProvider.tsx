import React, {FunctionComponent, PropsWithChildren} from 'react'
import {useColorScheme, StatusBar} from 'react-native'
import {ThemeProvider as NavigationThemeProvider, DefaultTheme, Theme} from '@react-navigation/native'
import '@/global.css'
import colors from 'tailwindcss/colors'
import GluestackUIProvider from '@/components/ui/gluestack-ui-provider'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const darkTheme: Theme = {
  dark: true,
  fonts: DefaultTheme.fonts,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.neutral[100],
    background: colors.black,
    card: colors.neutral[950],
    text: colors.neutral[300],
    border: colors.neutral[500],
    notification: colors.neutral[700],
  },
}

const lightTheme: Theme = {
  dark: false,
  fonts: DefaultTheme.fonts,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.neutral[900],
    background: colors.neutral[50],
    card: colors.neutral[100],
    text: colors.neutral[800],
    border: colors.neutral[500],
    notification: colors.neutral[700],
  },
}

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const isDark = useColorScheme() === 'dark'
  const activeTheme = isDark ? darkTheme : lightTheme

  return (
    <SafeAreaProvider>
      <GluestackUIProvider>
        <NavigationThemeProvider value={{...DefaultTheme, ...activeTheme}}>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={activeTheme.colors.background}
          />
          {children}
        </NavigationThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}

export default ThemeProvider
