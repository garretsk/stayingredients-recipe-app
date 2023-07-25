import React, { Component } from "react";
import PageTitle from "./PageTitle";
import IngredientList from "./IngredientList";
import { useParams } from "react-router-dom";

class ViewOnlyShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingListIngredients: []
    };

    this.handleShoppingListSelection = this.handleShoppingListSelection.bind(this);
    this.retrieveShoppingList = this.retrieveShoppingList.bind(this);
  }

  handleShoppingListSelection(id) {
    return;
  }

  retrieveShoppingList() {
    fetch("http://stayingredients-backend-env.eba-feujhudp.us-east-2.elasticbeanstalk.com/api/users/getShoppingList/" + this.props.username)
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
    this.retrieveShoppingList();
  }

  render() {
    let myShoppingListActions = [];

    return (
      <div className="public-shopping-list">
        <div className="container">
          <div className="card" styles="border-radius: 15px;">
            <div className="card-body p-5">
              <PageTitle></PageTitle>
              <h1 className="mt-5 font-weight-light text-center">{this.props.username + "'s Shopping List:"}</h1>
              <IngredientList ingredients={this.state.shoppingListIngredients} handleSelect={this.handleShoppingListSelection} actions={myShoppingListActions} emptyListMessage="This pantry is currently empty"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function PublicShoppingList() {
  const { username } = useParams();

  return(
    <ViewOnlyShoppingList username={username}/>
  );
}
