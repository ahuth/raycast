import React from "react"

export default function Column({color, distance, number, resolution, screenHeight, screenWidth}) {
  const height = distance
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
