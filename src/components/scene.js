// @flow

import PropTypes from "prop-types"
import Mousetrap from "mousetrap"
import React from "react"
import Column from "./column"

export default class Scene extends React.Component {
  state = {columns: []}

  componentDidMount() {
    this.props.loop.subscribe(this.update)
    Mousetrap.bind(["w", "s", "a", "d", "left", "right"], this.handleKeyDown, "keydown")
    Mousetrap.bind(["w", "s", "a", "d", "left", "right"], this.handleKeyUp, "keyup")
    this.renderScene()
  }

  componentWillUnmount() {
    this.props.loop.stop()
    Mousetrap.unbind(["w", "s", "a", "d", "left", "right"], "keydown")
    Mousetrap.unbind(["w", "s", "a", "d", "left", "right"], "keyup")
  }

  update = () => {
    if (this.isPressingKey()) {
      if (this.state.w) { this.props.player.moveForward(this.props.map) }
      if (this.state.s) { this.props.player.moveBackward(this.props.map) }
      if (this.state.a) { this.props.player.moveLeft(this.props.map) }
      if (this.state.d) { this.props.player.moveRight(this.props.map) }
      if (this.state.ArrowLeft) { this.props.player.turnLeft() }
      if (this.state.ArrowRight) { this.props.player.turnRight() }
      this.renderScene()
    }
  }

  handleKeyDown = (event) => {
    this.setState({[event.key]: true})
  }

  handleKeyUp = (event) => {
    this.setState({[event.key]: false})
  }

  isPressingKey = () => {
    return this.state.w || this.state.s || this.state.a || this.state.d || this.state.ArrowLeft || this.state.ArrowRight
  }

  renderScene = () => {
    this.setState({columns: this.props.player.castRays(this.props.map, this.props.fov, this.props.resolution)})
  }

  render() {
    return (
      <div style={{...styles.container, height: this.props.height, width: this.props.width}}>
        <div style={styles.ceiling}></div>
        <div style={styles.floor}></div>
        {this.state.columns.map((ray, index) => {
          return (
            <Column
              color="#0000FF"
              distance={ray}
              key={index}
              mapHeight={this.props.map.height}
              number={index}
              resolution={this.props.resolution}
              screenHeight={this.props.height}
              screenWidth={this.props.width}
            />
          )
        })}
      </div>
    )
  }
}

const styles = {
  container: {
    border: "1px solid black",
    position: "relative"
  },
  ceiling: {
    backgroundColor: "SlateGrey",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "50%",
    top: 0
  },
  floor: {
    backgroundColor: "Gainsboro",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: "50%"
  }
}

Scene.propTypes = {
  loop: PropTypes.object.isRequired,
  resolution: PropTypes.number.isRequired,
  fov: PropTypes.number.isRequired,
  map: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}
