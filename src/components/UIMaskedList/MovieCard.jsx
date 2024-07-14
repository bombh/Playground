import { View, Text, Image, Dimensions, Animated } from "react-native"
import React from "react"

const { width, height } = Dimensions.get("window")
const ITEM_SIZE = width * 0.7

const MovieCard = ({ index, title, thumbnail, director, year, plot, _scrollX }) => {
   const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE]
   const translateY = _scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
   })

   return (
      <Animated.View
         className="bg-blue-100 rounded-2xl"
         style={{ width: ITEM_SIZE, transform: [{ translateY }] }}
      >
         <View
            className="items-center p-5"
            // style={{ width: ITEM_SIZE }}
         >
            <Image
               source={{ uri: thumbnail }}
               style={{ width: ITEM_SIZE * 0.8, height: ITEM_SIZE * 1.2 }}
               resizeMode="cover"
               className="my-2 rounded-2xl"
            />
            <Text
               style={{ maxWidth: ITEM_SIZE }}
               numberOfLines={1}
               className="text-stone-800 text-lg font-semibold text-center px-2"
            >
               {title}
            </Text>
            <Text className="text-stone-800 text-base text-center">
               {director} ({year})
            </Text>
            <Text
               style={{ maxWidth: ITEM_SIZE * 0.8 }}
               className="text-stone-800 text-xs text-justify mt-2"
               numberOfLines={5}
            >
               {plot}
            </Text>
         </View>
      </Animated.View>
   )
}

export default MovieCard
