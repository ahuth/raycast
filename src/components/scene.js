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
    return <span></span>
  }
}

Scene.contextTypes = {
  loop: PropTypes.object
}
