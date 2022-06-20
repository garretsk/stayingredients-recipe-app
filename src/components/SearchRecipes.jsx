import React, { useState, useEffect, useRef } from "react";
import RecipeList from "./RecipeList.jsx";
import RecipeListDetails from "./RecipeListDetails.jsx";
import FilterMenu from "./FilterMenu";
import ToggleSwitch from "./ToggleSwitch.jsx"
import '../searchResults.css'
import 'animate.css'
import Expand from "react-expand-animated";
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import jwt_decode from "jwt-decode";


function SearchRecipes() {
  const [expand, setExpand] = useState(false);

  useEffect(async () => {
    setExpand(true);

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;
    console.log("getting pantry");

    fetch("https://stayingredients-recipe-app-backend.vercel.app/api/users/getPantry/" + name)
      .then(response => response.json())
      .then((res) => {
        console.log("PANTRY: " + res.userPantry);
        let userPantryNames = [];
        for(let i = 0; i < res.userPantry.length; i++) {
          userPantryNames.push(res.userPantry[i].name);
        }
        setPantry(userPantryNames);
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      
  }, []);

  const MAX_COOK_TIME = 150;
  const CALORIE_SCALE = 15;
  var substituteLock = 0;

  let [pantry, setPantry] = useState("");
  let [recipes, setRecipes] = useState([]);
  let [cuisines, setCuisines] = useState("");
  let [mealTypes, setMealTypes] = useState("");
  let [intolerances, setIntolerances] = useState("");
  let [diets, setDiets] = useState("");
  let [strictSearch, setStrictSearch] = useState(false)
  let [maxCookTime, setMaxCookTime] = useState(150) // minutes
  let [minProtein, setMinProtein] = useState(0) // grams
  let [calories, setCalories] = useState([0, 100]) // Values from 0 to 100, have to be scaled so 100 is really 1500 calories
  let [maxResults, setMaxResults] = useState("10"); // Max recipes shown as string, must convert to int when using

  const searchQueryRefFull = useRef();
  const searchQueryRefSmall = useRef();

  async function selectRecipe(id) {
    const newRecipes = [...recipes];
    const recipe = newRecipes.find(recipe => recipe.id === id);

    newRecipes.map(recipe => {
      recipe.isSelected = false;
    })
    recipe.isSelected = true;

    recipe.substitutions = [];
    // NOTE strict search is now actually "Show Ingredient Substitutions"
    if(strictSearch) {
      recipe.missedIngredients.map(async (ingredient) => {
        substituteLock++;
        const options = { 
          'method': 'GET',
          'headers': {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_SPOONACULAR_KEY
          }
        };
        let url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/substitutes?ingredientName=" + ingredient.name;
        await fetch(url, options)
        .then(response => response.json())
        .then(result => {
          if(result.status == "success") {
            recipe.substitutions.push(result);
          }
          substituteLock--;
        });
      });

    }
    
    // Lock until all requests are finished
    while(substituteLock != 0) {
      await new Promise(r => setTimeout(r, 100));
    }

    setRecipes(newRecipes);
  }

  function unselectRecipe(id) {
    const newRecipes = [...recipes];
    const recipe = newRecipes.find(recipe => recipe.id === id);

    recipe.isSelected = false;
    setRecipes(newRecipes);
  }

  function addToSavedRecipes(name, image) {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const uname = decoded.uname;

    let path = "https://stayingredients-recipe-app-backend.vercel.app/api/users/addSavedRecipe";
    console.log("addToSavedRecipes");
    console.log("--->>>");
    console.log(name);
    console.log(image);

    let body;
    let selectedRecipe = {name: name, image: image};
    body = {currentUser: uname, selectedRecipe: selectedRecipe};

    console.log(body);

    fetch(path, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData) {
          console.log("Added to saved recipes");
        } else {
          console.log("Couldn't add to saved recipes");
        }
      })
  }

  function removeFromSavedRecipes(name, image) {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const uname = decoded.uname;

    let path = "https://stayingredients-recipe-app-backend.vercel.app/api/users/removeSavedRecipe";
    console.log("removeFromSavedRecipes");
    console.log("--->>>");
    console.log(name);
    console.log(image);

    let body;
    let selectedRecipe = {name: name, image: image};
    body = {currentUser: uname, selectedRecipe: selectedRecipe};

    console.log(body);

    fetch(path, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData) {
          console.log("Removed from saved recipes");
        } else {
          console.log("Couldn't remove from saved recipes");
        }
      })
  }

  function saveUnsaveRecipe(id) {
    const newRecipes = [...recipes];
    const recipe = newRecipes.find(recipe => recipe.id === id);
    if (recipe.isSaved){
      recipe.isSaved = false;
      removeFromSavedRecipes(recipe.title, recipe.image);
    }
    else{
      recipe.isSaved = true;
      console.log("RECIPE VAR--->>>");
      console.log(recipe);
      console.log("------");
      console.log(recipe.title);
      console.log(recipe.image);
      addToSavedRecipes(recipe.title, recipe.image);
    }
  }

  const calorieMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 20,
      label: '300',
    },
    {
      value: 40,
      label: '600',
    },
    {
      value: 60,
      label: '900',
    },
    {
      value: 80,
      label: '1200',
    },
    {
      value: 100,
      label: '1500',
    },
  ];

  const maxCookTimeMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 60,
      label: '60',
    },
    {
      value: 90,
      label: '90',
    },
    {
      value: 120,
      label: '120',
    },
    {
      value: 150,
      label: 'No Max',
    },
  ];

  const minProteinMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 60,
      label: '60',
    },
    {
      value: 80,
      label: '80',
    },
    {
      value: 100,
      label: '100',
    },
  ];
  
  function strictSearchCallback(checked) {
    setStrictSearch(checked);
  }
  
  function cuisineCallback(filters) {
    console.log("CUISINE: " + (filters.split(","))[0])

    setCuisines(filters);
  }

  function mealTypeCallback(filters) {
    setMealTypes(filters);
  }

  function intoleranceCallback(filters) {
    setIntolerances(filters);
  }

  function dietCallback(filters) {
    setDiets(filters);
  }

  function maxCookTimeCallback(event, filters) {
    setMaxCookTime(filters);
  }

  function minProteinCallback(event, filters) {
    setMinProtein(filters);
  }

  function caloriesCallback(event, filters) {
    setCalories(filters)
  }

  function maxResultsCallback(event, filters) {
    if(filters !== null) {
      setMaxResults(filters);
    }
  }

  function valuetext(value) {
    return `${value}°C`;
  }

  function minimizeSearch(){
    document.getElementById("searchForm").className = "animate__animated animate__fadeOutUp";
    showSmallSearch();
  }
  
