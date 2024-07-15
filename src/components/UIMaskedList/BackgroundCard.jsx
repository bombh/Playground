import { View, Text, Image, StyleSheet } from "react-native"
import React from "react"

const BackgroundCard = ({ poster, width, height }) => {
   if (!poster) return null

   return (
      <Image
         source={{ uri: poster }}
         style={{
            width: width,
            height: height,
         }}
         resizeMode="cover"
         blurRadius={2}
      />
   )
}

export default BackgroundCard
