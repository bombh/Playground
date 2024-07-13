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
            <View className="flex-row justify-center">
               <BeakerIcon
                  size={80}
                  color={colors.lime[400]}
               />
            </View>
            <View className="pb-5">
               <Text className="text-lime-300 text-center text-xl pt-3 font-rock">Playground</Text>
               <Text className="text-stone-500 text-center text-xs -mt-2">by bomb.H</Text>
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
            name="UIDoubleList"
            options={{
               drawerLabel: "UI Multi List",
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
