/**
 * @name UIMaskedList
 * @description Tutorial with synced scroll between two FlatLists
 * @tutorial https://www.youtube.com/watch?v=yV-2HRzNX9o
 */

import { View, Text, Dimensions, FlatList, Animated, Platform, Image, StyleSheet } from "react-native"
import React, { useRef } from "react"
import MaskedView from "@react-native-masked-view/masked-view"
import Svg, { Rect } from "react-native-svg"
import { LinearGradient } from "expo-linear-gradient"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import MovieCard from "@/src/components/UIMaskedList/MovieCard"
import BackgroundCard from "@/src/components/UIMaskedList/BackgroundCard"

// Get local data
const jsonData = require("@/data/movies.json")
const data = [{ imdbID: "left-spacer" }, ...jsonData.movies, { imdbID: "right-spacer" }]

const { width, height } = Dimensions.get("window")
const ITEM_SIZE = width * 0.7
const BACKGROUND_HEIGHT = height * 0.6
const GAP_SIZE = 0

const Backdrop = ({ movies, scrollX }) => {
   return (
      <View style={{ height: BACKGROUND_HEIGHT, width, position: "absolute", backgroundColor: "black" }}>
         <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "white"]}
            style={{
               height: BACKGROUND_HEIGHT,
               width,
               position: "absolute",
               bottom: 0,
            }}
         />
      </View>
   )
}

const AnimatedList = () => {
   const _scrollX = useRef(new Animated.Value(0)).current

   return (
      <View className="bg-white flex-1">
         <ScreenDrawer title="UI Masked List" />

         <Backdrop
            movies={data}
            scrollX={_scrollX}
         />

         {/*** Background blurred images ***/}
         <View style={StyleSheet.absoluteFillObject}>
            {data.map((movie, index) => {
               // Set range for opacity
               const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE]
               const opacity = _scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 1, 0],
               })

               return (
                  <Animated.View
                     key={`bg-${movie.imdbID}`}
                     style={[StyleSheet.absoluteFillObject, { opacity }]}
                  >
                     <BackgroundCard
                        width={width}
                        height={BACKGROUND_HEIGHT}
                        poster={movie.poster}
                     />
                  </Animated.View>
               )
            })}
         </View>

         <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "white"]}
            style={{
               height: BACKGROUND_HEIGHT,
               width,
               position: "absolute",
               top: 0,
            }}
         />
         <Animated.FlatList
            data={data}
            contentContainerStyle={
               {
                  //marginVertical: 150,
                  //paddingVertical: ITEM_SIZE / 2,
                  //paddingHorizontal: 0,
               }
            }
            keyExtractor={(item) => item.imdbID.toString()}
            getItemLayout={(data, index) => ({
               length: ITEM_SIZE,
               offset: ITEM_SIZE * index,
               index,
            })}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
            bounces={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
               [
                  {
                     nativeEvent: { contentOffset: { x: _scrollX } },
                  },
               ],
               {
                  useNativeDriver: true,
               }
            )}
            renderItem={({ item, index }) => (
               <MovieCard
                  index={index}
                  _scrollX={_scrollX}
                  {...item}
               />
            )}
         />
      </View>
   )
}

export default AnimatedList
