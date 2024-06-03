import { View, Text } from "react-native"
import React from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"

const AnimatedList = () => {
   return (
      <>
         <ScreenDrawer title="UI Anim List" />
         <View className="flex-1 items-center justify-center">
            <Text>UI Animated List</Text>
         </View>
      </>
   )
}

export default AnimatedList
