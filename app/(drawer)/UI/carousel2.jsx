/**
 * @name UICarousel02
 * @description Tutorial with synced scroll between two FlatLists
 * @tutorial https://www.youtube.com/watch?v=gOj4BlzYF4A blurred background images
 * @tutorial https://www.youtube.com/watch?v=gjC2oUJhePE thumbnail images
 */

import { View, FlatList, Animated, Dimensions, Image, StyleSheet } from "react-native"
import React, { useRef, useState } from "react"
import ScreenStackFull from "@/src/layouts/ScreenStackFull"

import MovieCard from "@/src/components/UICarousel02/MovieCard"
import BackgroundCard from "@/src/components/UICarousel02/BackgroundCard"
import ThumbnailCard from "@/src/components/UICarousel02/ThumbnailCard"

// Get local data
const data = require("@/data/movies.json")

const AnimatedList = () => {
   const [activeIndex, setActiveIndex] = useState(0)

   const { width, height } = Dimensions.get("window")

   const _scrollX = useRef(new Animated.Value(0)).current
   const _movieRef = useRef(null)
   const _thumbnailRef = useRef(null)

   const scrollToActiveIndex = (index, movieRefUpdate) => {
      setActiveIndex(index)

      if (movieRefUpdate) {
         _movieRef?.current?.scrollToIndex({
            index,
            animated: true,
         })
      }

      _thumbnailRef?.current?.scrollToIndex({
         index,
         animated: true,
         viewPosition: 0.5,
      })
   }

   return (
      <>
         <ScreenStackFull title="UI Double List" />

         {/*** Background blurred images ***/}
         <View
            style={StyleSheet.absoluteFillObject}
            className="bg-black"
         >
            {data.movies.map((movie, index) => {
               // Set range for opacity
               const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
               const opacity = _scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 0.5, 0],
               })

               return (
                  <Animated.View
                     key={`bg-${movie.imdbID}`}
                     style={[StyleSheet.absoluteFillObject, { opacity }]}
                  >
                     <BackgroundCard {...movie} />
                  </Animated.View>
               )
            })}
         </View>

         {/*** Movie cards ***/}
         <Animated.FlatList
            data={data.movies}
            ref={_movieRef}
            keyExtractor={(item) => item.imdbID.toString()}
            getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <MovieCard {...item} />}
            onScroll={Animated.event(
               [
                  {
                     nativeEvent: {
                        contentOffset: {
                           x: _scrollX,
                        },
                     },
                  },
               ],
               { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(event) => {
               scrollToActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width), false)
            }}
         />

         {/*** Thumbnails ***/}
         <View className="absolute bottom-10 left-0 right-0 mx-5">
            <FlatList
               data={data.movies}
               ref={_thumbnailRef}
               keyExtractor={(item) => item.imdbID.toString()}
               horizontal
               showsHorizontalScrollIndicator={false}
               renderItem={({ item, index }) => (
                  <ThumbnailCard
                     {...item}
                     index={index}
                     activeIndex={activeIndex}
                     scrollToActiveIndex={scrollToActiveIndex}
                  />
               )}
            />
         </View>
      </>
   )
}

export default AnimatedList
