import { Drawer } from "expo-router/drawer"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Text, View } from "react-native"
import {
   DocumentDuplicateIcon,
   BeakerIcon,
   CursorArrowRippleIcon,
   Squares2X2Icon,
   PhotoIcon,
   ArrowTrendingUpIcon,
} from "react-native-heroicons/outline"
import colors from "tailwindcss/colors"

// Drawer content
const AppDrawerContent = (props) => {
   return (
      <>
         <DrawerContentScrollView {...props}>
            <View className="flex-row justify-center">
               <BeakerIcon
                  size={80}
                  color={colors.lime[400]}
               />
            </View>
            <View className="pb-5">
               <Text className="text-lime-300 text-center text-xl pt-3 font-rock tracking-widest">PlayGround</Text>
               <Text className="text-stone-500 text-center text-xs -mt-2">by bomb.H</Text>
            </View>

            <DrawerItemList {...props} />
         </DrawerContentScrollView>
         <Text className="absolute bottom-6 text-stone-500 text-xs w-full text-center ">Version 1.0.0</Text>
         {/* <Text className="text-xs text-stone-500 font-bold">{format(new Date(), "EEEE d MMM yyyy")}</Text>
               <Text className="text-xs text-stone-500">by bomb.H</Text> */}
      </>
   )
}

const DrawerLayout = () => {
   return (
      <Drawer
         drawerContent={(props) => <AppDrawerContent {...props} />}
         screenOptions={{
            headerShown: false,
            drawerType: "slide",
            headerTintColor: colors.black,
            headerTitleAlign: "center",
            headerShadowVisible: false,
            drawerStyle: {
               width: 220,
               backgroundColor: colors.stone[900],
            },
            drawerLabelStyle: {
               marginLeft: -30,
            },
            drawerActiveTintColor: colors.stone[100],
            drawerActiveBackgroundColor: colors.stone[800],
            drawerInactiveTintColor: colors.stone[500],
         }}
         initialRouteName="works"
      >
         <Drawer.Screen
            name="index"
            options={{
               drawerLabel: "Home",
               title: "",
               drawerIcon: ({ color }) => (
                  <BeakerIcon
                     size={16}
                     color={color}
                     style={{ marginRight: 5 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="UI"
            options={{
               drawerLabel: "UI Animated",
               title: "",
               drawerIcon: ({ color }) => (
                  <CursorArrowRippleIcon
                     size={16}
                     color={color}
                     style={{ marginRight: 5 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="photos"
            options={{
               drawerLabel: "Gallery",
               title: "",
               drawerIcon: ({ color }) => (
                  <PhotoIcon
                     size={16}
                     color={color}
                     style={{ marginRight: 5 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="wordle"
            options={{
               drawerLabel: "Wordle",
               title: "",
               drawerIcon: ({ color }) => (
                  <Squares2X2Icon
                     size={16}
                     color={color}
                     style={{ marginRight: 5 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="smoking"
            options={{
               drawerLabel: "Smoking",
               title: "",
               drawerIcon: ({ color }) => (
                  <ArrowTrendingUpIcon
                     size={16}
                     color={color}
                     style={{ marginRight: 5 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="template"
            options={{
               drawerLabel: "Template",
               title: "",
               drawerIcon: ({ color }) => (
                  <DocumentDuplicateIcon
                     size={16}
                     color={color}
                     style={{ marginRight: 5 }}
                  />
               ),
            }}
         />
      </Drawer>
   )
}

export default DrawerLayout
