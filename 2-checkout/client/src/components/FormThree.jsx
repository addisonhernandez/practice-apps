import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      zipCode: '',
    };
  }

  updateStateFromEvent(event, prop) {
    const stateChange = {};
    stateChange[prop] = event.target.value;
    this.setState(stateChange);
  }

  componentDidMount() {/* TODO: load data if resuming a session */}

  render() {
    return (
      <div className="form-one">
        <span>Credit Card Number: </span>
        <input
          value={this.state.name}
          onChange={(e) => this.updateStateFromEvent(e, 'cardNumber')}
        ></input>
        <br />
        <span>Expiration Date: </span>
        <input
          value={this.state.email}
          onChange={(e) => this.updateStateFromEvent(e, 'expiryDate')}
        ></input>
        <br />
        <span>CVV: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updateStateFromEvent(e, 'cvv')}
        ></input>
        <br />
        <span>Billing Zip Code: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updateStateFromEvent(e, 'zipCode')}
        ></input>
        <br />
        <button onClick={() => this.props.submitForm(this.state)}>
          Next 👉
        </button>
      </div>
    );
  }
}

FormThree.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

export default FormThree;
