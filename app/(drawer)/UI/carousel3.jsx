import { View, Text, FlatList } from "react-native"
import React from "react"

import ScreenStackFull from "@/src/layouts/ScreenStackFull"

const AnimatedList = () => {
   return (
      <>
         <ScreenStackFull />
         <View className="flex-1">
            <FlatList
               data={data}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ alignItems: "center", gap: 20, paddingHorizontal: 20 }}
               renderItem={({ item, index }) => <View className="w-64 h-64 bg-gray-300 m-2 rounded-lg" />}
            />
         </View>
      </>
   )
}

const data = [
   { id: 1, image: require("@/assets/images/city/01.jpg") },
   { id: 2, image: require("@/assets/images/city/02.jpg") },
   { id: 3, image: require("@/assets/images/city/03.jpg") },
   { id: 4, image: require("@/assets/images/city/04.jpg") },
   { id: 5, image: require("@/assets/images/city/05.jpg") },
   { id: 6, image: require("@/assets/images/city/06.jpg") },
   { id: 7, image: require("@/assets/images/city/07.jpg") },
   { id: 8, image: require("@/assets/images/city/08.jpg") },
   { id: 9, image: require("@/assets/images/city/09.jpg") },
   { id: 10, image: require("@/assets/images/city/10.jpg") },
]

export default AnimatedList
