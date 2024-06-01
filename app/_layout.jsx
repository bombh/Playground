import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

const RootLayout = () => {
   return (
      <>
         <StatusBar hidden={true} />
         <Slot />
      </>
   )
}

export default RootLayout
