import React, { Component } from "react";
import SavedRecipe from "./SavedRecipe";
import jwt_decode from "jwt-decode";

export default class SavedRecipeList extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    this.state = {
      currentUser: name,
      savedRecipes: [],
      selectedRecipe: []
    };

    this.removeFromSavedRecipes = this.removeFromSavedRecipes.bind(this);
    this.addToSavedRecipes = this.addToSavedRecipes.bind(this);
    this.retrieveSavedRecipes = this.retrieveSavedRecipes.bind(this);
    this.toggleSaved = this.toggleSaved.bind(this);
  }

  removeFromSavedRecipes(name, image) {
    let path = "http://localhost:5000/api/users/removeSavedRecipe";
    console.log("removeFromSavedRecipes");

    let tempSelectedRecipe = {name: name, image: image};

    this.setState({selectedRecipe: tempSelectedRecipe}, () => {
      fetch(path, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
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
    });
  }

  addToSavedRecipes(name, image) {
    let path = "http://localhost:5000/api/users/addSavedRecipe";
    console.log("addToSavedRecipes");
    console.log("--->>>");
    console.log(name);
    console.log(image);

    let tempSelectedRecipe = {name: name, image: image};

    this.setState({selectedRecipe: tempSelectedRecipe}, () => {
      console.log(this.state);

      fetch(path, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
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
    });
  }

  retrieveSavedRecipes() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;
    console.log("getting saved recipes");

    fetch("http://localhost:5000/api/users/getSavedRecipes/" + name)
      .then(response => response.json())
      .then((res) => {
        console.log("SAVED_RECIPES: " + res.userSavedRecipes);
        
        let tempSavedRecipes = [];
        for (let i = 0; i < res.userSavedRecipes.length; ++i) {
          console.log("SAVED_RECIPES: " + res.userSavedRecipes[i].name);
          console.log("SAVED_RECIPES: " + res.userSavedRecipes[i].image);
          tempSavedRecipes.push({
            id: i,
            name: res.userSavedRecipes[i].name,
            image: res.userSavedRecipes[i].image,
            isSaved: true
          });
        }
        this.setState({savedRecipes: tempSavedRecipes});
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  }

  toggleSaved(id) {
    let tempSavedRecipes = this.state.savedRecipes;

    console.log(tempSavedRecipes);

    if(tempSavedRecipes[id].isSaved) {
      tempSavedRecipes[id].isSaved = false;
      this.removeFromSavedRecipes(tempSavedRecipes[id].name, tempSavedRecipes[id].image);
    }
    else {
      tempSavedRecipes[id].isSaved = true;
      this.addToSavedRecipes(tempSavedRecipes[id].name, tempSavedRecipes[id].image);
    }
    
    this.setState({
      savedRecipes: tempSavedRecipes
    });
  }

  componentDidMount() {
    this.retrieveSavedRecipes();
  }

  render() {
    let savedRecipeList = [];
    for(let i = 0; i < this.state.savedRecipes.length; ++i) {
      savedRecipeList.push(<SavedRecipe
        className="animate__animated animate__fadeInDown animate__fast"
        key={this.state.savedRecipes[i].id.toString()}
        id={this.state.savedRecipes[i].id}
        image={this.state.savedRecipes[i].image}
        name={this.state.savedRecipes[i].name}
        isSaved={this.state.savedRecipes[i].isSaved}
        toggleSaved={this.toggleSaved}
      />);
    }

    console.log(this.state.savedRecipes);

    return(
      <div>
        <div className="text-center my-2">
          <div className="form-inline justify-content-center mb-2">
            {0 === savedRecipeList.length &&
              <h5>You have no saved recipes</h5>
            }
            {savedRecipeList}
          </div>
        </div>
      </div>
    );
  }
}