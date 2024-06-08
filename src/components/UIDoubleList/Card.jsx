import { View, Text, Image, Dimensions } from "react-native"
import React from "react"

const { width, height } = Dimensions.get("window")

const Card = ({ title, thumbnail, director, year }) => {
   return (
      <View
         style={{ width }}
         className="items-center mt-16"
      >
         <View
            style={{ maxWidth: 324 }}
            className="bg-black/50 p-3 rounded-xl border border-black/50"
         >
            <Text
               numberOfLines={1}
               className="text-stone-200 text-xl text-center font-bold"
            >
               {title}
            </Text>
            <Image
               source={{ uri: thumbnail }}
               style={{ width: 300, height: 445 }}
               className=" my-2"
            />
            <Text className="text-stone-300 text-sm text-center">
               {director} ({year})
            </Text>
         </View>
      </View>
   )
}

export default Card
