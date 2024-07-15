import { View, Text } from "react-native"
import React from "react"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"

const Home = () => {
   return (
      <>
         <ScreenDrawer title="Home" />
         <View>
            <Text>Home</Text>
         </View>
      </>
   )
}

export default Home
