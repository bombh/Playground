import { View, Text } from "react-native"
import React from "react"
import ScreenStackFull from "@/src/layouts/ScreenStackFull"
import { SafeAreaView } from "react-native-safe-area-context"

const Game = () => {
   return (
      <>
         <ScreenStackFull title="UI Double List" />
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
