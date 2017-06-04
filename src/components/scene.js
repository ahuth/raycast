import PropTypes from "prop-types"
import React from "react"
import Column from "./column"
import "./scene.css"

export default class Scene extends React.Component {
  constructor() {
    super()
    this.update = this.update.bind(this)
    this.state = {columns: []}
  }

  componentWillMount() {
    this.context.loop.subscribe(this.update)
  }

  componentDidMount() {
    this.setState({columns: this.props.player.castRays(this.props.map, this.props.fov, this.props.resolution)})
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update)
  }

  update(seconds) {
  }

  render() {
    return (
      <div className="scene">
        {this.state.columns.map((ray, index) => {
          return (
            <Column
              color="blue"
              distance={100}
              key={index}
              number={index}
              resolution={this.props.resolution}
              screenHeight={400}
              screenWidth={720}
              width={2}
            />
          )
        })}
      </div>
    )
  }
}

Scene.contextTypes = {
  loop: PropTypes.object
}
