// @flow

import Color from "color"
import React from "react"

type Props = {
  color: string,
  distance: number,
  mapHeight: number,
  number: number,
  resolution: number,
  screenHeight: number,
  screenWidth: number,
}

export default function Column({color, distance, mapHeight, number, resolution, screenHeight, screenWidth}: Props) {
  const height = Math.min(mapHeight / distance * 255, screenHeight)
  const width = screenWidth / resolution
  const top = (screenHeight - height) / 2
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
