import { View, Text } from "react-native"
import React from "react"
import { StarIcon as StarOff } from "react-native-heroicons/outline"
import { StarIcon as StarOn } from "react-native-heroicons/solid"
import colors from "tailwindcss/colors"

const STARS_MAX = 5

const Rating = ({ rating }) => {
   const filledStars = Math.round(rating / 2)
   const emptyStars = STARS_MAX - filledStars
   const stars = [...Array(filledStars).fill("on"), ...Array(emptyStars).fill("off")]

   return (
      <View className="flex-row space-x-2">
         <Text className="text-stone-500 text-xs font-bold">{rating}</Text>

         <View className="flex-row space-x-0">
            {stars.map((star, index) => {
               return star === "on" ? (
                  <StarOn
                     key={index}
                     size={16}
                     color={colors.lime[400]}
                  />
               ) : (
                  <StarOff
                     key={index}
                     size={16}
                     color={colors.lime[400]}
                  />
               )
            })}
         </View>
      </View>
   )
}

export default Rating
