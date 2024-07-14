import { View, Text, Image, Dimensions, Animated } from "react-native"
import React from "react"
import MaskedView from "@react-native-masked-view/masked-view"
import Svg, { Rect } from "react-native-svg"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")
const ITEM_SIZE = width * 0.7
const GAP_SIZE = 0
const OUTER_SIZE = (width - ITEM_SIZE) / 2

const MovieCard = ({ index, title, thumbnail, director, year, plot, _scrollX }) => {
   // If dummy outer items, return a view
   if (!title) return <View style={{ width: OUTER_SIZE, height: ITEM_SIZE }} />

   const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE]
   const translateY = _scrollX.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
   })

   return (
      <Animated.View
         className="px-2"
         style={{ width: ITEM_SIZE, marginTop: height / 6, transform: [{ translateY }] }}
      >
         <View
            className="bg-white rounded-2xl items-center py-5"
            // style={{ width: ITEM_SIZE }}
         >
            <Image
               source={{ uri: thumbnail }}
               style={{ width: ITEM_SIZE * 0.8, height: ITEM_SIZE * 1.2 }}
               resizeMode="cover"
               className="my-2 rounded-2xl"
            />
            <Text
               style={{ maxWidth: ITEM_SIZE * 0.8 }}
               numberOfLines={1}
               className="text-stone-800 text-lg font-semibold text-center px-2"
            >
               {title}
            </Text>
            <Text className="text-stone-800 text-sm text-center">
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
