/**
 * @name UI Carousel 3
 * @description Tutorial with parallax effect
 * @tutorial https://www.youtube.com/watch?v=fSuYM86JXFo
 */

import { View, Text, FlatList, Dimensions, Image, Animated, SafeAreaView } from "react-native"
import React, { useRef } from "react"

import ScreenStackFull from "@/src/layouts/ScreenStackFull"

const { width, height } = Dimensions.get("window")
const ITEM_WIDTH = width * 0.75
const ITEM_HEIGHT = ITEM_WIDTH * 1.5

const AnimatedList = () => {
   const _scrollX = useRef(new Animated.Value(0)).current

   return (
      <>
         <ScreenStackFull />
         <SafeAreaView>
            <Text className="text-3xl text-stone-700 font-rock mt-8 mb-4 pt-5 text-center">Parallax</Text>

            <Animated.FlatList
               data={data}
               keyExtractor={(item) => item.id.toString()}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ alignItems: "center" }}
               onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: _scrollX } } }], {
                  useNativeDriver: true,
               })}
               renderItem={({ item, index }) => {
                  const inputRange = [(index - 1) * width, index * width, (index + 1) * width]
                  const translateX = _scrollX.interpolate({
                     inputRange,
                     outputRange: [-width * 0.7, 0, width * 0.7],
                  })

                  return (
                     <View className="w-screen items-center">
                        <View className="bg-white rounded-xl shadow p-5">
                           <View
                              className="overflow-hidden items-center rounded-lg"
                              style={{
                                 width: ITEM_WIDTH,
                                 height: ITEM_HEIGHT,
                              }}
                           >
                              <Animated.Image
                                 source={item.image}
                                 resizeMode="cover"
                                 style={{
                                    width: ITEM_WIDTH * 1.2,
                                    height: ITEM_HEIGHT,
                                    transform: [{ translateX }],
                                 }}
                              />
                           </View>
                           <Text className="text-xl text-stone-500 font-rock mt-2 text-center pt-5">{item.city}</Text>
                        </View>
                     </View>
                  )
               }}
            />
         </SafeAreaView>
      </>
   )
}

const data = [
   { id: 1, city: "New-York", image: require("@/assets/images/city/01.jpg") },
   { id: 2, city: "Los Angeles", image: require("@/assets/images/city/02.jpg") },
   { id: 3, city: "Tokyo", image: require("@/assets/images/city/03.jpg") },
   { id: 4, city: "Brooklin", image: require("@/assets/images/city/04.jpg") },
   { id: 5, city: "East River", image: require("@/assets/images/city/05.jpg") },
   { id: 6, city: "Paris", image: require("@/assets/images/city/06.jpg") },
   { id: 7, city: "Berlin", image: require("@/assets/images/city/07.jpg") },
   { id: 8, city: "Roma", image: require("@/assets/images/city/08.jpg") },
   { id: 9, city: "Brussels", image: require("@/assets/images/city/09.jpg") },
   { id: 10, city: "Amsterdam", image: require("@/assets/images/city/10.jpg") },
]

export default AnimatedList
