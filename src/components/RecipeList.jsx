import React from "react";
import Recipe from "./Recipe.jsx";

export default function RecipeList({recipes, selectRecipe, changeToGrid}) {
  return (
    recipes.map((recipe, index) => {
      return <Recipe key={recipe.id} count={recipe.count} id={recipe.id} title={recipe.title} 
              image={recipe.image} dishTypes={recipe.dishTypes} diets={recipe.diets} cuisines={recipe.cuisines} selectRecipe={selectRecipe} changeToGrid={changeToGrid}></Recipe>
    })
  )
}
