import { useLocalSearchParams, useNavigation, Link } from "expo-router"
import { useCallback, useEffect, useRef, useState } from "react"
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AwesomeGallery from "react-native-awesome-gallery"
import { Image } from "expo-image"
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from "react-native-reanimated"

// Get local data
const jsonData = require("@/data/movies.json")
const images = jsonData.movies.map((item) => item.poster)

const renderItem = ({ item, setImageDimensions }) => {
   return (
      <Image
         source={item}
         style={StyleSheet.absoluteFillObject}
         contentFit="contain"
         onLoad={(e) => {
            const { width, height } = e.source
            setImageDimensions({ width, height })
         }}
      />
   )
}

const DetailGallery = () => {
   const gallery = useRef(null)
   const { setParams, goBack, isFocused } = useNavigation()

   const onIndexChange = useCallback(
      (index) => {
         console.log("index", index)
         isFocused && setParams({ index })
      },
      [isFocused, setParams]
   )

   return (
      <View className="bg-black flex-1">
         <AwesomeGallery
            ref={gallery}
            data={images}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            initialIndex={0}
            numToRender={3}
            doubleTapInterval={150}
            onIndexChange={onIndexChange}
            onSwipeToClose={goBack}
            onScaleEnd={(scale) => {
               if (scale < 0.7) {
                  goBack()
               }
            }}
            disableTransitionOnScaledImage
            hideAdjacentImagesOnScaledImage
            loop
         />
         <Link href="/photos">Back Photos</Link>
      </View>
   )
}

export default DetailGallery
