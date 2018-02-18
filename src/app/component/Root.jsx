import React, { Component } from 'react';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date().toString(),
    };
  }

  render() {
    return (
      <div>
        <h1>Young Votes Count.</h1>
        <p>{this.state.date}</p>
      </div>
    );
  }
}

export default Root;
