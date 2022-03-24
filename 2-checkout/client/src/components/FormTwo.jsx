import React, { Component } from 'react';

class FormTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingAddress: {
        lineOne: '',
        lineTwo: '',
        city: '',
        state: '',
        zipCode: '',
      },
      phoneNumber: '',
    };
  }

  updateAddress(event, prop) {
    const stateChange = { shippingAddress: { ...this.state.shippingAddress } };
    stateChange.shippingAddress[prop] = event.target.value;
    this.setState(stateChange);
  }

  updatePhoneNumber(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="form-two">
        {/* TODO: see if there's a good way to dynamically generate these */}
        <span>Address Line One: </span>
        <input
          value={this.state.name}
          onChange={(e) => this.updateAddress(e, 'lineOne')}
        ></input>
        <br />
        <span>Address Line Two: </span>
        <input
          value={this.state.email}
          onChange={(e) => this.updateAddress(e, 'lineTwo')}
        ></input>
        <br />
        <span>City: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updateAddress(e, 'city')}
        ></input>
        <br />
        <span>State: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updateAddress(e, 'state')}
        ></input>
        <br />
        <span>Zip Code: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updateAddress(e, 'zipCode')}
        ></input>
        <br />
        <span>Phone Number: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updatePhoneNumber(e, 'password')}
        ></input>
        <br />
        <button onClick={() => this.props.submitForm(this.state)}>
          Next 👉
        </button>
      </div>
    );
  }
}

FormTwo.propTypes = {};

export default FormTwo;
