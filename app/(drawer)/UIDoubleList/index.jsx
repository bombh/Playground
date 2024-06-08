/**
 * @name UIDoubleList
 * @description Tutorial with synced scroll between two FlatLists
 * @tutorial https://www.youtube.com/watch?v=gOj4BlzYF4A
 */

import { View, Text, FlatList, Animated, Dimensions, Image, StyleSheet } from "react-native"
import React, { useRef } from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"

import Card from "@/src/components/UIDoubleList/Card"
import BackgroundCard from "@/src/components/UIDoubleList/BackgroundCard"
import ThumbnailCard from "@/src/components/UIDoubleList/ThumbnailCard"

const data = require("@/data/movies.json")

const AnimatedList = () => {
   const { width, height } = Dimensions.get("window")
   const scrollX = useRef(new Animated.Value(0)).current

   return (
      <>
         <ScreenDrawer title="UI Multi List" />

         {/* Background blurred images */}
         <View style={StyleSheet.absoluteFillObject}>
            {data.movies.map((movie, index) => {
               // Set range for opacity
               const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
               const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 1, 0],
               })

               return (
                  <Animated.View style={[StyleSheet.absoluteFillObject, { opacity }]}>
                     <BackgroundCard {...movie} />
                  </Animated.View>
               )
            })}
         </View>

         {/* Main cards */}
         <Animated.FlatList
            data={data.movies}
            keyExtractor={(item) => item.imdbID.toString()}
            horizontal
            pagingEnabled
            renderItem={({ item }) => <Card {...item} />}
            onScroll={Animated.event(
               [
                  {
                     nativeEvent: {
                        contentOffset: {
                           x: scrollX,
                        },
                     },
                  },
               ],
               { useNativeDriver: true }
            )}
         />

         {/* Thumbnails */}
         <View className=""></View>
      </>
   )
}

export default AnimatedList
