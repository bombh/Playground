import { View, Text, Pressable } from "react-native"
import React, { useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { InformationCircleIcon, ChartBarIcon, Cog8ToothIcon } from "react-native-heroicons/solid"
import colors from "tailwindcss/colors"

import { words } from "@/data/targetWords"
import ScreenKeyboard, { ENTER, BACKSPACE } from "@/src/components/wordle/ScreenKeyboard"
import { allWords } from "@/data/allWords"
import { getBackgroundColorAsync } from "expo-system-ui"

// Constants
const ROWS = 6
const COLS = 5

// Force the word for testing purposes
const word = "hello"

const Game = () => {
   const router = useRouter()

   // States for the game
   const [rows, setRows] = useState(new Array(ROWS).fill(new Array(COLS).fill("")))
   const [currentRow, setCurrentRow] = useState(0)
   const [currentCol, _setCurrentCol] = useState(0)
   //const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
   const [word, setWord] = useState("hello")
   const wordLetter = word.split("")

   // Get letters for the keyboard
   const [greenLetters, setGreenLetters] = useState([])
   const [yellowLetters, setYellowLetters] = useState([])
   const [greyLetters, setGreyLetters] = useState([])

   // Reference for the current column
   const currentColRef = useRef(currentCol)
   const setCurrentCol = (col) => {
      currentColRef.current = col
      _setCurrentCol(col)
   }

   // When a key is pressed on the keyboard
   const addKey = (key) => {
      const newRows = [...rows.map((row) => [...row])]

      // If the key is enter
      if (key === ENTER) {
         // Check if the word is correct
         checkWord()
      } else if (key === BACKSPACE) {
         // If the key is backspace
         if (currentColRef.current === 0) {
            newRows[currentRow][0] = ""
            setRows(newRows)
            return
         }
         newRows[currentRow][currentColRef.current - 1] = ""
         setCurrentCol(currentColRef.current - 1)
         setRows(newRows)
      } else if (currentColRef.current >= COLS) {
         // If the current column is GTE than the number of letters... Do nothing
         return
      } else {
         // Add the key to the current column
         newRows[currentRow][currentColRef.current] = key
         setCurrentCol(currentColRef.current + 1)
         setRows(newRows)
      }
   }

   const checkWord = () => {
      const currentWordArray = [...rows[currentRow]]
      const currentWord = rows[currentRow].join("")

      // Too small
      if (currentWord.length < COLS) {
         console.log("Too short word...")
         return
      }

      if (!allWords.includes(currentWord)) {
         console.log("Not a word...")
      }

      const newGreenLetters = []
      const newYellowLetters = []
      const newGreyLetters = []

      currentWord.split("").forEach((letter, index) => {
         if (letter === wordLetter[index]) {
            // Good letter in good place
            newGreenLetters.push(letter)
         } else if (wordLetter.includes(letter)) {
            // TODO: Avoid double
            newYellowLetters.push(letter)
         } else {
            // No in the word
            newGreyLetters.push(letter)
         }
      })

      setGreenLetters([...greenLetters, ...newGreenLetters])
      setYellowLetters([...yellowLetters, ...newYellowLetters])
      setGreyLetters([...greyLetters, ...newGreyLetters])

      // Go to end screen
      setTimeout(() => {
         if (currentWord === word) {
            console.log("You win...")
            // TODO: go to end screen
         } else if (currentRow + 1 >= ROWS) {
            console.log("You loose...")
            // TODO: go to end screen
         }
      }, 0)

      // Set cursor to next line
      setCurrentRow(currentRow + 1)
      setCurrentCol(0)
   }

   // Get Colors
   const getCellColor = (row, col, cell) => {
      if (currentRow > row) {
         if (wordLetter[col] === cell) {
            return {
               backgroundColor: colors.lime[600],
               color: colors.white,
               borderColor: colors.lime[600],
            }
         } else if (yellowLetters.includes(cell)) {
            return {
               backgroundColor: colors.yellow[500],
               color: colors.white,
               borderColor: colors.yellow[500],
            }
         } else if (greyLetters.includes(cell)) {
            return {
               backgroundColor: colors.gray[500],
               color: colors.white,
               borderColor: colors.gray[500],
            }
         }
         // } else {
         //    return {
         //       backgroundColor: colors.white,
         //       color: colors.black,
         //       borderColor: colors.gray[900],
         //    }
         // }
      } else {
         return {
            backgroundColor: colors.white,
            color: colors.blue,
            borderColor: colors.gray[400],
         }
      }
   }
   const getBorderColor = (row, col, cell) => {}

   return (
      <>
         <Stack.Screen
            options={{
               headerShown: true,
               headerBackTitleVisible: false,
               headerTitle: "Wordle",
               headerTitleStyle: {
                  fontFamily: "RockSalt-Regular",
                  fontSize: 17,
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
                  {row.map((cell, colIndex) => (
                     <View
                        style={getCellColor(rowIndex, colIndex, cell)}
                        key={`col-${rowIndex}-${colIndex}`}
                        className="w-1/6 aspect-square border justify-center items-center"
                     >
                        <Text
                           style={{ color: getCellColor(rowIndex, colIndex, cell).color }}
                           className="font-bold text-2xl uppercase"
                        >
                           {cell}
                        </Text>
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
