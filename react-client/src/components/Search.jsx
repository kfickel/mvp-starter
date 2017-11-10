import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    };
  }
  render() {
    <input type="text" value={this.state.search} onChange={this.handleChange}/>
    <input type="submit" value="Submit"/>
  }
}

export default List;