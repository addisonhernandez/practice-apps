import React, { Component } from 'react';
import FormOne from './FormOne.jsx';
import FormTwo from './FormTwo.jsx';
import FormThree from './FormThree.jsx';
import Confirmation from './Confirmation.jsx';

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

  handleFormSubmit(formData, formName, nextFormIndex) {
    const stateChange = {};

    stateChange[formName] = formData;
    stateChange.currentForm = nextFormIndex;

    this.setState(stateChange, () => {
      fetch('/form/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      });
    });
  }

  componentDidMount() {}

  render() {
    switch (this.state.currentForm) {
      case 1:
        return (
          <FormOne
            submitForm={(formData) =>
              this.handleFormSubmit(formData, 'formOneData', 2)
            }
          />
        );
      case 2:
        return (
          <FormTwo
            submitForm={(formData) =>
              this.handleFormSubmit(formData, 'formTwoData', 3)
            }
          />
        );
      case 3:
        return (
          <FormThree
            submitForm={(formData) =>
              this.handleFormSubmit(formData, 'formThreeData', 4)
            }
          />
        );
      case 4:
        return <Confirmation formData={this.state} />;
      case 0:
      default:
        return (
          <button onClick={() => this.setState({ currentForm: 1 })}>
            Checkout 🛒
          </button>
        );
    }
  }
}

export default App;
