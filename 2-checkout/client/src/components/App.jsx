import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <p>Hello, World!</p>
        <p>
          <code>
            Page Cookie: {JSON.stringify(document.cookie, undefined, '\t')}
          </code>
        </p>
      </>
    );
  }
}

export default App;
