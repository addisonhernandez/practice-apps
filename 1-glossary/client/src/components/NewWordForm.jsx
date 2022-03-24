import React from 'react';

class NewWordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      definition: '',
    };
  }

  handleWordChange(event) {
    this.setState({ word: event.target.value });
  }

  handleDefinitionChange(event) {
    this.setState({ definition: event.target.value });
  }

  submit() {
    this.props.onSubmit(this.state);
    this.setState({ word: '', definition: '' });
  }

  render() {
    return (
      <div className="new-word">
        <h2>Add an entry</h2>
        <input
          value={this.state.word}
          onChange={this.handleWordChange.bind(this)}
        />
        <input
          value={this.state.definition}
          onChange={this.handleDefinitionChange.bind(this)}
        />
        <button onClick={this.submit.bind(this)}>Add Glossary Entry</button>
      </div>
    );
  }
}

export default NewWordForm;
