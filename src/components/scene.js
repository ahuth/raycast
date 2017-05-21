import PropTypes from "prop-types"
import React from "react"
import Camera from "../utils/camera"

export default class Scene extends React.Component {
  constructor() {
    super()
    this.update = this.update.bind(this)
    this.state = {}
  }

  componentWillMount() {
    this.context.loop.subscribe(this.update)
  }

  componentDidMount() {
    this.camera = new Camera(this.canvasContext, this.props.resolution, this.props.focalLength)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update)
  }

  update(timestamp) {
  }

  render() {
    return (
      <canvas
        width="1"
        height="1"
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
