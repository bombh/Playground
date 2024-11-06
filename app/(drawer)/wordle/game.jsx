import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { InformationCircleIcon, ChartBarIcon, Cog8ToothIcon } from "react-native-heroicons/solid"

import ScreenKeyboard from "@/src/components/wordle/ScreenKeyboard"

const ROWS = 6
const word = "hello"

const Game = () => {
   const router = useRouter()

   const [rows, setRows] = useState(new Array(ROWS).fill(new Array(5).fill("")))
   const [currentRow, setCurrentRow] = useState(0)
   const [currentCol, setCurrentCol] = useState(0)

   // const [greenLetters, setGreenLetters] = useState(new Array(5).fill(""))
   // const [yellowLetters, setYellowLetters] = useState(new Array(5).fill(""))
   // const [greyLetters, setGreyLetters] = useState(new Array(5).fill(""))
   const [greenLetters, setGreenLetters] = useState([])
   const [yellowLetters, setYellowLetters] = useState([])
   const [greyLetters, setGreyLetters] = useState([])

   const addKey = (key) => {
      console.log("addKey", key)
   }

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
               headerRight: () => (
                  <View className="flex-row gap-3">
                     <Pressable className="active:opacity-50">
                        <InformationCircleIcon
                           size={24}
                           color="#000"
                        />
                     </Pressable>
                     <Pressable className="active:opacity-50">
                        <ChartBarIcon
                           size={24}
                           color="#000"
                        />
                     </Pressable>
                     <Pressable className="active:opacity-50">
                        <Cog8ToothIcon
                           size={24}
                           color="#000"
                        />
                     </Pressable>
                  </View>
               ),
            }}
         />

         {/* Main page */}
         <View className="flex-1 p-5">
            {/* Game field */}
            {rows.map((row, rowIndex) => (
               <View
                  key={`row-${rowIndex}`}
                  className="w-full flex-row mt-3 justify-between
                  "
               >
                  {row.map((col, colIndex) => (
                     <View
                        key={`col-${rowIndex}-${colIndex}`}
                        className="w-1/6 aspect-square border border-black justify-center items-center"
                     >
                        <Text className="font-bold text-2xl uppercase">{col}</Text>
                     </View>
                  ))}
               </View>
            ))}

            {/* Keyboard */}
            <ScreenKeyboard
               onKeyPressed={addKey}
               greenLetters={greenLetters}
               yellowLetters={yellowLetters}
               greyLetters={greyLetters}
            />
         </View>
      </>
   )
}

export default Game
