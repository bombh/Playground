import { useLocalSearchParams, useNavigation, Link } from "expo-router"
import { useCallback, useEffect } from "react"
import { View } from "react-native"
import { Image } from "expo-image"
import { GestureViewer, useGestureViewerState } from "react-native-gesture-image-viewer"

// Get local data
const jsonData = require("@/data/movies.json")
const images = jsonData.movies.map((item) => item.poster)

// Full size style (expo-image has no NativeWind cssInterop in this project, so no className)
const imageStyle = { width: "100%", height: "100%" }

// Space between two images while swiping
const PAGE_SPACING = 30

const DetailGallery = () => {
   const { setParams, goBack } = useNavigation()
   // Route params travel as strings: `index` = picture to open first
   const { index } = useLocalSearchParams()
   // Current picture, kept in the route params as before
   const { currentIndex, totalCount } = useGestureViewerState()

   // totalCount is 0 until the viewer is registered (currentIndex would be 0, not the route's index) and after unmount
   useEffect(() => {
      if (totalCount > 0) setParams({ index: String(currentIndex) })
   }, [currentIndex, totalCount, setParams])

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
      <View className="bg-black flex-1">
         <GestureViewer
            data={images}
            initialIndex={Number(index) || 0}
            renderItem={renderItem}
            onDismiss={goBack}
            pageSpacing={PAGE_SPACING}
            enableLoop
         />
         <Link href="/photos">Back Photos</Link>
      </View>
   )
}

export default DetailGallery
