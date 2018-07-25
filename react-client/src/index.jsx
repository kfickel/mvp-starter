import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';
import UserSaveRecipes from './components/UserSaveRecipes.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recipes: [],
      query: '',
      savedRecipes: [],
    }
    this.setState = this.setState.bind(this);
  }

  search(query) {
    $.ajax({
      type: "POST",
      url: '/recipes',
      data: JSON.stringify(query), 
      success: (data) => {
        this.get();
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
        this.setState ({
          recipes: data,
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  // getSave() {
  //   $.ajax({
  //     type: "GET",
  //     url: '/save', 
  //     success: (data) => {
  //       console.log('SAVE ', data)
  //       this.setState ({
  //         savedRecipes: data,
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  // save(title, query) {
  //   console.log('TITLE ', title);
  //   $.ajax({
  //     type: "POST",
  //     url: '/save', 
  //     data: JSON.stringify(title +'...'+query),
  //     success: (data) => {
  //       console.log('GET REQ');
  //       this.getSave('/save');
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  componentDidMount() {
    $.ajax({
      url: '/first', 
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
      <Search search={this.search.bind(this)} value={this.query}/>
      <div className="Row">
        <List className="column" recipes={this.state.recipes} />
      </div>
    </div>)
  }
}
// <UserSaveRecipes className="column" savedRecipes={this.state.savedRecipes}/>
//list's save save={this.save.bind(this)}

ReactDOM.render(<App class="app"/>, document.getElementById('app'));