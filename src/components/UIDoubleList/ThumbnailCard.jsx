import { View, Text, Image, Pressable } from "react-native"
import React from "react"
import colors from "tailwindcss/colors"

const ThumbnailCard = ({ thumbnail, index, activeIndex, scrollToActiveIndex }) => {
   // aa

   // Render
   return (
      <Pressable
         className="mx-4 rounded-md"
         style={{
            borderWidth: 1,
            borderColor: activeIndex === index ? "white" : "transparent",
         }}
         onPress={() => scrollToActiveIndex(index)}
      >
         <Image
            source={{ uri: thumbnail }}
            style={{
               width: 80,
               height: 120,
               opacity: activeIndex === index ? 0.3 : 1,
            }}
            className="rounded-md shadow-lg"
         />
      </Pressable>
   )
}

export default ThumbnailCard
