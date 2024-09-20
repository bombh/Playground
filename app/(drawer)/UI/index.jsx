import { View, Text, ScrollView, Pressable } from "react-native"
import React from "react"
import { useNavigation } from "expo-router"

import ScreenDrawer from "@/src/layouts/ScreenDrawer"
import ListItem from "@/src/components/home/ListItem"

const AnimatedList = () => {
   const navigation = useNavigation()

   return (
      <>
         <ScreenDrawer title="" />
         <ScrollView className="flex-1">
            <Text className="m-5 pt-5 text-center text-2xl font-rock">A few small user interface tests</Text>

            <ListItem
               title="Carousel 1"
               description="Animated • FlatList"
               link="carousel1"
            />

            <ListItem
               title="Carousel 2"
               description="Animated • 2 FlatLists synced"
               link="carousel2"
            />

            <ListItem
               title="Carousel 3"
               description="Parallax effect"
               link="carousel3"
            />
         </ScrollView>
      </>
   )
}

export default AnimatedList
