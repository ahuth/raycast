import Color from "color"
import PropTypes from "prop-types"
import React from "react"

export default function Column({color, distance, mapHeight, number, resolution, screenHeight, screenWidth}) {
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

Column.propTypes = {
  color: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  mapHeight: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  resolution: PropTypes.number.isRequired,
  screenHeight: PropTypes.number.isRequired,
  screenWidth: PropTypes.number.isRequired
}
