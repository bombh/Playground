import { Stack } from "expo-router"

const StackLayout = () => {
   return (
      <Stack
         screenOptions={{
            headerShown: false,
         }}
      >
         <Stack.Screen name="index" />
         <Stack.Screen name="game" />
         <Stack.Screen name="gameEnd" />
         <Stack.Screen
            name="login"
            options={{
               headerShown: true,
               presentation: "modal",
            }}
         />
      </Stack>
   )
}

export default StackLayout
