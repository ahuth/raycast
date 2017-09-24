import React from "react"
import Map from "../utils/map"
import Player from "../utils/player"
import Scene from "./scene"
import {fromDegrees} from "../utils/radians"

export default function App() {
  return (
    <div>
      <Scene
        resolution={320}
        fov={fromDegrees(60)}
        map={new Map(64)}
        player={new Player(160, 160, fromDegrees(0))}
        height={400}
        width={740}
      />
      <span>Move using the w, s, a, d, ←, and → keys</span>
    </div>
  )
}
