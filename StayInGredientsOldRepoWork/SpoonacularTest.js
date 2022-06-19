/****************************************************************************
 File name:    clock.js
 Author:       Zane French
 Date:         29 October 2020
 Class:        CS360
 Assignment:   03 JS Clock
 Purpose:      Define and implement the functions to draw the clocks
 ****************************************************************************/

const BTN = document.getElementById ('searchBtn');

BTN.addEventListener('click', onClick);

function onClick (event) {
  var query = $('#ingredients').val();
  console.log(query);


  settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + query +"&number=1&limitLicense=true&ranking=1&apiKey=69749ebe50eb464a865623a7fd55ca99",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
    }
  };
  
  $.ajax(settings).done(function (response) {
    var recipe = response.at(0);
    var ingredients = "Ingredients:<br>";
    var instructions = "<br>Instructions:<br>"
    var recipeId = recipe.id;
    for(var i = 0; i < recipe.missedIngredientCount; i++) {
      ingredients += recipe.missedIngredients[i].originalString += "<br>";
    }
    for(var i = 0; i < recipe.usedIngredientCount; i++) {
      ingredients += recipe.usedIngredients[i].originalString += "<br>";
    }
    $("#recipeTitle").html(response.at(0).title);
    $("#recipeIngredients").html(ingredients);
    settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.spoonacular.com/recipes/" + recipeId + "/information?includeNutrition=false&apiKey=69749ebe50eb464a865623a7fd55ca99",
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
      }
    };
    $.ajax(settings).done(function (response) {
      $("#recipeSteps").html("Instructions:<br>" + response.instructions);
    });
    


    console.log(response);
  });
}