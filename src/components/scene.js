import PropTypes from "prop-types"
import React from "react"
import "./scene.css"

export default class Scene extends React.Component {
  constructor() {
    super()
    this.update = this.update.bind(this)
  }

  componentWillMount() {
    this.context.loop.subscribe(this.update)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update)
  }

  update(seconds) {
  }

  render() {
    return <div className="scene"></div>
  }
}

Scene.contextTypes = {
  loop: PropTypes.object
}
