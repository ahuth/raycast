import React from "react"
import Loop from "./loop"
import Map from "../utils/map"
import Player from "../utils/player"
import Scene from "./scene"

export default function App() {
  return (
    <Loop>
      <Scene
        resolution={320}
        fov={Math.PI / 3}
        map={new Map(32, 64).randomize()}
        player={new Player(15.3, -1.2, 32, Math.PI * 0.3)}
      />
    </Loop>
  )
}
