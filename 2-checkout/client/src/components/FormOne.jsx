import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  updateStateFromEvent(event, prop) {
    const stateChange = {};
    stateChange[prop] = event.target.value;
    this.setState(stateChange);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="form-one">
        <span>Name: </span>
        <input
          value={this.state.name}
          onChange={(e) => this.updateStateFromEvent(e, 'name')}
        ></input>
        <br />
        <span>Email: </span>
        <input
          value={this.state.email}
          onChange={(e) => this.updateStateFromEvent(e, 'email')}
        ></input>
        <br />
        <span>Password: </span>
        <input
          value={this.state.password}
          onChange={(e) => this.updateStateFromEvent(e, 'password')}
        ></input>
        <br />
        <button onClick={() => this.props.submitForm(this.state)}>
          Next 👉
        </button>
      </div>
    );
  }
}

FormOne.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

export default FormOne;
