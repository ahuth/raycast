import React from "react"
import Loop from "./loop"
import Map from "../utils/map"
import Player from "../utils/player"
import Scene from "./scene"

export default function App() {
  return (
    <Loop>
      <Scene
        map={new Map(32)}
        player={new Player(15.3, -1.2, Math.PI * 0.3)}
      />
    </Loop>
  )
}
