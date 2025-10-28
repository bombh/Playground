/**
 * @name Wordle
 * @description The main screen of the Wordle game
 * @tutorial https://www.youtube.com/watch?v=pTonpjmKtiE
 */

import { View, Text, Pressable } from "react-native"
import React from "react"
import { Link } from "expo-router"
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo"
import { Squares2X2Icon } from "react-native-heroicons/outline"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"
// import SubscribeModal from "@/src/components/wordle/SubscribeModal"

const Wordle = () => {
   const { signOut } = useAuth()
   // const _subscribeModalRef = useRef(null)

   // const openSubscribeModal = () => {
   //    _subscribeModalRef.current?.snapToIndex(0)
   // }

   return (
      <>
         <ScreenDrawer title="" />
         <View className="flex-1 items-center justify-center bg-white gap-y-3">
            <View className="items-center">
               <Squares2X2Icon
                  size={120}
                  color="#84cc16"
               />
               <Text className="font-rock text-3xl mt-4 pt-5">Wordle</Text>
               <Text className="text-lg text-stone-400 text-center px-20">
                  Get 6 chances to guess a five-letter word
               </Text>
            </View>

            <View className="w-full px-16">
               <Link
                  href="/wordle/game"
                  asChild
               >
                  <Pressable className="bg-stone-800 p-3 mt-4 rounded-full active:opacity-70">
                     <Text className="text-base text-white text-center">Play</Text>
                  </Pressable>
               </Link>

               <SignedOut>
                  <Link
                     href="/wordle/login"
                     asChild
                  >
                     <Pressable className="border border-stone-800 p-3 mt-4 rounded-full active:opacity-50">
                        <Text className="text-base text-stone-800 text-center">Log In</Text>
                     </Pressable>
                  </Link>
               </SignedOut>

               <SignedIn>
                  <Pressable
                     onPress={() => signOut()}
                     className="border border-stone-800 p-3 mt-4 rounded-full active:opacity-50"
                  >
                     <Text className="text-base text-stone-800 text-center">Log Out</Text>
                  </Pressable>
               </SignedIn>

               {/* Temporarily disabled - SubscribeModal has compatibility issues
               <Pressable
                  className="border  border-stone-800 p-3 mt-4 rounded-full active:opacity-50"
                  onPress={openSubscribeModal}
               >
                  <Text className="text-base text-stone-800 text-center">Subscribe</Text>
               </Pressable>
               */}
            </View>

            <View className="items-center absolute bottom-10 gap-y-1">
               <Text className="text-xs text-center text-stone-500">Made using</Text>
               <Text className="text-xs text-center text-stone-500 font-bold">Clerk • Firebase • Moti</Text>
            </View>
            {/* <SubscribeModal ref={_subscribeModalRef} /> */}
         </View>
      </>
   )
}

export default Wordle
