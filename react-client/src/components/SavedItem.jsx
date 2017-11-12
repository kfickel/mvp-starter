import React from 'react';

const SavedItem = (props) => (
  <div>
    <p/>
    <img src={props.savedRecipes.imageUrl}/>
    <div><a href={props.savedRecipes.recipeUrl}>{ props.savedRecipes.title }</a></div>
    <div>Rating: {props.savedRecipes.rating}</div>
    <p/>
  </div>
)

export default SavedItem;