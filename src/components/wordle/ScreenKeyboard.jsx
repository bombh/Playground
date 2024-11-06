import { View, Text, useWindowDimensions, Pressable } from "react-native"
import React from "react"
import { BackspaceIcon, PaperAirplaneIcon } from "react-native-heroicons/solid"

export const ENTER = "ENTER"
export const BACKSPACE = "BACKSPACE"

const keys = [
   ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p"],
   ["q", "s", "d", "f", "g", "h", "j", "k", "l", "m"],
   [BACKSPACE, "w", "x", "c", "v", "b", "n", ENTER],
]

const ScreenKeyboard = ({ onKeyPressed, greenLetters, yellowLetters, greyLetters }) => {
   const { width } = useWindowDimensions()
   const keyWidth = (width - 80) / keys[0].length
   const keyWidthSpecial = keyWidth * 1.5
   const keyHeight = 60

   const isSpecialKey = (key) => key === ENTER || key === BACKSPACE
   const isInLetters = (key) => [...greenLetters, ...yellowLetters, ...greyLetters].includes(key)
   const getColorLetter = (key) => {
      if (greenLetters.includes(key)) return "bg-lime-600"
      if (yellowLetters.includes(key)) return "bg-yellow-500"
      if (greyLetters.includes(key)) return "bg-gray-500"
      return "bg-stone-300"
   }

   return (
      <View className="mt-10">
         {keys.map((row, rowIndex) => (
            <View
               className="flex-row justify-evenly mt-1"
               key={`row-${rowIndex}`}
            >
               {row.map((col, colIndex) => {
                  const bgColor = getColorLetter(col)
                  const textColor = isInLetters(col) ? "text-white" : "text-black"
                  const colWidth = isSpecialKey(col) ? keyWidthSpecial : keyWidth

                  return (
                     <Pressable
                        onPress={() => onKeyPressed(col)}
                        style={{ width: colWidth, height: keyHeight }}
                        className={`${bgColor} items-center justify-center rounded-md active:opacity-70`}
                        key={`col-${rowIndex}-${colIndex}`}
                     >
                        {isSpecialKey(col) ? (
                           col === ENTER ? (
                              <PaperAirplaneIcon
                                 size={24}
                                 color={"#000"}
                              />
                           ) : (
                              <BackspaceIcon
                                 size={24}
                                 color={"#000"}
                              />
                           )
                        ) : (
                           <Text className={`uppercase font-bold ${textColor}`}>{col}</Text>
                        )}
                     </Pressable>
                  )
               })}
            </View>
         ))}
      </View>
   )
}

export default ScreenKeyboard
