import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Stack, useFocusEffect, useRouter } from "expo-router"
import { InformationCircleIcon, ChartBarIcon, Cog8ToothIcon } from "react-native-heroicons/solid"
import { MotiView } from "moti"
import Toast from "react-native-toast-message"

import { deepClone } from "@/src/utils/array"
import { words } from "@/data/targetWordsFR"
import ScreenKeyboard, { ENTER, BACKSPACE } from "@/src/components/wordle/ScreenKeyboard"
import Letter from "@/src/components/wordle/Letter"
import { ROWS, COLS } from "@/src/constants/wordle"

// Constants
// const ROWS = 1
// const COLS = 5

const Game = () => {
   const router = useRouter()

   const [isLoaded, setIsLoaded] = useState(false)

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
   const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)])
   //const [word, setWord] = useState("hello")
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

   useEffect(() => {
      setTimeout(() => {
         setIsLoaded(true)
      }, 100)

      // Clean up
      return () => {}
   }, [])

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
         //console.log("Too short word...")
         Toast.show({
            type: "info",
            text1: "Missing letters !",
            text2: "Each word must have 5 letters.",
         })
         return
      }

      // if (!allWords.includes(newWord)) {

      // }

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
      newResult.reverse()

      // Check yellow letters
      undefinedLetters.forEach((letter) => {
         const letterIndex = remainingLetters.indexOf(letter.letter)
         if (letterIndex > -1) {
            newYellowLetters.push(letter.letter)
            remainingLetters.splice(letterIndex, 1)

            // Method 3 WORKING ...
            newResult[letter.index].color = "yellow"

            // Method 2 NOT WORKING WITH 'LLOOL'
            // const wordIndexes = newResult
            //    .filter((obj) => obj.letter === letter.letter && obj.color === "")
            //    .forEach((obj) => {
            //       newResult[obj.index].color = "yellow"
            //    })

            // Method 1 NOT WORKING WITH 'LELOO'
            // if (wordIndex > -1) {
            //    newResult[wordIndex].color = "yellow"
            // }
         }
      })

      // console.log("newResult", newResult)
      newGameState[currentRow] = newResult
      setGameState(newGameState)

      setGreenLetters([...greenLetters, ...newGreenLetters])
      setYellowLetters([...yellowLetters, ...newYellowLetters])
      setGreyLetters([...greyLetters, ...newGreyLetters])

      // Go to end screen
      setTimeout(() => {
         if (newWord === word) {
            //console.log("You win...")
            router.navigate({ pathname: "/wordle/gameEnd", params: { win: true, word } })
         } else if (currentRow + 1 >= ROWS) {
            //console.log("You loose...")
            router.navigate({ pathname: "/wordle/gameEnd", params: { win: false, word } })
         }
      }, 1500)

      // Set cursor to next line
      setCurrentRow(currentRow + 1)
      setCurrentCol(0)
   }

   // Get Colors for each letter
   const getLetterColor = (row, col, cell) => {
      if (currentRow > row) {
         if (gameState[row][col].color === "green") {
            return "green"
         } else if (gameState[row][col].color === "yellow") {
            return "yellow"
         } else if (gameState[row][col].color === "grey") {
            return "grey"
         } else {
            return "default"
         }
      } else {
         return ""
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
               headerShadowVisible: false,
               headerTintColor: "#000",
               // headerRight: () => (
               //    <View className="flex-row gap-3">
               //       <Pressable className="active:opacity-50">
               //          <InformationCircleIcon
               //             size={24}
               //             color="#000"
               //          />
               //       </Pressable>
               //       <Pressable className="active:opacity-50">
               //          <ChartBarIcon
               //             size={24}
               //             color="#000"
               //          />
               //       </Pressable>
               //       <Pressable className="active:opacity-50">
               //          <Cog8ToothIcon
               //             size={24}
               //             color="#000"
               //          />
               //       </Pressable>
               //    </View>
               // ),
            }}
         />

         {/* Main page */}
         {!isLoaded && (
            <View className="flex-1 bg-white -mt-24 justify-center items-center">
               <ActivityIndicator
                  size={"large"}
                  color={"black"}
               />
            </View>
         )}

         {isLoaded && (
            <View className="flex-1  p-5">
               {/* Game field */}
               {gameState.map((row, rowIndex) => (
                  <View
                     key={`row-${rowIndex}`}
                     className="w-full flex-row mt-3 justify-between
                  "
                  >
                     {row.map((cell, colIndex) => {
                        //console.log("cell", cell)
                        return (
                           <Letter
                              key={`col-${rowIndex}-${colIndex}`}
                              row={rowIndex}
                              col={colIndex}
                              cell={cell}
                              color={getLetterColor(rowIndex, colIndex, cell)}
                           />
                           // <MotiView
                           //    from={{ opacity: 0, scale: 0.5 }}
                           //    animate={{ opacity: 1, scale: 1 }}
                           //    delay={rowIndex * 50 + colIndex * 50}
                           //    style={getCellColor(rowIndex, colIndex, cell.letter).box}
                           //    key={}
                           //    className="w-1/6 aspect-square border justify-center items-center"
                           // >
                           //    <Text
                           //       style={getCellColor(rowIndex, colIndex, cell.letter).text}
                           //       className="font-bold text-2xl uppercase"
                           //    >
                           //
                           //    </Text>
                           // </MotiView>
                        )
                     })}
                  </View>
               ))}

               {/* Keyboard */}
               <MotiView
                  from={{ opacity: 0, translateY: 30 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  delay={0}
               >
                  <ScreenKeyboard
                     onKeyPressed={addKey}
                     greenLetters={greenLetters}
                     yellowLetters={yellowLetters}
                     greyLetters={greyLetters}
                  />
               </MotiView>
            </View>
         )}
      </>
   )
}

export default Game
