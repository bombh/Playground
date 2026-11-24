import { View, Text, Pressable, ScrollView, Platform } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import * as WebBrowser from "expo-web-browser"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useSSO } from "@clerk/expo"

import ScreenStackFull from "@/src/layouts/ScreenStackFull"

// Auth strategies
const Strategy = {
   Google: "oauth_google",
   Apple: "oauth_apple",
   Facebook: "oauth_facebook",
}

// Complete any pending auth session when the app is re-opened from the OAuth redirect
WebBrowser.maybeCompleteAuthSession()

// Warm up the Android browser to improve the OAuth flow start time
const useWarmUpBrowser = () => {
   useEffect(() => {
      if (Platform.OS !== "android") return
      void WebBrowser.warmUpAsync()
      return () => {
         void WebBrowser.coolDownAsync()
      }
   }, [])
}

const Login = () => {
   const router = useRouter()
   useWarmUpBrowser()

   const { startSSOFlow } = useSSO()

   // Strategy being signed in with (null when idle); the ref blocks double taps before the re-render
   const [pendingStrategy, setPendingStrategy] = useState(null)
   const isAuthenticating = useRef(false)

   const onSelectAuth = async (strategy) => {
      if (isAuthenticating.current) return
      isAuthenticating.current = true
      setPendingStrategy(strategy)

      try {
         // iOS refuses to open a new auth session while a previous one is still marked open
         // ("Another web browser is already open"), e.g. after an interrupted attempt
         if (Platform.OS === "ios") WebBrowser.dismissAuthSession()

         const { createdSessionId, setActive } = await startSSOFlow({ strategy })
         console.log("Clerk: selectAuth()")
         if (createdSessionId) {
            console.log("Clerk: setActive()", createdSessionId)
            await setActive?.({ session: createdSessionId })
            router.back()
         }
      } catch (error) {
         console.error("Login error", error)
      } finally {
         isAuthenticating.current = false
         setPendingStrategy(null)
      }
   }

   return (
      <>
         <ScreenStackFull title="" />
         <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="">
               {/* Title */}
               <View className="mt-10">
                  <Text className="text-center font-rock text-3xl mt-2 pt-5">Log In</Text>
                  <Text className="text-sm text-stone-400 text-center px-10">
                     By continuing, you agree to our Terms of Service and Privacy Policy
                  </Text>
               </View>

               {/* Auth buttons */}
               <View className="mt-8 px-16">
                  <Pressable
                     onPress={() => onSelectAuth(Strategy.Google)}
                     disabled={pendingStrategy !== null}
                     className={`bg-stone-800 p-3 mt-8 rounded-full active:opacity-50 ${pendingStrategy ? "opacity-50" : ""}`}
                  >
                     <Text className="text-base text-white text-center">
                        Continue with <Text className="font-bold">Google</Text>
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => onSelectAuth(Strategy.Apple)}
                     disabled={pendingStrategy !== null}
                     className={`bg-stone-800 p-3 mt-8 rounded-full active:opacity-50 ${pendingStrategy ? "opacity-50" : ""}`}
                  >
                     <Text className="text-base text-white text-center">
                        Continue with <Text className="font-bold">Apple</Text>
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => onSelectAuth(Strategy.Facebook)}
                     disabled={pendingStrategy !== null}
                     className={`bg-stone-800 p-3 mt-8 rounded-full active:opacity-50 ${pendingStrategy ? "opacity-50" : ""}`}
                  >
                     <Text className="text-base text-white text-center">
                        Continue with <Text className="font-bold">Facebook</Text>
                     </Text>
                  </Pressable>
               </View>
            </ScrollView>
         </SafeAreaView>
      </>
   )
}

export default Login
