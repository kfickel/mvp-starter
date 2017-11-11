import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Recipes </h4>
    { props.recipes.map((recipe, index) => <ListItem recipe={recipe} key={index}/>)}
  </div>
)

export default List;