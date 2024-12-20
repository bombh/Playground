import React, { memo, useEffect, useState } from "react"
import { MotiText, MotiView, useAnimationState } from "moti"
import colors from "tailwindcss/colors"

const Letter = ({ row, col, cell, color }) => {
   const transition = {
      type: "timing",
      duration: 400,
      delay: col * 50,
   }

   const animBackground = useAnimationState({
      from: {
         opacity: 1,
         scale: 0.5,
         backgroundColor: colors.white,
         borderColor: colors.gray[900],
         rotate: "0deg",
      },
      to: {
         opacity: 1,
         scale: 1,
         delay: row * col * 50,
         backgroundColor: colors.white,
         borderColor: colors.gray[400],
         rotate: "0deg",
      },
      green: {
         opacity: 1,
         scale: 1,
         backgroundColor: colors.lime[600],
         borderColor: colors.lime[600],
         rotate: "360deg",
         transition,
      },
      yellow: {
         opacity: 1,
         scale: 1,
         backgroundColor: colors.yellow[500],
         borderColor: colors.yellow[500],
         rotate: "360deg",
         transition,
      },
      grey: {
         opacity: 1,
         scale: 1,
         backgroundColor: colors.gray[500],
         borderColor: colors.gray[500],
         rotate: "360deg",
         transition,
      },
      default: {
         opacity: 1,
         scale: 1,
         backgroundColor: "white",
         borderColor: colors.gray[400],
         rotate: "360deg",
         transition,
      },
   })

   const animText = useAnimationState({
      from: {
         color: "black",
      },
      green: {
         color: "white",
      },
      yellow: {
         color: "white",
      },
      grey: {
         color: "white",
      },
      default: {
         color: "black",
      },
   })

   // Unmount component
   useEffect(() => {
      return () => {}
   }, [])

   useEffect(() => {
      if (animBackground && color) {
         console.log("animBackground.current", animBackground.current)
         if (animBackground.current === color) return

         animBackground.transitionTo(color)
         animText.transitionTo(color)
      }
   }, [color, animBackground])

   // useEffect(() => {
   //    console.log("cell.....", cell)
   // }, [cell])

   return (
      <MotiView
         state={animBackground}
         key={`col-${row}-${col}`}
         className="w-1/6 aspect-square border  justify-center items-center"
      >
         <MotiText
            state={animText}
            className="font-bold text-2xl uppercase"
         >
            {cell.letter}
         </MotiText>
      </MotiView>
   )
}

const areEqual = (prevProps, nextProps) =>
   prevProps.color === nextProps.color && prevProps.cell.letter === nextProps.cell.letter

export default memo(Letter, areEqual)
