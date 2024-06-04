import { View, Text, Image } from "react-native"
import Animated, { LinearTransition, RollInLeft, RollInRight, RollOutLeft, RollOutRight } from "react-native-reanimated"

const Card = (movie) => {
   const { id, title, description, posterUrl } = movie

   return (
      <Animated.View
         className="bg-white p-5 mb-5 rounded-lg shadow-md"
         layout={LinearTransition.stiffness()}
         entering={RollInRight}
         exiting={RollOutLeft}
      >
         <Text className="text-xl font-extrabold mb-2">{title}</Text>
         <Text className="text-xs text-neutral-700">{description}</Text>
         <Image
            source={{ uri: posterUrl }}
            className="w-full aspect-video mt-4 rounded-lg"
         />
      </Animated.View>
   )
}

export default Card
