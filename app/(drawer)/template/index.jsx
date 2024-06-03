import { View, Text } from "react-native"
import React from "react"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"

const AnimatedList = () => {
   return (
      <>
         <ScreenDrawer title="Template" />
         <View className="flex-1 items-center justify-center">
            <Text>Template</Text>
         </View>
      </>
   )
}

export default AnimatedList
