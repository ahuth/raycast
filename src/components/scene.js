import PropTypes from "prop-types"
import React from "react"
import Camera from "../utils/camera"
import Game from "../utils/game"

export default class Scene extends React.Component {
  constructor() {
    super()
    this.update = this.update.bind(this)
  }

  componentWillMount() {
    this.context.loop.subscribe(this.update)
  }

  componentDidMount() {
    const camera = new Camera(this.canvasContext, this.props.resolution, this.props.focalLength, this.props.range)
    this.game = new Game(camera, this.props.player, this.props.map)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update)
    this.game = null
  }

  update(seconds) {
    this.game.update(seconds)
  }

  render() {
    return (
      <canvas
        style={{height: "100%", width: "100%"}}
        ref={(canvas) => { this.canvasContext = canvas.getContext("2d") }}
      >
      </canvas>
    )
  }
}

Scene.contextTypes = {
  loop: PropTypes.object
}
