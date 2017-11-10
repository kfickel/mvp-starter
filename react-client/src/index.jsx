import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: []
    }
  }

  search() {

  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
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
      <Search search={this.search.bind(this)}/>
      <List recipes={this.state.recipes}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));