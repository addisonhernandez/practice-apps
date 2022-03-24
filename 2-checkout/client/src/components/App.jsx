import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentForm: 0,
      formOneData: {
        name: '',
        email: '',
        password: '', // danger, Will Robinson!
      },
      formTwoData: {
        shippingAddress: {
          lineOne: '',
          lineTwo: '',
          city: '',
          state: '',
          zipCode: '',
        },
        phoneNumber: '',
      },
      formThreeData: {
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        zipCode: '',
      },
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
