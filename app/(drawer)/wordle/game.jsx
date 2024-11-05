import { View, Text } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack } from "expo-router"

const Game = () => {
   return (
      <>
         <Stack.Screen
            options={{
               headerShown: true,
               headerBackTitleVisible: false,
               headerTitle: "Wordle",
               headerTitleStyle: {
                  fontFamily: "RockSalt-Regular",
                  fontSize: 20,
               },
               headerTintColor: "#000",
            }}
         />
         <SafeAreaView>
            <View className="items-center justify-center">
               <Text className="text-3xl font-rock mt-4 pt-5">Wordle</Text>
               <Text className="text-lg text-stone-400 text-center px-20">
                  Get 6 chances to guess a five-letter word
               </Text>
            </View>
         </SafeAreaView>
      </>
   )
}

export default Game
