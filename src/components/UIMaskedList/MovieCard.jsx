import { View, Text, Image, Dimensions, Animated } from "react-native"
import React from "react"
import Rating from "../movie/Rating"
import { styled } from "nativewind"

const { width, height } = Dimensions.get("window")
const ITEM_SIZE = width * 0.7
const OUTER_SIZE = (width - ITEM_SIZE) / 2

const SRating = styled(Rating)

const MovieCard = ({ index, title, thumbnail, director, year, imdbRating, plot, _scrollX }) => {
   // If dummy outer items, return a view
   if (!title) return <View style={{ width: OUTER_SIZE, height: ITEM_SIZE }} />

   const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE]
   const translateY = _scrollX.interpolate({
      inputRange,
      outputRange: [height / 4, height / 6, height / 4],
   })

   return (
      <Animated.View
         className="px-4"
         style={{ width: ITEM_SIZE, transform: [{ translateY }] }}
      >
         <View
            className="bg-white rounded-2xl items-center pt-1 pb-5"
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
               className="text-stone-800 text-lg font-bold text-center px-2"
            >
               {title}
            </Text>
            <Text className="text-stone-500 text-sm text-center px-2 pb-1">
               {director} ({year})
            </Text>
            <Rating rating={imdbRating} />
            <Text
               style={{ maxWidth: ITEM_SIZE * 0.8 }}
               className="text-stone-800 text-xs text-justify px-2 mt-2"
               numberOfLines={5}
            >
               {plot}
            </Text>
         </View>
      </Animated.View>
   )
}

export default MovieCard
