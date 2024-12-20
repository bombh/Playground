import { View, Text, Pressable, Image } from "react-native"
import React, { useEffect, useState } from "react"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

import Icon from "@/assets/images/wordle/icon.svg"
import ScreenStackFull from "@/src/layouts/ScreenStackFull"
import { XCircleIcon } from "react-native-heroicons/outline"
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { FIREBASE_DB } from "@/src/utils/firebaseConfig"
import { COLORS } from "@/src/constants/wordle"
import { set } from "date-fns"

const gameEnd = () => {
   const router = useRouter()
   const { win, word } = useLocalSearchParams()

   //console.log("win", win, typeof win)

   const [userSore, setUserScore] = useState()

   const { user } = useUser()

   useEffect(() => {
      if (user) {
         updateHighScore()
      }
   }, [user])

   const updateHighScore = async () => {
      //console.log("user", user)

      if (!user) return

      const docRef = doc(FIREBASE_DB, `wordle_highScores/${user.id}`)
      const docSnap = await getDoc(docRef)

      // Set default score
      let newScore = {
         played: 1,
         wins: win === "true" ? 1 : 0,
         lastGame: win === "true" ? "win" : "loss",
         lastWord: word,
         currentStreak: win === "true" ? 1 : 0,
      }

      if (docSnap.exists()) {
         const data = docSnap.data()

         newScore = {
            played: data.played + 1,
            wins: win === "true" ? data.wins + 1 : data.wins,
            lastGame: win === "true" ? "win" : "loss",
            lastWord: word,
            currentStreak: win === "true" && data.lastGame === "win" ? data.currentStreak + 1 : win === "true" ? 1 : 0,
         }
      }

      await setDoc(docRef, newScore)
      setUserScore(newScore)
   }

   const navigateToRoot = () => {
      //router.dismissAll()
      router.navigate("/wordle")
   }

   return (
      <>
         <SafeAreaView className="flex-1 bg-white relative">
            {/* <View className="flex-row justify-end px-5 pt-5">
               <Pressable
                  className="active:opacity-50"
                  onPress={navigateToRoot}
               >
                  <XCircleIcon
                     size={28}
                     color={"#000"}
                  />
               </Pressable>
            </View> */}
            <View className="items-center justify-center mt-5 ">
               {win === "true" ? (
                  <Image source={require("@/assets/images/wordle/win.png")} />
               ) : (
                  <Icon
                     width={100}
                     height={70}
                     className=""
                  />
               )}

               <Text className="text-2xl font-bold mt-4 pt-5">{win === "true" ? "Congrats" : "Missed ..."}</Text>
               <Text className="text-base text-stone-400 text-center px-20">
                  {win === "true" ? "You have successfully guessed the word" : "You have missed the word. Try again..."}
               </Text>
               <Text className="text-5xl font-rock text-center px-20 pt-10">{word}</Text>
               <View className="w-full mt-8 px-16">
                  <SignedIn>
                     <Text className="text-sm text-center">Your Statistics</Text>
                     <View className="flex-row justify-evenly mt-4">
                        <View className=" items-center">
                           <Text className="text-stone-800 font-bold text-2xl">{userSore?.wins}</Text>
                           <Text className="text-stone-400">Wins</Text>
                        </View>
                        <View className="items-center">
                           <Text className="text-stone-800 font-bold text-2xl">{userSore?.played}</Text>
                           <Text className="text-stone-400">Played</Text>
                        </View>
                        <View className="items-center">
                           <Text className="text-stone-800 font-bold text-2xl">{userSore?.currentStreak}</Text>
                           <Text className="text-stone-400">Streaks</Text>
                        </View>
                     </View>
                  </SignedIn>

                  <SignedOut>
                     <Text className="text-sm text-center">Want to see your stats and streaks?</Text>
                     <Pressable
                        className="bg-stone-800 p-3 mt-4 rounded-full active:opacity-50"
                        onPress={() => router.navigate("/wordle/login")}
                     >
                        <Text className="text-base text-white text-center">Create an account</Text>
                     </Pressable>

                     <Pressable
                        className="p-3 mt-4 border rounded-full active:opacity-50"
                        onPress={() => router.navigate("/wordle/login")}
                     >
                        <Text className="text-base text-stone-800 text-center">Already registered ? Log in</Text>
                     </Pressable>
                  </SignedOut>
               </View>
            </View>
            <View className="absolute bottom-10 w-full px-16">
               <Pressable
                  style={{ backgroundColor: COLORS.green }}
                  className=" bg-stone-800 p-3 my-8 rounded-full active:opacity-70"
                  onPress={() => navigateToRoot()}
               >
                  <Text className="text-base text-white text-center">Play Again</Text>
               </Pressable>
            </View>
         </SafeAreaView>
      </>
   )
}

export default gameEnd
