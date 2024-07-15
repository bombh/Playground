import { View, Text, ScrollView, Pressable } from "react-native"
import React from "react"
import { useNavigation } from "expo-router"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"

const AnimatedList = () => {
   const navigation = useNavigation()

   return (
      <>
         <ScreenDrawer title="" />
         <ScrollView className="flex-1">
            <Text className="m-5 pt-5 text-center text-2xl font-rock">A few small user interface tests</Text>

            <Pressable
               className="mx-5 mb-4 p-3 bg-white border border-stone-300 rounded-lg active:opacity-70 active:border-stone-400 "
               onPress={() => navigation.navigate("carousel1")}
            >
               <Text className="text-lg font-semibold mb-2 active:mb-5">Carousel 01</Text>
               <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum vehicula bibendum.</Text>
            </Pressable>

            <Pressable
               className="mx-5 mb-4 p-3 bg-white border border-stone-300 rounded-lg active:opacity-70 active:border-stone-400 "
               onPress={() => navigation.navigate("carousel2")}
            >
               <Text className="text-lg font-semibold mb-2">Carousel 02</Text>
               <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum vehicula bibendum.</Text>
            </Pressable>
         </ScrollView>
      </>
   )
}

export default AnimatedList
