import React, { Component } from 'react';

class ScrollToBottom extends Component {
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  render() {
    return null;
  }
}

export default ScrollToBottom;