import Color from "color"
import React from "react"

export default function Column({color, distance, mapHeight, number, resolution, screenHeight, screenWidth}) {
  const height = Math.min(mapHeight / distance * 255, screenHeight)
  const width = screenWidth / resolution
  const top = (screenHeight / 2) - (height / 2)
  const adjustedColor = Color(color).darken(distance / 600).hex()
  const styles = {
    backgroundColor: adjustedColor,
    height: height,
    left: number * width,
    width: width,
    position: "absolute",
    top: top
  }
  return <div style={styles}></div>
}
