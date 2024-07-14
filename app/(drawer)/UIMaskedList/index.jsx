/**
 * @name UIMaskedList
 * @description Tutorial with synced scroll between two FlatLists
 * @tutorial https://www.youtube.com/watch?v=yV-2HRzNX9o
 */

import { View, Text, Dimensions, FlatList, Animated } from "react-native"
import React, { useRef } from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import MovieCard from "@/src/components/UIMaskedList/MovieCard"

// Get local data
const data = require("@/data/movies.json")

const AnimatedList = () => {
   const { width } = Dimensions.get("window")
   const ITEM_SIZE = width * 0.7
   const GAP_SIZE = 20
   const _scrollX = useRef(new Animated.Value(0)).current

   return (
      <>
         <ScreenDrawer title="UI Masked List" />
         <Animated.FlatList
            data={data.movies}
            contentContainerStyle={{
               paddingVertical: ITEM_SIZE / 3,
               paddingHorizontal: 0,
               gap: GAP_SIZE,
            }}
            keyExtractor={(item) => item.imdbID.toString()}
            // getItemLayout={(data, index) => ({
            //    length: ITEM_SIZE + GAP_SIZE,
            //    offset: (ITEM_SIZE + GAP_SIZE) * index,
            //    index,
            // })}
            horizontal
            snapToInterval={ITEM_SIZE + GAP_SIZE}
            decelerationRate={0}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: _scrollX } } }], {
               useNativeDriver: true,
            })}
            renderItem={({ item, index }) => (
               <MovieCard
                  index={index}
                  _scrollX={_scrollX}
                  {...item}
               />
            )}
         />
      </>
   )
}

export default AnimatedList
