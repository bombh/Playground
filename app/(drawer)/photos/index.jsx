import { View, Text } from "react-native"
import React from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import { Link } from "expo-router"

const AnimatedList = () => {
   return (
      <>
         <ScreenDrawer title="Photos" />
         <View className="flex-1 items-center justify-center">
            <Text className="text-2xl mb-4">Photos</Text>
            <Link href="/photos/gallery">Go Gallery</Link>
            {/* <Link href="/photos/pictures">Go tmp photos</Link> */}
         </View>
      </>
   )
}

export default AnimatedList
