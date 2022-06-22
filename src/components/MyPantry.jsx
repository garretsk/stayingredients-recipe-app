import React, { Component } from "react";
import PageTitle from "./PageTitle";
import SearchField from "./SearchField";
import IngredientList from "./IngredientList";
import SocialMediaSharePopUp from "./SocialMediaSharePopUp";
import validateSearchInput from "../utils/validateSearchInput";
import jwt_decode from "jwt-decode";
import Expand from "react-expand-animated";

export default class MyPantry extends Component {
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
      myPantryListIngredients: [],
    };

    this.expand = this.expand.bind(this);
    this.handleIngredientQueryChange = this.handleIngredientQueryChange.bind(this);
    this.handleIngredientQuerySpeechInput = this.handleIngredientQuerySpeechInput.bind(this);
    this.searchIngredients = this.searchIngredients.bind(this);
    this.handleIngredientSelection = this.handleIngredientSelection.bind(this);
    this.addToPantry = this.addToPantry.bind(this);
    this.handleMyPantrySelection = this.handleMyPantrySelection.bind(this);
    this.retrieveMyPantry = this.retrieveMyPantry.bind(this);
    this.markDepleted = this.markDepleted.bind(this);
    this.removeFromPantry = this.removeFromPantry.bind(this);
    this.shareMyPantry = this.shareMyPantry.bind(this);
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

  addToPantry() {
    let path = "https://stayingredients-backend.herokuapp.com/api/users/addPantry";
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
            console.log("Added to pantry");
          } else {
            console.log("Couldn't add to pantry");
          }

          this.retrieveMyPantry();
        })
    });
  }

  handleMyPantrySelection(id) {
    let tempMyPantryListIngredients = this.state.myPantryListIngredients;

    if(tempMyPantryListIngredients[id].isSelected) {
      tempMyPantryListIngredients[id].isSelected = false;
    }
    else {
      tempMyPantryListIngredients[id].isSelected = true;
    }
    
    this.setState({
      myPantryListIngredients: tempMyPantryListIngredients
    });
  }

  retrieveMyPantry() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;
    console.log("getting pantry");

    fetch("https://stayingredients-backend.herokuapp.com/api/users/getPantry/" + name)
      .then(response => response.json())
      .then((res) => {
        console.log("PANTRY: " + res.userPantry);
        
        let tempMyPantryListIngredients = [];
        for (let i = 0; i < res.userPantry.length; ++i) {
          tempMyPantryListIngredients.push({
            id: i,
            name: res.userPantry[i].name,
            image: res.userPantry[i].image,
            isSelected: false
          });
        }
        this.setState({myPantryListIngredients: tempMyPantryListIngredients})
      })
      .catch(error => {
        window.alert(error);
        return;
      });
  }

  markDepleted() {
    let addSLPath = "https://stayingredients-backend.herokuapp.com/api/users/addShoppingList";
    let removeMPPath = "https://stayingredients-backend.herokuapp.com/api/users/removePantry";
    let tempSelectedIngredients = [];
    for(let i = 0; i < this.state.myPantryListIngredients.length; ++i) {
      if(this.state.myPantryListIngredients[i].isSelected) {
        tempSelectedIngredients.push({
          name: this.state.myPantryListIngredients[i].name,
          image: this.state.myPantryListIngredients[i].image
        });
      }
    }

    this.setState({selectedIngredients: tempSelectedIngredients}, () => {
      fetch(addSLPath, {
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
            console.log("Added to shopping list");
          } else if (resData.status === "fail") {
            console.log("Couldn't add to shopping list");
          }
        })
        .then(
          fetch(removeMPPath, {
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
                console.log("Removed from pantry");
              } else {
                console.log("Couldn't remove from pantry");
              }

              this.retrieveMyPantry();
            })
        );
    });
  }

  removeFromPantry() {
    let removeMPPath = "https://stayingredients-backend.herokuapp.com/api/users/removePantry";
    let tempSelectedIngredients = [];
    for(let i = 0; i < this.state.myPantryListIngredients.length; ++i) {
      if(this.state.myPantryListIngredients[i].isSelected) {
        tempSelectedIngredients.push({
          name: this.state.myPantryListIngredients[i].name,
          image: this.state.myPantryListIngredients[i].image
        });
      }
    }

    this.setState({selectedIngredients: tempSelectedIngredients}, () => {
        fetch(removeMPPath, {
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
              console.log("Removed from pantry");
            } else {
              console.log("Couldn't remove from pantry");
            }

            this.retrieveMyPantry();
          })
    });
  }

  shareMyPantry() {
    this.setState({showSocialMediaShare: true});
  }

  handleSocialMediaSharePopUpClose() {
    this.setState({showSocialMediaShare: false});
  }

  componentDidMount() {
    this.expand();
    this.retrieveMyPantry();
  }

  render() {
    console.log("RENDERING");
    console.log(this.state.myPantryListIngredients);
    let ingredientSearchListActions = [];
    ingredientSearchListActions.push({id: 0, action: this.addToPantry, label: "Add to Pantry"});

    let myPantryListActions = [];
    myPantryListActions.push({id: 0, action: this.markDepleted, label: "Mark as Depleted"});
    myPantryListActions.push({id: 1, action: this.removeFromPantry, label: "Remove from Pantry"});

    return (
      <Expand open={this.state.expand}>
        <div className="my-pantry">
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
                        <h1 className="mt-5 font-weight-light text-center">My Pantry:</h1>
                        <IngredientList ingredients={this.state.myPantryListIngredients} handleSelect={this.handleMyPantrySelection} actions={myPantryListActions} emptyListMessage="Your pantry is currently empty"/>
                        <button onClick={this.shareMyPantry} style={{display: "inline", color: "blue"}} className="btn form-inline justify-content-center align-items-center"><i className="fas fa-share fa-2x"></i><h5 style={{display: "inline"}}> Share your pantry</h5></button>
                        {this.state.showSocialMediaShare &&
                          <SocialMediaSharePopUp handleClose={this.handleSocialMediaSharePopUpClose} url="https://www.pacificu.edu/about/directory/people/shereen-khoja-phd" quote="WE NEED A DOMAIN NAME" hashtag="#SpendMoreMoney"/>
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