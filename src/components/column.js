import React from "react"

export default function Column({color, distance, mapHeight, number, resolution, screenHeight, screenWidth}) {
  const height = Math.min(mapHeight / distance * 255, mapHeight)
  const width = screenWidth / resolution
  const top = (screenHeight / 2) - (height / 2)
  const styles = {
    backgroundColor: color,
    height: height,
    left: number * width,
    width: width,
    position: "absolute",
    top: top
  }
  return <div style={styles}></div>
}
