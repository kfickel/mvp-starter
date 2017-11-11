import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div className="results">
    <h4> Recipes Results </h4>
    { props.recipes.map((recipe, index) => <ListItem recipe={recipe} key={index} save={props.save}/>)}
  </div>
)

export default List;