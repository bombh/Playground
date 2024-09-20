import { View, Text, StyleSheet } from "react-native"
import { useState } from "react"
import { Easing } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"

import colors from "tailwindcss/colors"
import { PhoneArrowUpRightIcon, BeakerIcon } from "react-native-heroicons/outline"
import { MotiView } from "moti"
import Slider from "@react-native-community/slider"

import ScreenStackFull from "@/src/layouts/ScreenStackFull"
import ScreenDrawer from "@/src/layouts/ScreenDrawer"

const Home = () => {
   const [numCircles, setNumCircles] = useState(3)
   const [numCirclesDisplay, setNumCirclesDisplay] = useState(3)

   return (
      <>
         <ScreenDrawer title="" />

         <View className="flex-1 justify-center items-center relative bg-white">
            <View className="w-36 h-36 bg-lime-400 rounded-full flex justify-center items-center -mt-20">
               {[...Array(numCircles).keys()].map((index) => {
                  return (
                     <MotiView
                        key={index}
                        from={{
                           opacity: 0.5,
                           scale: 1,
                        }}
                        animate={{
                           opacity: 0,
                           scale: 5,
                        }}
                        transition={{
                           type: "timing",
                           duration: 3000,
                           delay: index * 400,
                           easing: Easing.out(Easing.ease),
                           loop: true,
                           repeatReverse: false,
                        }}
                        style={StyleSheet.absoluteFill}
                        className="bg-lime-400 rounded-full border border-white"
                     />
                  )
               })}

               <BeakerIcon
                  size={80}
                  color={colors.white}
               />
            </View>

            <View className="pb-5">
               <Text className="text-stone text-center text-2xl pt-5 font-rock tracking-widest">PlayGround</Text>
               <Text className="text-stone-500 text-center text-base -mt-3">by bomb.H</Text>
            </View>

            <View className="mt-12 w-full absolute items-center bottom-12">
               <Text className="text-lg text-stone-500 font-rock pt-4">{numCirclesDisplay.toString()} waves</Text>
               <Slider
                  style={{ width: 220, height: 40 }}
                  minimumValue={1}
                  maximumValue={6}
                  step={1}
                  value={3}
                  onSlidingStart={() => {
                     setNumCircles(0)
                  }}
                  onSlidingComplete={(n) => {
                     setNumCircles(n)
                  }}
                  onValueChange={(n) => {
                     setNumCirclesDisplay(n)
                  }}
                  minimumTrackTintColor={colors.stone[400]}
                  maximumTrackTintColor={colors.lime[400]}
               />
               <Text className="text-xs text-stone-500 mt-0">How many waves would you like ?</Text>
            </View>
         </View>
      </>
   )
}

export default Home
