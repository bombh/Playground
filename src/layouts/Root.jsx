import { Slot, SplashScreen } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import Toast, { BaseToast } from "react-native-toast-message"
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import { tokenCache } from "@/src/utils/cache"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

SplashScreen.preventAutoHideAsync()

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
   throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env")
}

const toastConfig = {
   /*
    Overwrite 'info' type,
    by modifying the existing `BaseToast` component
  */
   info: (props) => (
      <BaseToast
         {...props}
         style={{ borderLeftColor: "#999" }}
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
      <ClerkProvider
         publishableKey={publishableKey}
         tokenCache={tokenCache}
      >
         <ClerkLoaded>
            <GestureHandlerRootView className="flex-1">
               <BottomSheetModalProvider>
                  <StatusBar hidden={true} />
                  <Slot />
               </BottomSheetModalProvider>
               <Toast config={toastConfig} />
            </GestureHandlerRootView>
         </ClerkLoaded>
      </ClerkProvider>
   )
}

export default RootLayout
