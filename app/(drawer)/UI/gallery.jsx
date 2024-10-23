import React from "react"
import ScreenStackFull from "@/src/layouts/ScreenStackFull"
import Gallery from "react-native-awesome-gallery"

// Get local data
const data = require("@/data/movies.json")

const GalleryScreen = () => {
   const images = data.movies.map((movie) => movie.poster)
   //console.log("images", images)

   return (
      <>
         <ScreenStackFull title="Image Gallery" />
         <Gallery
            data={images}
            onIndexChange={(index) => {
               //console.log("onIndexChange", index)
            }}
         />
      </>
   )
}

export default GalleryScreen
