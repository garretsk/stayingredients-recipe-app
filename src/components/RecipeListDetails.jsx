import React from "react";
import RecipeDetails from "./RecipeDetails.jsx";

export default function RecipeListDetails({recipes, unselectRecipe, saveUnsaveRecipe}) {
  return (
    recipes.map((recipe, index) => {
    
      return <RecipeDetails key={recipe.id} count={recipe.count} id={recipe.id} title={recipe.title} summary={recipe.summary} image={recipe.image} steps={recipe.steps} ingredients={recipe.ingredients} substitutions={recipe.substitutions} isSelected={recipe.isSelected} saveUnsaveRecipe={saveUnsaveRecipe} unselectRecipe={unselectRecipe} isSaved={recipe.isSaved}></RecipeDetails>

    })
  )
}
