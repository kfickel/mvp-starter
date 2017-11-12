import React from 'react';
import SavedItem from './SavedItem.jsx';

const UserSaveRecipes = (props) => (
  <div className="results">
    <h4> Saved Recipes {props.savedRecipes}</h4>
    { props.savedRecipes.map((recipe, index) => <SavedItem savedRecipe={recipe} key={index}/>)}
  </div>
)

export default UserSaveRecipes;