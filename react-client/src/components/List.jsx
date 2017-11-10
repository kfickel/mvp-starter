import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.recipes.length } recipes.
    { props.recipes.map(recipe => <ListItem recipe={recipe}/>)}
  </div>
)

export default List;