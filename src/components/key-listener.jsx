import React from 'react';

const keys = ['w', 's', 'a', 'd', 'ArrowLeft', 'ArrowRight'];

export default class KeyListener extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (event) => {
    if (keys.includes(event.key)) {
      this.props.onKeyDown(event);
    }
  }

  handleKeyUp = (event) => {
    if (keys.includes(event.key)) {
      this.props.onKeyUp(event);
    }
  }

  render() {
    return this.props.children;
  }
}
