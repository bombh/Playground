import { View, Text } from "react-native"
import React from "react"
import { Stack } from "expo-router"

const GalleryLayout = () => {
   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen
            name="gallery"
            options={{
               // cardStyleInterpolator: ({ current }) => ({
               //    cardStyle: {
               //       opacity: current.progress,
               //    },
               // }),
               gestureEnabled: false,
               presentation: "fullScreenModal",
            }}
         />
         <Stack.Screen
            name="pictures"
            options={{
               gestureEnabled: false,
            }}
         />
      </Stack>
   )
}

export default GalleryLayout
