import { View, Text, Image, Pressable } from "react-native"
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { forwardRef, useCallback, useMemo } from "react"
import { styled } from "nativewind"
import { XCircleIcon } from "react-native-heroicons/outline"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"

const gamesImage = require("@/assets/images/wordle/games.png")

const BENEFITS = [
   "Enjoy full access to Wordle, Spelling Bee, The Crossword and more.",
   "Play new puzzles every day for concentration or relaxation.",
   "Strengthen your strategy with WordleBot.",
   "Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.",
   "Track your stats and streaks on any device.",
]

const SubscribeModal = forwardRef(({}, ref) => {
   const snapPoints = useMemo(() => ["100%"], [])

   const { bottom } = useSafeAreaInsets()
   const dismiss = () => ref.current?.close()

   const showToast = () => {
      Toast.show({
         type: "info",
         text1: "Hey good news",
         text2: "Don't worry ! It's free for ever ✌️",
      })
      dismiss()
   }

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
   const StyledBottomSheetScrollView = styled(BottomSheetScrollView)

   return (
      <StyledBottomSheet
         index={1}
         ref={ref}
         snapPoints={snapPoints}
         //backdropComponent={renderBackdrop}
         enablePanDownToClose={true}
         handleComponent={null}
         className="bg-transparent"
      >
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
         <StyledBottomSheetScrollView className="bg-white rounded-t-3xl flex-1 ">
            <View className="px-8">
               <Text className="text-3xl font-rock text-center pt-5">Unlimited Play</Text>
               <Text className="text-xl text-center px-20 -mt-3">Try free for 7 days</Text>
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
               <Text className="mt-5 text-justify text-xs pb-8">
                  If you subscribe to The New York Times via this app, payment for your subscription will be
                  automatically charged to your Apple ID account upon your confirmation of purchase with Apple. Your
                  Apple ID account will be automatically charged for renewal at the applicable rate shown to you at the
                  time of subscription every calendar month (for monthly subscriptions) or every year (for annual
                  subscriptions) within 24-hours prior to the start of your next billing period. For special
                  introductory offers, you will be automatically charged the applicable introductory rate shown to you
                  at the time of subscription for the stated introductory period and the standard rate rate shown to you
                  at the time of subscription thereafter. You will be charged in advance. Subscriptions continue
                  automatically until you cancel. Cancellation takes effect at the end of your current billing period.
                  You can manage and cancel subscriptions in your account settings on the App Store. To cancel, please
                  turn off auto-renew at lead; 24-hours before the end of your current billing period from your iTunes
                  account settings.If you subscribe to The New York Times via this app, payment for your subscription
                  will be automatically charged to your Apple ID account upon your confirmation of purchase with Apple.
                  Your Apple ID account will be automatically charged for renewal at the applicable rate shown to you at
                  the time of subscription every calendar month (for monthly subscriptions) or every year (for annual
                  subscriptions) within 24-hours prior to the start of your next billing period. For special
                  introductory offers, you will be automatically charged the applicable introductory rate shown to you
                  at the time of subscription for the stated introductory period and the standard rate rate shown to you
                  at the time of subscription thereafter. You will be charged in advance. Subscriptions continue
                  automatically until you cancel. Cancellation takes effect at the end of your current billing period.
                  You can manage and cancel subscriptions in your account settings on the App Store. To cancel, please
                  turn off auto-renew at lead; 24-hours before the end of your current billing period from your iTunes
                  account settings.
               </Text>
            </View>
         </StyledBottomSheetScrollView>

         <View
            className="bg-white rounded-b-3xl py-5 shadow"
            style={{ paddingBottom: bottom }}
         >
            <Pressable
               className="bg-black p-3 mx-8 active:opacity-70"
               onPress={showToast}
            >
               <Text className="text-white text-center text-lg">Try for free</Text>
            </Pressable>
            <Text className="text-center text-sm text-stone-500 py-2">
               2,99 €/month after 7-day trial. Cancel anytime.
            </Text>
         </View>
      </StyledBottomSheet>
   )
})

export default SubscribeModal
