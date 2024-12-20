import { View, Text } from "react-native"
import React from "react"
import { Redirect } from "expo-router"

const Home = () => {
   return <Redirect href="(drawer)/wordle/gameEnd?win=false&word=hello" />
}

export default Home
