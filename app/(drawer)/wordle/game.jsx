import { View, Text, Pressable, StyleSheet } from "react-native"
import React, { useRef, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { InformationCircleIcon, ChartBarIcon, Cog8ToothIcon } from "react-native-heroicons/solid"
import colors, { white } from "tailwindcss/colors"

import { deepClone } from "@/src/utils/array"
import { words } from "@/data/targetWords"
import ScreenKeyboard, { ENTER, BACKSPACE } from "@/src/components/wordle/ScreenKeyboard"
import { allWords } from "@/data/allWords"
import { set } from "date-fns"

// Constants
const ROWS = 1
const COLS = 5

const Game = () => {
   const router = useRouter()

   // States for the game
   const [gameState, setGameState] = useState(
      new Array(ROWS).fill(
         new Array(COLS).fill({
            letter: "",
            color: "",
            index: 0,
         })
      )
   )
   const [currentRow, setCurrentRow] = useState(0)
   const [currentCol, _setCurrentCol] = useState(0)
   //const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
   const [word, setWord] = useState("hello")
   const wordLetter = word.split("")

   // Get letters for the keyboard
   const [greenLetters, setGreenLetters] = useState([])
   const [yellowLetters, setYellowLetters] = useState([])
   const [greyLetters, setGreyLetters] = useState([])

   // Reference for the current column to avoid lag time when changing the state
   const currentColRef = useRef(currentCol)
   const setCurrentCol = (col) => {
      currentColRef.current = col
      _setCurrentCol(col)
   }

   // When a key is pressed on the keyboard
   const addKey = (key) => {
      const newGameState = deepClone(gameState)

      // If the key is enter
      if (key === ENTER) {
         // Check if the word is correct
         checkWord()
      } else if (key === BACKSPACE) {
         // If the key is backspace
         if (currentColRef.current === 0) {
            newGameState[currentRow][0].letter = ""

            setGameState(newGameState)
            return
         }

         newGameState[currentRow][currentColRef.current - 1].letter = ""
         setCurrentCol(currentColRef.current - 1)
         setGameState(newGameState)
      } else if (currentColRef.current >= COLS) {
         // If the current column is GTE than the number of letters... Do nothing
         return
      } else {
         // Add the key to the current column
         newGameState[currentRow][currentColRef.current].letter = key
         setCurrentCol(currentColRef.current + 1)
         setGameState(newGameState)
      }
   }

   // Check the word provided by the user
   const checkWord = () => {
      const newWord = gameState[currentRow].map((letter) => letter.letter).join("")
      const newGameState = deepClone(gameState)
      const newResult = deepClone(newGameState[currentRow])

      newResult.map((letter, index) => {
         letter.index = index
      })

      if (newWord.length < COLS) {
         console.log("Too short word...")
         return
      }

      if (!allWords.includes(newWord)) {
         console.log("Not a word...")
      }

      const newGreenLetters = []
      const newYellowLetters = []
      const newGreyLetters = []

      newWord.split("").forEach((letter, index) => {
         if (letter === wordLetter[index]) {
            // Good letter in good place
            newGreenLetters.push(letter)
            newResult[index].color = "green"
         } else if (wordLetter.includes(letter)) {
            // For yellow check below
            newYellowLetters.push(letter)
         } else {
            // No in the word
            newGreyLetters.push(letter)
            newResult[index].color = "grey"
         }
      })

      // Check if yellow or white
      let undefinedLetters = newResult.filter((letter) => letter.color === "")
      let remainingLetters = word.split("")

      // Remove green letters
      newResult.reverse().forEach((letter, index) => {
         if (letter.color === "green") {
            remainingLetters.splice(letter.index, 1)
         }
      })

      // Check yellow letters
      undefinedLetters.forEach((letter) => {
         const letterIndex = remainingLetters.indexOf(letter.letter)
         if (letterIndex > -1) {
            newYellowLetters.push(letter.letter)
            remainingLetters.splice(letterIndex, 1)

            const wordIndex = newResult.findIndex((obj) => obj.letter === letter.letter)
            if (wordIndex > -1) {
               newResult[wordIndex].color = "yellow"
            }
         }
      })

      newResult.reverse()
      newGameState[currentRow] = newResult
      setGameState(newGameState)

      setGreenLetters([...greenLetters, ...newGreenLetters])
      setYellowLetters([...yellowLetters, ...newYellowLetters])
      setGreyLetters([...greyLetters, ...newGreyLetters])

      // Go to end screen
      setTimeout(() => {
         if (newWord === word) {
            console.log("You win...")
            router.navigate({ pathname: "/wordle/gameEnd", params: { win: true, word } })
            // TODO: go to end screen
         } else if (currentRow + 1 >= ROWS) {
            console.log("You loose...")
            // TODO: go to end screen
            router.navigate({ pathname: "/wordle/gameEnd", params: { win: false, word } })
         }
      }, 0)

      // Set cursor to next line
      setCurrentRow(currentRow + 1)
      setCurrentCol(0)
   }

   // Get Colors
   const getCellColor = (row, col, cell) => {
      if (currentRow > row) {
         if (gameState[row][col].color === "green") {
            return {
               box: styles.greenBox,
               text: styles.whiteText,
            }
         } else if (gameState[row][col].color === "yellow") {
            return {
               box: styles.yellowBox,
               text: styles.whiteText,
            }
         } else if (gameState[row][col].color === "grey") {
            return {
               box: styles.greyBox,
               text: styles.whiteText,
            }
         } else {
            return {
               box: styles.defaultBox,
               text: styles.defaultText,
            }
         }
      } else {
         return {
            box: styles.defaultBox,
            text: styles.defaultText,
         }
      }
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
            {gameState.map((row, rowIndex) => (
               <View
                  key={`row-${rowIndex}`}
                  className="w-full flex-row mt-3 justify-between
                  "
               >
                  {row.map((cell, colIndex) => (
                     <View
                        style={getCellColor(rowIndex, colIndex, cell.letter).box}
                        key={`col-${rowIndex}-${colIndex}`}
                        className="w-1/6 aspect-square border justify-center items-center"
                     >
                        <Text
                           style={getCellColor(rowIndex, colIndex, cell.letter).text}
                           className="font-bold text-2xl uppercase"
                        >
                           {cell.letter}
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

const styles = StyleSheet.create({
   greenBox: {
      backgroundColor: colors.lime[600],
      borderColor: colors.lime[600],
   },
   yellowBox: {
      backgroundColor: colors.yellow[500],
      borderColor: colors.yellow[500],
   },
   greyBox: {
      backgroundColor: colors.gray[500],
      borderColor: colors.gray[500],
   },
   defaultBox: {
      backgroundColor: colors.white,
      borderColor: colors.gray[400],
   },
   defaultText: {
      color: colors.black,
   },
   whiteText: {
      color: colors.white,
   },
})

export default Game
