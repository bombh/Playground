import { View, Text, Image, StyleSheet } from "react-native"
import React from "react"

const BackgroundCard = ({ poster }) => {
   return (
      <Image
         source={{ uri: poster }}
         className="w-full h-full"
         blurRadius={30}
      />
   )
}

export default BackgroundCard
