import React from 'react';
import '../searchResults.css'
//import 'animate.css'

export default function Recipe(recipe) {

  function closeRecipe ()
  {
    recipe.unselectRecipe(recipe.id);
    document.getElementById("pageDisplay").className = "";
  }

  function closeRecipeWindow(){
    document.getElementById("recipeWindow").className = "recipeWindow animate__animated animate__fadeOutDown animate__faster";
    setTimeout(function() {
      closeRecipe();
    }, 300);
  }

  function writeIngredients(ingredient) {
    return <span class="highlight">
    {console.log(ingredient)}
      <ul class="info">
        <li>{ingredient.original}</li>
      </ul>
    </span>
  }

  function writeSteps(step) {
    return <span class="highlight">
      <div class="info">
        {step.number}.&nbsp;
        {step.step}
      </div>
      <br></br>
    </span>
  }

  function writeSubstitutions(substitution) {
    if(substitution.status == "success") {
      return <span class="highlight">
      <ul class="info">
        <li>{substitution.ingredient}</li>
        {substitution.substitutes.map((sub) => {
          return writeSubstitute(sub)
        })}
      </ul>
    </span>
    }else {
      return
    }
    
  }

  function writeSubstitute(substitute) {
    return <span class="highlight">
      <ul class="info">
        <li>{substitute}</li>
      </ul>
    </span>
  }

  function saveUnsave(){
    recipe.saveUnsaveRecipe(recipe.id);
  }

  //have the recipe details be a separate function that searchRecipes calls
  return (
      <div>

        {(recipe.isSelected === true) &&
          <div id="recipeWindow" className="recipeWindow animate__animated animate__slideInRight animate__fast">
            <div id="handle" className="recipeBorder recipeDetailsTitle">{recipe.title}</div>
            <div className="closebtn" onClick={closeRecipeWindow}>X</div>
            
            <div className ="recipe">

              <img className="detailedPic" alt="Detailed Recipe" src={recipe.image}/>
              <br></br>
              <div className="heading">Summary</div>
              <div class="info" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              <br></br>

              <div className="heading">Ingredients</div>
              {recipe.ingredients.map(ingredient => {
                return writeIngredients(ingredient)
              })}

              {(recipe.substitutions.length != 0) &&
                <div className="heading">Ingredient substitutes</div>
              }

              {(recipe.substitutions.length != 0) &&
              recipe.substitutions.map((substitution) => {
                console.log(substitution)
                return writeSubstitutions(substitution)
              })}

                <div className="heading">Instructions</div>
                {(recipe.steps !== undefined) && recipe.steps.map(step => {
                  return writeSteps(step)
                })}
                <span>
                  <button className={`mt-5 sig-saved-recipe`}>
                    <span style={{display: "block", width: "100%", textAlign: "right"}} className="mt-0">
                      <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A//spoonacular.com/recipeImages/631807-312x231.jpg"><button style={{display: "inline"}} className="btn mr-2 mt-0">
                        <i className="fas fa-share"></i> Share
                      </button></a>
                      <button onClick={saveUnsave} style={{display: "inline"}} className="btn ml-2 mt-0">
                        <i className={`${
                          recipe.isSaved ? "fas" : "far"
                        } fa-bookmark`}></i>
                      </button>
                    </span>
                  </button>
              </span>
            </div>
          </div>  
        }
    </div>

  )
}

// recipe.steps.map(step => {
//   step<br>
// })