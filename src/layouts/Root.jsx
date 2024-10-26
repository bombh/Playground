import { Slot, SplashScreen } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import Toast, { BaseToast } from "react-native-toast-message"

SplashScreen.preventAutoHideAsync()

const toastConfig = {
   /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
   info: (props) => (
      <BaseToast
         {...props}
         style={{ borderLeftColor: "#000" }}
         contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: "#333" }}
         text1Style={{
            fontSize: 17,
            fontWeight: "400",
            color: "#fff",
         }}
         text2Style={{
            fontSize: 14,
         }}
      />
   ),
}

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
         <Toast config={toastConfig} />
      </GestureHandlerRootView>
   )
}

export default RootLayout
