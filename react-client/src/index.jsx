import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [],
      query: ''
    }
    this.setState = this.setState.bind(this);
  }

  search(query) {
    // console.log('QUERY ', query);
    $.ajax({
      type: "POST",
      url: '/recipes',
      data: JSON.stringify(query), 
      success: (data) => {
        // console.log("POST DONE");
        this.get(query);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  get() {
    $.ajax({
      type: "GET",
      url: '/recipes', 
      success: (data) => {
        // console.log('GET REQ');
        this.setState ({
          recipes: data,
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  componentDidMount() {
    $.ajax({
      url: '/first', 
      success: (data) => {
        // console.log('DATA ', data);
        this.setState({
          recipes: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>RecipeMe</h1>
      <Search search={this.search.bind(this)} value={this.query}/>
      <List recipes={this.state.recipes}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));