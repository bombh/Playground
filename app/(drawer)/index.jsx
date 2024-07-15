import { View, Text, ScrollView } from "react-native"
import React from "react"

import { BeakerIcon } from "react-native-heroicons/outline"
import colors from "tailwindcss/colors"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"

const Home = () => {
   return (
      <>
         <ScreenDrawer title="" />
         <View className="flex-1 items-center justify-center bg-white">
            <View className="-mt-24">
               <BeakerIcon
                  size={150}
                  color={colors.lime[400]}
               />
            </View>
            <View className="pb-5">
               <Text className="text-lime-500 text-center text-xl pt-3 font-rock tracking-widest">Playground</Text>
               <Text className="text-stone-500 text-center text-xs -mt-2">by bomb.H</Text>
            </View>
         </View>
      </>
   )
}

export default Home
