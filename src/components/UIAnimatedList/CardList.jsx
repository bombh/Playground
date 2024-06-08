import { View, Text, ScrollView, Button, Pressable } from "react-native"
import React, { useState } from "react"
import { FilmIcon } from "react-native-heroicons/outline"
import Card from "./Card"

const CardList = ({ data }) => {
   // Hooks
   const [movies, setMovies] = useState(data)

   const handleAdd = () => {
      const randomId = Math.floor(Math.random() * 5)
      setMovies([{ ...data[randomId], id: Date.now().toString() }, ...movies])
   }

   const handleDeleteById = (id) => {
      //setMovies(movies.dele)
      setMovies(movies.filter((movie, i) => id !== i))
   }

   // Render
   return (
      <>
         <ScrollView className="px-4 mt-2">
            <Pressable
               className="text-white bg-black my-5 px-5 py-2 rounded-md active:opacity-70"
               onPress={handleAdd}
            >
               <View className="flex-row space-x-2 items-center justify-center">
                  <FilmIcon
                     size={22}
                     color="white"
                  />
                  <Text className="text-center text-white text-lg">Add movie</Text>
               </View>
            </Pressable>
            {movies.map((movie, index) => (
               <Card
                  key={movie.id}
                  handleDelete={() => handleDeleteById(index)}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
               />
            ))}
            <View className="h-10"></View>
         </ScrollView>
      </>
   )
}

export default CardList
