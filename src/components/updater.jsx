import React from 'react';
import KeyListener from './key-listener';

export default class Updater extends React.Component {
  state = { rays: [] };

  componentDidMount() {
    this.props.loop.subscribe(this.update);
    this.computeRays();
  }

  componentWillUnmount() {
    this.props.loop.stop();
  }

  update = (elapsed) => {
    if (this.isPressingKey()) {
      if (this.state.w) { this.props.player.moveForward(this.props.map, elapsed); }
      if (this.state.s) { this.props.player.moveBackward(this.props.map, elapsed); }
      if (this.state.a) { this.props.player.moveLeft(this.props.map, elapsed); }
      if (this.state.d) { this.props.player.moveRight(this.props.map, elapsed); }
      if (this.state.ArrowLeft) { this.props.player.turnLeft(elapsed); }
      if (this.state.ArrowRight) { this.props.player.turnRight(elapsed); }
      this.computeRays();
    }
  }

  handleKeyDown = (event) => {
    this.setState({ [event.key]: true });
  }

  handleKeyUp = (event) => {
    this.setState({ [event.key]: false });
  }

  isPressingKey = () => {
    return this.state.w
      || this.state.s
      || this.state.a
      || this.state.d
      || this.state.ArrowLeft
      || this.state.ArrowRight;
  }

  computeRays = () => {
    const rays = this.props.player.castRays(this.props.map, this.props.fov, this.props.resolution);
    this.setState({ rays });
  }

  render() {
    return (
      <KeyListener
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        {this.props.children({ rays: this.state.rays })}
      </KeyListener>
    );
  }
}
