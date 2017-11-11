import React from 'react';

const ListItem = (props) => (
  <div>
    <img src={props.recipe.imageUrl}/>
    <div><a href={props.recipe.recipeUrl}>{ props.recipe.title }</a></div>
    <div>Rating: {props.recipe.rating}</div>
    <p/>
  </div>
)

export default ListItem;