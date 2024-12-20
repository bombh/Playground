/**
 * @name Wordle
 * @description The main screen of the Wordle game
 * @tutorial https://www.youtube.com/watch?v=pTonpjmKtiE
 */

import { View, Text, Pressable } from "react-native"
import React, { useRef } from "react"
import { Link } from "expo-router"
import { format } from "date-fns"
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import Icon from "@/assets/images/wordle/icon.svg"
import SubscribeModal from "@/src/components/wordle/SubscribeModal"
import Letter from "@/src/components/wordle/Letter"

const Wordle = () => {
   const { signOut } = useAuth()
   const _subscribeModalRef = useRef(null)

   const openSubscribeModal = () => {
      _subscribeModalRef.current?.snapToIndex(0)
   }

   return (
      <>
         <ScreenDrawer title="" />
         <View className="flex-1 items-center justify-center bg-white gap-y-3">
            <View className="items-center">
               <Icon
                  width="120"
                  height="120"
                  className="-mt-20"
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

               <Pressable
                  className="border  border-stone-800 p-3 mt-4 rounded-full active:opacity-50"
                  onPress={openSubscribeModal}
               >
                  <Text className="text-base text-stone-800 text-center">Subscribe</Text>
               </Pressable>
            </View>

            <View className="items-center absolute bottom-10 gap-y-1">
               <Text className="text-xs text-center text-stone-500">Made using</Text>
               <Text className="text-xs text-center text-stone-500 font-bold">Clerk • Firebase • Reanimated</Text>
               {/* <Text className="text-xs text-stone-500 font-bold">{format(new Date(), "EEEE d MMM yyyy")}</Text>
               <Text className="text-xs text-stone-500">by bomb.H</Text> */}
            </View>
            <SubscribeModal ref={_subscribeModalRef} />
         </View>
      </>
   )
}

export default Wordle
