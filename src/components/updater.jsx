import Mousetrap from 'mousetrap';
import React from 'react';

export default class Updater extends React.Component {
  state = { columns: [] };

  componentDidMount() {
    this.props.loop.subscribe(this.update);
    Mousetrap.bind(['w', 's', 'a', 'd', 'left', 'right'], this.handleKeyDown, 'keydown');
    Mousetrap.bind(['w', 's', 'a', 'd', 'left', 'right'], this.handleKeyUp, 'keyup');
    this.computeColumns();
  }

  componentWillUnmount() {
    this.props.loop.stop();
    Mousetrap.unbind(['w', 's', 'a', 'd', 'left', 'right'], 'keydown');
    Mousetrap.unbind(['w', 's', 'a', 'd', 'left', 'right'], 'keyup');
  }

  update = () => {
    if (this.isPressingKey()) {
      if (this.state.w) { this.props.player.moveForward(this.props.map); }
      if (this.state.s) { this.props.player.moveBackward(this.props.map); }
      if (this.state.a) { this.props.player.moveLeft(this.props.map); }
      if (this.state.d) { this.props.player.moveRight(this.props.map); }
      if (this.state.ArrowLeft) { this.props.player.turnLeft(); }
      if (this.state.ArrowRight) { this.props.player.turnRight(); }
      this.computeColumns();
    }
  }

  handleKeyDown = (event) => {
    this.setState({ [event.key]: true });
  }

  handleKeyUp = (event) => {
    this.setState({ [event.key]: false });
  }

  isPressingKey = () => this.state.w || this.state.s || this.state.a || this.state.d || this.state.ArrowLeft || this.state.ArrowRight

  computeColumns = () => {
    this.setState({ columns: this.props.player.castRays(this.props.map, this.props.fov, this.props.resolution) });
  }

  render() {
    return this.props.children({ columns: this.state.columns });
  }
}
