import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: ''
    };
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  search(){
    // console.log('search ', this.state.search);
    this.props.search(this.state.search);
  }

  handleChange(e){
    // console.log('event ', e.target.value);
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input className="search" type="text" onChange={this.handleChange}/>
        <input type="submit" value="Submit" onClick={this.search}/>
      </div>
    )
  }
}

export default Search;