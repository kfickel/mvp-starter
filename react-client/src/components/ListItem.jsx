import React from 'react';

const ListItem = (props) => (
  <div>
    <p/>
    <img src={props.recipe.imageUrl}/>
    <div><a href={props.recipe.recipeUrl}>{ props.recipe.title }</a></div>
    <div>Rating: {props.recipe.rating}</div>
    <p/>
  </div>
)

export default ListItem;

//     <input type="submit" value="SaveMe" onClick={() => {props.save(props.recipe.title, props.recipe.search)}}/>