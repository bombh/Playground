import { View, Text, ScrollView, Button, Pressable } from "react-native"
import React, { useState } from "react"
import Card from "./Card"

const CardList = ({ data }) => {
   // Hooks
   const [movies, setMovies] = useState(data)

   function handleAdd() {
      const randomId = Math.floor(Math.random() * 5)
      setMovies([{ ...data[randomId], id: Date.now().toString() }, ...movies])
   }

   function handleDelete() {
      setMovies([...movies.slice(1)])
   }

   // Render
   return (
      <>
         <View className="flex flex-row items-center justify-evenly mt-4">
            <Pressable
               className="px-5 py-2 rounded-md active:bg-gray-300 active:text-white"
               onPress={handleDelete}
            >
               <Text className="text-center text-lg">Remove</Text>
            </Pressable>

            <Pressable
               className="px-5 py-2 rounded-md active:bg-gray-300 active:text-white"
               onPress={handleAdd}
            >
               <Text className="text-center text-lg">Add</Text>
            </Pressable>
         </View>

         <ScrollView className="px-4 mt-2">
            {movies.map((movie) => (
               <Card
                  key={movie.id}
                  {...movie}
               />
            ))}
            <View className="h-10"></View>
         </ScrollView>
      </>
   )
}

export default CardList
