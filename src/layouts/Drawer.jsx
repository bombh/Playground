import { Drawer } from "expo-router/drawer"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { Text, View } from "react-native"
import { DocumentTextIcon, DocumentDuplicateIcon, BeakerIcon } from "react-native-heroicons/outline"
import colors from "tailwindcss/colors"

// Drawer content
const AppDrawerContent = (props) => {
   return (
      <>
         <DrawerContentScrollView {...props}>
            <View className="flex flex-row justify-center">
               <BeakerIcon
                  size={80}
                  color={colors.lime[400]}
               />
            </View>
            <View className="pb-5">
               <Text className="text-neutral-100 text-center text-xl font-extralight tracking-widest">PLAYGROUND</Text>
               <Text className="text-neutral-500 text-center text-xs -mt-1">by bomb.H</Text>
            </View>

            <DrawerItemList {...props} />
         </DrawerContentScrollView>
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
               backgroundColor: colors.neutral[900],
            },
            drawerLabelStyle: {
               marginLeft: -30,
            },
            drawerActiveTintColor: colors.white,
            drawerActiveBackgroundColor: colors.neutral[700],
            drawerInactiveTintColor: colors.neutral[400],
         }}
         initialRouteName="works"
      >
         <Drawer.Screen
            name="UIAnimatedList"
            options={{
               drawerLabel: "UI Anim List",
               title: "",
               drawerIcon: ({ color }) => (
                  <DocumentTextIcon
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
