import { View, Text, Image, Pressable } from "react-native"
import Animated, { LinearTransition, RollInRight, RollOutLeft } from "react-native-reanimated"
import { TrashIcon } from "react-native-heroicons/outline"
import colors from "tailwindcss/colors"

const Card = ({ handleDelete, ...movie }) => {
   const { id, title, description, posterUrl } = movie

   return (
      <Animated.View
         className="flex bg-white px-12 py-5 mb-5 rounded-lg border border-neutral-300"
         layout={LinearTransition.stiffness()}
         entering={RollInRight}
         exiting={RollOutLeft}
      >
         <Text className="text-xl text-center font-extrabold">{title}</Text>
         <Image
            source={{ uri: posterUrl }}
            resizeMode="contain"
            className="h-80 mt-3"
         />

         <View className="flex justify-end items-center mt-4">
            <Pressable
               className="w-12 h-12 bg-white rounded-full flex items-center justify-center border"
               onPress={handleDelete}
            >
               <TrashIcon
                  size={24}
                  color={colors.black}
               />
            </Pressable>
         </View>
      </Animated.View>
   )
}

export default Card
