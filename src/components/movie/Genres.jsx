import { View, Text } from "react-native"
import React from "react"

const Genres = ({ genres }) => {
   const genre = genres.split(", ")

   return (
      <View className="flex-row space-x-2 mt-2">
         {genre.map((genre, index) => (
            <View
               key={index}
               className="bg-white rounded-xl border border-stone-200 px-2 py-0"
            >
               <Text className="text-stone-400 text-xs ">{genre}</Text>
            </View>
         ))}
      </View>
   )
}

export default Genres
