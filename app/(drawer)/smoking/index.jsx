import { View, Text } from "react-native"
import React from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import { set, format, differenceInMinutes, differenceInDays, differenceInHours, differenceInSeconds } from "date-fns"
import { ArrowTrendingUpIcon } from "react-native-heroicons/outline"
import colors from "tailwindcss/colors"

const begin = new Date(2025, 0, 5, 2, 0, 0, 0)

const AnimatedList = () => {
   return (
      <>
         <ScreenDrawer title="No smoking" />
         <View
            className="flex-1 items-center"
            lineBreakAll
         >
            <View className="m-12 bg-black p-1 rounded-lg ">
               <ArrowTrendingUpIcon
                  size={100}
                  color={colors.white}
               />
            </View>
            <View className="bg-stone-400 px-5 py-2 rounded-lg">
               <Text className="text-2xl text-white">Stop smoking</Text>
            </View>
            <Text className="text-lg font-bold text-stone-400 text-center mt-4 mb-10">
               {format(begin, "dd MMMM yyyy")}
               {" - "}
               {format(begin, "HH:mm")}
            </Text>

            <View className="bg-stone-600 px-5 py-2 rounded-lg">
               <Text className="text-2xl text-white">Progress ...</Text>
            </View>
            <Text className="text-lg text-stone-700 text-center mt-4 mb-12">
               <Text className="font-bold">{differenceInDays(new Date(), begin)} </Text>
               days
               {"\n ( "}
               <Text className="font-bold">{differenceInMinutes(new Date(), begin)} </Text>
               minutes )
            </Text>

            <View className="bg-red-500 p-5 rounded-lg items-center">
               <Text className="text-4xl text-white ">
                  <Text className="font-bold">{differenceInDays(new Date(), begin) * 11}</Text>€
               </Text>
               <Text className="text-white">savings</Text>
            </View>
         </View>
      </>
   )
}

export default AnimatedList
