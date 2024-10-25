import { Slot, SplashScreen } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
   const [fontsLoaded, error] = useFonts({
      "RockSalt-Regular": require("@/assets/fonts/RockSalt-Regular.ttf"),
   })

   useEffect(() => {
      if (error) {
         throw error
      }

      if (fontsLoaded) {
         SplashScreen.hideAsync()
      }
   }, [fontsLoaded, error])

   if (!fontsLoaded && !error) return null

   return (
      <GestureHandlerRootView className="flex-1">
         {/* <BottomSheetModalProvider> */}
         <StatusBar hidden={true} />
         <Slot />
         {/* </BottomSheetModalProvider> */}
      </GestureHandlerRootView>
   )
}

export default RootLayout