function showSmallSearch(){
    setTimeout(function(){
      document.getElementById("fullForm").className = "hide";
      document.getElementById("smallForm").className = "smallForm";
      document.getElementById("searchForm").className = "smallSearch animate__animated animate__fadeInDown";
    }, 250);
  }

function changeToGrid(){
  document.getElementById("pageDisplay").className = "gridDisplay";
}

  // Onclick function for search recipes button
  function search (e) {
    e.preventDefault();
    var searchQuery = searchQueryRefFull.current.value;

    if (searchQueryRefSmall.current.value){
      searchQuery = searchQueryRefSmall.current.value;
    }

    // GET request using fetch with set headers
    const options = { 
      'method': 'GET',
      'headers': {
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_SPOONACULAR_KEY
      }
    };
    console.log(searchQuery);
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=" + searchQuery
                + "&includeIngredients=" + pantry
                + "&fillIngredients=true&sort=min-missing-ingredients&ignorePantry=true"
                + "&number=" + parseInt(maxResults)
                + "&addRecipeInformation=true"
                + "&cuisine=" + cuisines
                + "&diet=" + diets
                + "&type=" + mealTypes
                + "&intolerances=" + intolerances
                + "&minProtein=" + minProtein
                + "&minCalories=" + calories[0] * CALORIE_SCALE
                + "&maxCalories=" + calories[1] * CALORIE_SCALE;

    if(maxCookTime != MAX_COOK_TIME) {
      url += "&maxReadyTime=" + maxCookTime
    }
    console.log(url)
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log("PANTRY IS : " + pantry);
        setRecipes(prevRecipes => {
          var recipes = [];
          var substitutions = [];
          for(let i = 0; i < data.number && i < data.totalResults; i++) {
            var result = data.results[i]
            var steps = undefined;
            if(result.analyzedInstructions[0] !== undefined) {
              steps = result.analyzedInstructions[0].steps;
            }
            recipes.push({ count:i, id:result.id, title:result.title, summary:result.summary, image:result.image, steps:steps, ingredients:result.extendedIngredients, missedIngredients:result.missedIngredients, substitutions:substitutions, dishTypes:result.dishTypes, cuisines:result.cuisines, diets:result.diets, isSelected:false, isSaved:false});
            console.log(recipes);
            }
          return recipes
        })
      }).catch( () => {
        console.log("Out of points");
    });
  document.getElementById("pageDisplay").className = "";

}

  
// Onclick function for search recipes button
function getRandomRecipe (e) {
  e.preventDefault();
  // GET request using fetch with set headers
  const options = { 
    'method': 'GET',
    'headers': {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_SPOONACULAR_KEY
    }
  };
  var url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?"
              + "&includeIngredients=" + pantry
              + "&fillIngredients=true&sort=min-missing-ingredients&number=100&ignorePantry=true"
              + "&addRecipeInformation=true"
              + "&cuisine=" + cuisines
              + "&diet=" + diets
              + "&type=" + mealTypes
              + "&intolerances=" + intolerances
              + "&minProtein=" + minProtein
              + "&minCalories=" + calories[0] * CALORIE_SCALE
              + "&maxCalories=" + calories[1] * CALORIE_SCALE;

  if(maxCookTime != MAX_COOK_TIME) {
    url += "&maxReadyTime=" + maxCookTime
  }
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      setRecipes(prevRecipes => {
        var recipes = [];
        var substitutions = [];
        var i = Math.floor(Math.random() * 100);
        var result = data.results[i]

        if(result.analyzedInstructions[0] != undefined) {
          var steps = result.analyzedInstructions[0].steps;
        }
        recipes.push({ id:result.id, title:result.title, summary:result.summary, image:result.image,  dishTypes:result.dishTypes, cuisines:result.cuisines, diets:result.diets, steps:steps, ingredients:result.extendedIngredients, missedIngredients:result.missedIngredients, substitutions:substitutions, isSelected:false});
      
        return recipes
      })
    })
  document.getElementById("pageDisplay").className = "";
}
    //maybe onclick, show a different element to get animation.
  return (
    <>
    <Expand open={expand}>
      <div className="search-recipes">
        <div id="container" class="container">
          <div class="mask d-flex align-items-center h-100">
            <div id="container" class="container h-100">
              <div id="form" class="row d-flex justify-content-center align-items-center h-100">
                <div id="searchForm">
                  <div  class="card" styles="border-radius: 15px;">
                    <div class="card-body p-5">
                      <div id="fullForm">
                        <h1 class="font-weight-bold text-center sig-heading">Search Recipes</h1>
                        <form id="searchBar" class="form-inline justify-content-center my-2 my-lg-0" onSubmit={search}>
                          <input class="form-control mt-sm-4 mr-sm-3" ref={searchQueryRefFull} type="text" placeholder="Search" aria-label="Search"/>
                          <button class="btn btn-outline mt-sm-4 my-2 my-sm-0" type="submit">Search</button>
                          <button class="btn btn-outline mt-sm-4 my-2 my-sm-0" onClick={getRandomRecipe}>Random</button>
                        </form>
                        <br/>
                        <div id ="filters" class="row d-flex justify-content-center align-items-center h-100">
                          <FilterMenu filterType="mealTypes" title="Meal Type" callback={mealTypeCallback}></FilterMenu>
                          <FilterMenu filterType="cuisines" title="Cuisine" callback={cuisineCallback} selectedOptions={cuisines.split(",")}></FilterMenu>
                          <FilterMenu filterType="diet" title="Diet" callback={dietCallback}></FilterMenu>
                          <FilterMenu filterType="intolerances" title="Intolerances" callback={intoleranceCallback}></FilterMenu>
                          <div class="subToggle">
                            <ToggleSwitch title ="Show Ingredient Substitutions" callback={strictSearchCallback} checked={strictSearch}></ToggleSwitch>
                          </div>
                          <div class="sliders">
                            Max Cook Time
                            <Slider aria-label="Max Cook Time" getAriaValueText={valuetext} value={maxCookTime} valueLabelDisplay="off" marks={maxCookTimeMarks} min={0} max={150} onChangeCommitted={maxCookTimeCallback}/>
                            Min Protein Per Serving
                            <Slider aria-label="Min Protein Per Serving" getAriaValueText={valuetext} value={minProtein} valueLabelDisplay="off" marks={minProteinMarks} min={0} max={100} track="inverted" onChangeCommitted={minProteinCallback}/>
                            Calories Per Serving
                            <Slider aria-label="Calories Per Serving" getAriaValueText={valuetext} valueLabelDisplay="off" value={calories} marks={calorieMarks} onChangeCommitted={caloriesCallback}/>
                            Max Search Results
                          </div>
                          <ToggleButtonGroup color="primary" value={maxResults} exclusive onChange={maxResultsCallback}>
                            <ToggleButton value="10">10</ToggleButton>
                            <ToggleButton value="100">100</ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                      </div>
                    </div>
                    <div class="card-body smallBody">
                      <div id="smallForm" class="hide">
                        <form id="searchBar" class="form-inline" onSubmit={search}>
                          <input class="form-control mt-sm-4 mr-sm-3" ref={searchQueryRefSmall} type="text" placeholder="Search" aria-label="Search"/>
                          <button class="btn btn-outline mt-sm-4 my-2 my-sm-0" type="submit">Search</button>
                          <button class="btn btn-outline mt-sm-4 my-2 my-sm-0" onClick={getRandomRecipe}>Random</button>
                          
                            <div class="smallFilters">
                              <FilterMenu filterType="mealTypes" title="Meal Type" callback={mealTypeCallback}></FilterMenu>
                              <FilterMenu filterType="cuisines" title="Cuisine" callback={cuisineCallback} selectedOptions={cuisines.split(",")}></FilterMenu>
                              <FilterMenu filterType="diet" title="Diet" callback={dietCallback}></FilterMenu>
                              <FilterMenu filterType="intolerances" title="Intolerances" callback={intoleranceCallback}></FilterMenu>
                              <ToggleSwitch title ="Show Ingredient Substitutions" callback={strictSearchCallback} checked={strictSearch}></ToggleSwitch>
                            </div>
                            <div class="smallSliders">
                              Max Cook Time
                              <Slider aria-label="Max Cook Time" getAriaValueText={valuetext} value={maxCookTime} valueLabelDisplay="off" marks={maxCookTimeMarks} min={0} max={150} onChangeCommitted={maxCookTimeCallback}/>
                              Min Protein Per Serving
                              <Slider aria-label="Min Protein Per Serving" getAriaValueText={valuetext} value={minProtein} valueLabelDisplay="off" marks={minProteinMarks} min={0} max={100} track="inverted" onChangeCommitted={minProteinCallback}/>
                              Calories Per Serving
                              <Slider aria-label="Calories Per Serving" getAriaValueText={valuetext} valueLabelDisplay="off" value={calories} marks={calorieMarks} onChangeCommitted={caloriesCallback}/>
                            </div>
                            <div class="smallResults">
                              Max Search Results
                              <ToggleButtonGroup color="primary" value={maxResults} exclusive onChange={maxResultsCallback}>
                                <ToggleButton value="10">10</ToggleButton>
                                <ToggleButton value="100">100</ToggleButton>
                              </ToggleButtonGroup>
                            </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="pageDisplay">
          <div>
            <RecipeList recipes={recipes} selectRecipe={selectRecipe} changeToGrid={changeToGrid}></RecipeList>
          </div>
          <div>
            <RecipeListDetails recipes={recipes} unselectRecipe={unselectRecipe} saveUnsaveRecipe={saveUnsaveRecipe}></RecipeListDetails>
          </div>
        </div>
      </div>
    </Expand>
    </>
  );
}

export default SearchRecipes;