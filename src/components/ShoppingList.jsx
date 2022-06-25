import React, { Component } from "react";
import PageTitle from "./PageTitle";
import SearchField from "./SearchField";
import IngredientList from "./IngredientList";
import SocialMediaSharePopUp from "./SocialMediaSharePopUp";
import validateSearchInput from "../utils/validateSearchInput";
import jwt_decode from "jwt-decode";
import Expand from "react-expand-animated";

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    this.state = {
      currentUser: name,
      expand: false,
      ingredientQuery: "",
      showSearchResultList: false,
      showSocialMediaShare: false,
      searchResultListIngredients: [],
      selectedIngredients: [],
      shoppingListIngredients: []
    };

    this.expand = this.expand.bind(this);
    this.handleIngredientQueryChange = this.handleIngredientQueryChange.bind(this);
    this.handleIngredientQuerySpeechInput = this.handleIngredientQuerySpeechInput.bind(this);
    this.searchIngredients = this.searchIngredients.bind(this);
    this.handleIngredientSelection = this.handleIngredientSelection.bind(this);
    this.addToShoppingList = this.addToShoppingList.bind(this);
    this.handleShoppingListSelection = this.handleShoppingListSelection.bind(this);
    this.retrieveShoppingList = this.retrieveShoppingList.bind(this);
    this.markAsGot = this.markAsGot.bind(this);
    this.removeFromShoppingList = this.removeFromShoppingList.bind(this);
    this.shareShoppingList = this.shareShoppingList.bind(this);
    this.handleSocialMediaSharePopUpClose = this.handleSocialMediaSharePopUpClose.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  handleIngredientQueryChange(event) {
    this.setState({ingredientQuery: event.target.value});
  }
  
  handleIngredientQuerySpeechInput(speechInput) {
    this.setState({ingredientQuery: speechInput});
  }
  
  searchIngredients(event) {
    event.preventDefault();
    const ingredientQuery = this.state.ingredientQuery;

    if(validateSearchInput(ingredientQuery)) {
      // GET request using fetch with set headers
      const options = { 
        'method': 'GET',
        'headers': {
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_SPOONACULAR_KEY
        }
      };
      const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?query=" + ingredientQuery + "&number=10&limitLicense=true&ranking=1";
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          let tempSearchResultListIngredients = [];
          for(let i = 0; i < 10; ++i) {
            try {
              tempSearchResultListIngredients.push({id: i, name: data[i].name, image: "https://spoonacular.com/cdn/ingredients_100x100/" + data[i].image, isSelected: false});
            }
            catch(e) {
              break;
            }
          }
          
          this.setState({searchResultListIngredients: tempSearchResultListIngredients});
          if(!this.state.showSearchResultList) {
            this.setState({showSearchResultList: true});
          }
        });
    }
  }

  handleIngredientSelection(id) {
    let tempSearchResultListIngredients = this.state.searchResultListIngredients;

    if(tempSearchResultListIngredients[id].isSelected) {
      tempSearchResultListIngredients[id].isSelected = false;
    }
    else {
      tempSearchResultListIngredients[id].isSelected = true;
    }
    
    this.setState({
      searchResultListIngredients: tempSearchResultListIngredients
    });
  }

  addToShoppingList() {
    let path = "https://stayingredients-backend.herokuapp.com/api/users/addShoppingList";
    let tempSelectedIngredients = [];
    let tempSearchResultListIngredients = [];
    let newIndex = 0;
    for(let i = 0; i < this.state.searchResultListIngredients.length; ++i) {
      if(this.state.searchResultListIngredients[i].isSelected) {
        tempSelectedIngredients.push({
          name: this.state.searchResultListIngredients[i].name,
          image: this.state.searchResultListIngredients[i].image
        });
      }
      else {
        tempSearchResultListIngredients.push({
          id: newIndex,
          name: this.state.searchResultListIngredients[i].name,
          image: this.state.searchResultListIngredients[i].image,
          isSelected: false
        });
        newIndex++;
      }
    }

    if(0 === tempSearchResultListIngredients.length) {
      this.setState({showSearchResultList: false});
    }

    this.setState({searchResultListIngredients: tempSearchResultListIngredients});
    this.setState({selectedIngredients: tempSelectedIngredients}, () => {
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
            console.log("Added to shopping list");
          } else {
            console.log("Couldn't add to shopping list");
          }

          this.retrieveShoppingList();
        })
    });
  }

  handleShoppingListSelection(id) {
    let tempShoppingListIngredients = this.state.shoppingListIngredients;

    if(tempShoppingListIngredients[id].isSelected) {
      tempShoppingListIngredients[id].isSelected = false;
    }
    else {
      tempShoppingListIngredients[id].isSelected = true;
    }
    
    this.setState({
      shoppingListIngredients: tempShoppingListIngredients
    });
  }

  retrieveShoppingList() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;
    console.log("getting shopping list");

    fetch("https://stayingredients-backend.herokuapp.com/api/users/getShoppingList/" + name)
      .then(response => response.json())
      .then((res) => {
        console.log("SHOPPING LIST: " + res.userShoppingList);
        
        let tempShoppingListIngredients = [];
        for (let i = 0; i < res.userShoppingList.length; ++i) {
          tempShoppingListIngredients.push({
            id: i,
            name: res.userShoppingList[i].name,
            image: res.userShoppingList[i].image,
            isSelected: false
          });
        }
        this.setState({shoppingListIngredients: tempShoppingListIngredients})
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  }

  markAsGot() {
    let addMPPath = "https://stayingredients-backend.herokuapp.com/api/users/addPantry";
    let removeSLPath = "https://stayingredients-backend.herokuapp.com/api/users/removeShoppingList";
    let tempSelectedIngredients = [];
    for(let i = 0; i < this.state.shoppingListIngredients.length; ++i) {
      if(this.state.shoppingListIngredients[i].isSelected) {
        tempSelectedIngredients.push({
          name: this.state.shoppingListIngredients[i].name,
          image: this.state.shoppingListIngredients[i].image
        });
      }
    }

    this.setState({selectedIngredients: tempSelectedIngredients}, () => {
      fetch(addMPPath, {
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
          if (resData.status === "success") {
            console.log("Added to my pantry");
          } else if (resData.status === "fail") {
            console.log("Couldn't add to my pantry");
          }
        })
        .then(
          fetch(removeSLPath, {
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
                console.log("Removed from shopping list");
              } else {
                console.log("Couldn't remove from shopping list");
              }

              this.retrieveShoppingList();
            })
        );
    });
  }

  removeFromShoppingList() {
    let removeSLPath = "https://stayingredients-backend.herokuapp.com/api/users/removeShoppingList";
    let tempSelectedIngredients = [];
    for(let i = 0; i < this.state.shoppingListIngredients.length; ++i) {
      if(this.state.shoppingListIngredients[i].isSelected) {
        tempSelectedIngredients.push({
          name: this.state.shoppingListIngredients[i].name,
          image: this.state.shoppingListIngredients[i].image
        });
      }
    }

    this.setState({selectedIngredients: tempSelectedIngredients}, () => {
        fetch(removeSLPath, {
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
              console.log("Removed from shopping list");
            } else {
              console.log("Couldn't remove from shopping list");
            }

            this.retrieveShoppingList();
          })
    });
  }

  shareShoppingList() {
    this.setState({showSocialMediaShare: true});
  }

  handleSocialMediaSharePopUpClose() {
    this.setState({showSocialMediaShare: false});
  }

  componentDidMount() {
    this.expand();
    this.retrieveShoppingList();
  }

  render() {
    let ingredientSearchListActions = [];
    ingredientSearchListActions.push({id: 0, action: this.addToShoppingList, label: "Add to Shopping List"});

    let myShoppingListActions = [];
    myShoppingListActions.push({id: 0, action: this.markAsGot, label: "Check off Shopping List"});
    myShoppingListActions.push({id: 1, action: this.removeFromShoppingList, label: "Remove from Shopping List"});

    return (
      <Expand open={this.state.expand}>
        <div className="shopping-list">
          <div className="container">
            <div className="mask d-flex align-items-center h-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card" styles="border-radius: 15px;">
                      <div className="card-body p-5">
                        <PageTitle></PageTitle>
                        <SearchField handleChange={this.handleIngredientQueryChange} handleSpeechInput={this.handleIngredientQuerySpeechInput} handleSubmit={this.searchIngredients} query={this.state.ingredientQuery} placeholder="Search Ingredients"/>
                        <br/>
                        {this.state.showSearchResultList &&
                          <IngredientList ingredients={this.state.searchResultListIngredients} handleSelect={this.handleIngredientSelection} actions={ingredientSearchListActions} emptyListMessage="No results"/>
                        }
                        <br/>
                        <h1 className="mt-5 font-weight-light text-center">Shopping List:</h1>
                        <IngredientList ingredients={this.state.shoppingListIngredients} handleSelect={this.handleShoppingListSelection} actions={myShoppingListActions} emptyListMessage="Your shopping list is currently empty"/>
                        <button onClick={this.shareShoppingList} style={{display: "inline", color: "blue"}} className="btn form-inline justify-content-center align-items-center"><i className="fas fa-share fa-2x"></i><h5 style={{display: "inline"}}> Share your shopping list</h5></button>
                        {this.state.showSocialMediaShare &&
                          <SocialMediaSharePopUp handleClose={this.handleSocialMediaSharePopUpClose} url={"https://stayingredients-recipe-app.vercel.app/shopping-list"} quote="My StayInGredients Shopping List" hashtag="#StayInGredients"/>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Expand>
    );
  }
}