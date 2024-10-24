/**
 * @tutorial https://www.youtube.com/watch?v=pTonpjmKtiE
 */

import { View, Text, Pressable } from "react-native"
import React from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import Icon from "@/assets/images/wordle/icon.svg"
import { Link } from "expo-router"
import { format } from "date-fns"

const Wordle = () => {
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

            <View className="w-full px-16 gap-y-5">
               <Link
                  href="/wordle/game"
                  asChild
               >
                  <Pressable className="bg-stone-800 p-3 rounded-full active:opacity-70">
                     <Text className="text-base text-white text-center">Play</Text>
                  </Pressable>
               </Link>

               <Link
                  href="/wordle/game"
                  asChild
               >
                  <Pressable className="border  border-stone-800 p-3 rounded-full active:opacity-50">
                     <Text className="text-base text-stone-800 text-center">Log In</Text>
                  </Pressable>
               </Link>

               <Link
                  href="/wordle/game"
                  asChild
               >
                  <Pressable className="border  border-stone-800 p-3 rounded-full active:opacity-50">
                     <Text className="text-base text-stone-800 text-center">Subscribe</Text>
                  </Pressable>
               </Link>
            </View>

            <View className="items-center absolute bottom-8">
               <Text className="text-xs text-stone-500 font-bold">{format(new Date(), "EEEE d MMM yyyy")}</Text>
               <Text className="text-xs text-stone-500">by bomb.H</Text>
            </View>
         </View>
      </>
   )
}

export default Wordle
