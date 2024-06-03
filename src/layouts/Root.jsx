import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const RootLayout = () => {
   return (
      <GestureHandlerRootView className="flex-1">
         <StatusBar hidden={true} />
         <Slot />
      </GestureHandlerRootView>
   )
}

export default RootLayout
