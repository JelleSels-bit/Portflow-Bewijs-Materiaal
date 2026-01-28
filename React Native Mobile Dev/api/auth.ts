import type {UseMutationResult, UseQueryResult} from '@tanstack/react-query'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import type {AuthCredential, User} from '@/model/fireBaseTypes'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export function useSignOut(): UseMutationResult<void, Error, void, void> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSettled: () => queryClient.invalidateQueries({queryKey: ['currentUser']}),
  })
}

export function useSignIn(): UseMutationResult<User | null, Error, SignInParams, void> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signIn,
    onSettled: () => queryClient.invalidateQueries({queryKey: ['currentUser']}),
  })
}

export function useGetCurrentUser(): UseQueryResult<User | null, Error> {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    // Aangezien de gebruiker nooit kan wijzigen tenzij de gebruiker uitlogt, kunnen we de staleTime en cacheTime op
    // Infinity zetten.
    gcTime: Infinity,
    staleTime: Infinity,
  })
}

//endregion

//region API functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

export enum AuthProvider {
  GOOGLE = 'google.com',
  EMAIL = 'email',
}

interface SignInParams {
  provider: AuthProvider
  email?: string
  password?: string
}

async function signIn({provider, email, password}: SignInParams): Promise<User | null> {
  if (provider === AuthProvider.EMAIL) {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }
    const userCredential = await auth().signInWithEmailAndPassword(email, password)
    return userCredential.user
  }

  let credential: AuthCredential | null = null
  switch (provider) {
    case AuthProvider.GOOGLE:
      credential = await createGoogleCredential()
      break
    default:
      throw new Error('Invalid provider')
  }

  if (!credential) return null

  const userCredential = await auth().signInWithCredential(credential)
  return userCredential.user
}

async function signOut(): Promise<void> {
  const user = getCurrentUser()

  if (user === null) {
    return
  }

  // Log uit bij Firebase.
  await auth().signOut()

  // Log uit bij de Identity Provider.
  switch (user.providerData[0].providerId) {
    case AuthProvider.GOOGLE.toString():
      await GoogleSignin.signOut()
      break
    default:
      throw new Error('Invalid provider')
  }
}

GoogleSignin.configure({webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID})

async function createGoogleCredential(): Promise<AuthCredential | null> {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true})

  const signInResult = await GoogleSignin.signIn()

  const idToken = signInResult.data?.idToken

  if (!idToken) {
    return null
  }

  return auth.GoogleAuthProvider.credential(idToken)
}

export function getCurrentUser(): User | null {
  return auth().currentUser
}

//endregion
