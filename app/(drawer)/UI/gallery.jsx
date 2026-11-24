import { useCallback } from "react"
import { useNavigation } from "expo-router"
import { Image } from "expo-image"
import { GestureViewer } from "react-native-gesture-image-viewer"
import ScreenStackFull from "@/src/layouts/ScreenStackFull"

// Get local data
const data = require("@/data/movies.json")
const images = data.movies.map((movie) => movie.poster)

// Full size style (expo-image has no NativeWind cssInterop in this project, so no className)
const imageStyle = { width: "100%", height: "100%" }

const GalleryScreen = () => {
   const { goBack } = useNavigation()

   // Renders one poster; its natural size is given to the viewer, which uses it for the zoom bounds
   const renderItem = useCallback(
      (item, _index, { setItemDimensions }) => (
         <Image
            source={item}
            style={imageStyle}
            contentFit="contain"
            onLoad={(e) => {
               const { width, height } = e.source
               setItemDimensions({ width, height })
            }}
         />
      ),
      []
   )

   return (
      <>
         <ScreenStackFull title="Image Gallery" />
         <GestureViewer
            data={images}
            renderItem={renderItem}
            onDismiss={goBack}
            pageSpacing={30}
            enableLoop
         />
      </>
   )
}

export default GalleryScreen
