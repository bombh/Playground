import { View, Text, Pressable, ScrollView } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { useOAuth } from "@clerk/clerk-expo"

import ScreenStackFull from "@/src/layouts/ScreenStackFull"

// Auth strategies
const Strategy = {
   Google: "oauth_google",
   Apple: "oauth_apple",
   Facebook: "oauth_facebook",
}

const Login = () => {
   const router = useRouter()

   const { startOAuthFlow: googleAuth } = useOAuth({ strategy: Strategy.Google })
   const { startOAuthFlow: appleAuth } = useOAuth({ strategy: Strategy.Apple })
   const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: Strategy.Facebook })

   const onSelectAuth = async (strategy) => {
      const selectedAuth = {
         [Strategy.Google]: googleAuth,
         [Strategy.Apple]: appleAuth,
         [Strategy.Facebook]: facebookAuth,
      }[strategy]

      try {
         const { createdSessionId, setActive } = await selectedAuth()

         if (createdSessionId) {
            setActive({ session: createdSessionId })
            router.back()
         }
      } catch (error) {
         console.error(error)
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
                     className="bg-stone-800 p-3 mt-8 rounded-full active:opacity-50"
                  >
                     <Text className="text-base text-white text-center">
                        Continue with <Text className="font-bold">Google</Text>
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => onSelectAuth(Strategy.Apple)}
                     className="bg-stone-800 p-3 mt-8 rounded-full active:opacity-50"
                  >
                     <Text className="text-base text-white text-center">
                        Continue with <Text className="font-bold">Apple</Text>
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => onSelectAuth(Strategy.Facebook)}
                     className="bg-stone-800 p-3 mt-8 rounded-full active:opacity-50"
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
