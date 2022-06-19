import React from 'react';
import '../searchResults.css'
//import 'animate.css'

export default function Recipe(recipe) {

  function handleClick() {
    recipe.changeToGrid();
    recipe.selectRecipe(recipe.id);
  }

  function writeDishTypes(dishType) {
    return <span class="tags">
      <div class="tagText dishTypes">
        {dishType}
      </div>
      <br></br>
    </span>
  }

  function writeDiets(diet) {
    return <span class="tags">
      <div class="tagText diets">
        {diet}
      </div>
      <br></br>
    </span>
  }
    
  function writeCuisines(cuisine) {
    return <span class="tags">
      <div class="tagText cuisines">
        {cuisine}
      </div>
      <br></br>
    </span>
  }

  return (
      <div>
        <div id="resultContainer" onClick={handleClick} class="resultContainer animate__animated animate__bounceInUp animate__fast animate__delay-2s">
        <div class="gridContainer">
          <img src={recipe.image} alt="Food"/>
          <div class="recipeTitle">{recipe.title}</div>
          <div>
            {(recipe.dishTypes !== undefined) && recipe.dishTypes.map(dishType => {
              return writeDishTypes(dishType)
            })}
            {(recipe.diets !== undefined) && recipe.diets.map(diet => {
              return writeDiets(diet)
            })}
            {(recipe.cuisines !== undefined) && recipe.cuisines.map(cuisine => {
              return writeCuisines(cuisine)
            })}
          </div>
          </div>
          <hr/>
        </div>
      </div>
  )
}