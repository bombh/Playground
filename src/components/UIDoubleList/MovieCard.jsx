import { View, Text, Image, Dimensions } from "react-native"
import React from "react"

const { width, height } = Dimensions.get("window")

const MovieCard = ({ title, thumbnail, director, year }) => {
   return (
      <View
         style={{ width }}
         className="mt-10 items-center"
      >
         <View
            style={{ maxWidth: 288 }}
            className="bg-black/50 px-6 py-4 rounded-xl"
         >
            <Text
               numberOfLines={1}
               className="text-stone-200 text-lg text-center px-2"
            >
               {title}
            </Text>
            <Image
               source={{ uri: thumbnail }}
               style={{ width: 240, height: 360 }}
               resizeMode="contain"
               className="my-2"
            />
            <Text className="text-stone-300 text-sm text-center">
               {director} ({year})
            </Text>
         </View>
      </View>
   )
}

export default MovieCard
