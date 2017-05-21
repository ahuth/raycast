import PropTypes from "prop-types"
import React from "react"

export default class Scene extends React.Component {
  constructor() {
    super()
    this.update = this.update.bind(this)
    this.state = {}
  }

  componentWillMount() {
    this.context.loop.subscribe(this.update)
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
