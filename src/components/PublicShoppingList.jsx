import React, { Component } from "react";
import PageTitle from "./PageTitle";
import IngredientList from "./IngredientList";
import jwt_decode from "jwt-decode";
import Expand from "react-expand-animated";
import { useParams } from "react-router-dom";

class ViewOnlyShoppingList extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    this.state = {
      currentUser: name,
      expand: false,
      shoppingListIngredients: []
    };

    this.expand = this.expand.bind(this);
    this.handleShoppingListSelection = this.handleShoppingListSelection.bind(this);
    this.retrieveShoppingList = this.retrieveShoppingList.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  handleShoppingListSelection(id) {
    return;
  }

  retrieveShoppingList() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;
    console.log("getting shopping list");

    fetch("https://stayingredients-backend.herokuapp.com/api/users/getShoppingList/" + this.props.username)
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

  componentDidMount() {
    this.expand();
    this.retrieveShoppingList();
  }

  render() {
    let myShoppingListActions = [];

    return (
      <Expand open={this.state.expand}>
        <div className="public-shopping-list">
          <div className="container">
            <div className="mask d-flex align-items-center h-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card" styles="border-radius: 15px;">
                      <div className="card-body p-5">
                        <PageTitle></PageTitle>
                        <h1 className="mt-5 font-weight-light text-center">{this.props.username + "'s Shopping List:"}</h1>
                        <IngredientList ingredients={this.state.shoppingListIngredients} handleSelect={this.handleShoppingListSelection} actions={myShoppingListActions} emptyListMessage="This pantry is currently empty"/>
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

export default function PublicShoppingList() {
  const { username } = useParams();

  console.log(id);

  return(
    <ViewOnlyShoppingList username={username}/>
  );
}