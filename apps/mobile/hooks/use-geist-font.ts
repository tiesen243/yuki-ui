import {
  Geist_300Light,
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
  Geist_900Black,
} from '@expo-google-fonts/geist'
import { useFonts } from 'expo-font'

export const useGeistFonts = () =>
  useFonts({
    'Geist-Light': Geist_300Light,
    'Geist-Regular': Geist_400Regular,
    'Geist-Medium': Geist_500Medium,
    'Geist-SemiBold': Geist_600SemiBold,
    'Geist-Bold': Geist_700Bold,
    'Geist-Black': Geist_900Black,
  })
