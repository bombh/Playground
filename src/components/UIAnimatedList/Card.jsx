import { View, Text, Image, Pressable } from "react-native"
import Animated, { LinearTransition, RollInRight, RollOutLeft } from "react-native-reanimated"
import { TrashIcon } from "react-native-heroicons/outline"
import colors from "tailwindcss/colors"

const Card = ({ handleDelete, ...movie }) => {
   const { id, title, description, posterUrl } = movie

   return (
      <Animated.View
         className="flex bg-white p-5 mb-5 rounded-lg border border-stone-300"
         layout={LinearTransition.stiffness()}
         entering={RollInRight}
         exiting={RollOutLeft}
      >
         <Text
            className="text-xl text-stone-900 text-center font-extrabold"
            numberOfLines={1}
         >
            {title}
         </Text>
         <Image
            source={{ uri: posterUrl }}
            resizeMode="contain"
            className="h-80 mt-3"
         />

         <View className="flex justify-end items-center mt-4">
            <Pressable
               className="w-12 h-12 bg-white active:bg-stone-300 rounded-full flex items-center justify-center border active:opacity-70"
               onPress={handleDelete}
            >
               <TrashIcon
                  size={24}
                  color={colors.stone[900]}
               />
            </Pressable>
         </View>
      </Animated.View>
   )
}

export default Card
