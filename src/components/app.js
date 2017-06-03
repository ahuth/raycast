import React from "react"
import Loop from "./loop"
import Map from "../utils/map"
import Player from "../utils/player"
import Scene from "./scene"
import {degreesToRadians} from "../utils/convert"

export default function App() {
  return (
    <Loop>
      <Scene
        resolution={320}
        fov={degreesToRadians(60)}
        map={new Map(32, 64).randomize()}
        player={new Player(1024, 1024, 32, degreesToRadians(54))}
      />
    </Loop>
  )
}
