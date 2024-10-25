import { View, Text, Image, Pressable } from "react-native"
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { forwardRef, useCallback, useMemo } from "react"
import { styled } from "nativewind"
import { XCircleIcon } from "react-native-heroicons/outline"

const gamesImage = require("@/assets/images/wordle/games.png")

const BENEFITS = [
   "Enjoy full access to Wordle, Spelling Bee, The Crossword and more.",
   "Play new puzzles every day for concentration or relaxation.",
   "Strengthen your strategy with WordleBot.",
   "Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.",
   "Track your stats and streaks on any device.",
]

const SubscribeModal = forwardRef(({}, ref) => {
   const snapPoints = useMemo(() => ["85%"], [])

   const dismiss = () => ref.current?.close()

   // Render backdrop for Bottom Sheet
   const renderBackdrop = useCallback(
      (props) => (
         <BottomSheetBackdrop
            opacity={0.1}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            enableTouchThrough={false}
            {...props}
         />
      ),
      []
   )

   const StyledBottomSheet = styled(BottomSheet)
   const StyledBottomSheetView = styled(BottomSheetView)

   return (
      <StyledBottomSheet
         index={1}
         ref={ref}
         snapPoints={snapPoints}
         backdropComponent={renderBackdrop}
         enablePanDownToClose={true}
         handleComponent={null}
         className="bg-transparent"
      >
         <StyledBottomSheetView className="bg-white rounded-t-3xl flex-1 ">
            <View className="flex-row justify-end px-5 pt-5">
               {/* <Text>Log In</Text> */}
               <Pressable
                  className="active:opacity-50"
                  onPress={dismiss}
               >
                  <XCircleIcon
                     size={28}
                     color={"#000"}
                  />
               </Pressable>
            </View>
            <View className="px-8">
               <Text className="text-3xl font-rock text-center pt-5">Unlimited Play</Text>
               <Text className="text-xl  text-center px-20 -mt-3">Try free for 7 days</Text>
               <Image
                  source={gamesImage}
                  className="w-full h-12 mt-2"
                  resizeMode="contain"
               />
               <View className="mt-4 mx-5">
                  {BENEFITS.map((benefit, index) => (
                     <Text
                        key={index}
                        className="text-stone-500 mb-4"
                     >
                        {benefit}
                     </Text>
                  ))}
               </View>
            </View>
         </StyledBottomSheetView>
      </StyledBottomSheet>
   )
})

export default SubscribeModal
