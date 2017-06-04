import React from "react"
import Loop from "./loop"
import Map from "../utils/map"
import Player from "../utils/player"
import Scene from "./scene"
import {fromDegrees} from "../utils/radians"

export default function App() {
  return (
    <Loop>
      <Scene
        resolution={320}
        fov={fromDegrees(60)}
        map={new Map(32, 64).randomize()}
        player={new Player(1024, 1024, 32, fromDegrees(54))}
        height={400}
        width={720}
      />
    </Loop>
  )
}
