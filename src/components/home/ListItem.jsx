import { Pressable, Text } from "react-native"
import { useNavigation } from "expo-router"

const ListItem = ({ title, description, link }) => {
   const navigation = useNavigation()

   return (
      <Pressable
         className="mx-5 mb-4 p-3 bg-white border border-stone-300 rounded-lg active:opacity-70 active:border-stone-400 "
         onPress={() => navigation.navigate(link)}
      >
         <Text className="text-lg font-semibold mb-2">{title}</Text>
         <Text>{description}</Text>
      </Pressable>
   )
}

export default ListItem
