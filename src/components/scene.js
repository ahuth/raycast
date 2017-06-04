import PropTypes from "prop-types"
import React from "react"
import Column from "./column"

export default class Scene extends React.Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.state = {columns: []}
    this.styles = {
      height: props.height,
      width: props.width,
      border: "1px solid black",
      position: "relative"
    }
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
      <div style={this.styles}>
        {this.state.columns.map((ray, index) => {
          return (
            <Column
              color="#0000FF"
              distance={ray}
              key={index}
              mapHeight={this.props.map.height}
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
