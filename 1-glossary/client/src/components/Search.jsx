import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filter: '' };
  }

  onChange(event) {
    this.setState({ filter: event.target.value });
  }

  search() {
    this.props.onSearch(this.state.filter);
    this.setState({ filter: '' });
  }

  render() {
    return (
      <div className="search">
        <h2>Search</h2>
        <input value={this.state.filter} onChange={this.onChange.bind(this)} />
        <button onClick={this.search.bind(this)}>Filter Results</button>
      </div>
    );
  }
}

export default Search;
