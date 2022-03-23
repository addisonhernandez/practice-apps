import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filter: '' };
  }

  onChange(event) {
    this.setState({ filter: event.target.value });
  }

  filter() {
    this.props.onSearch(this.state.filter);
  }

  render() {
    return (
      <div className="search">
        <input value={this.state.filter} onChange={this.onChange.bind(this)} />
        <button onClick={this.props.onSearch.bind(this)}>Filter Results</button>
      </div>
    );
  }
}

export default Search;