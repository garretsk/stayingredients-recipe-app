import React, { Component } from "react";
import PageTitle from "./PageTitle";
import IngredientList from "./IngredientList";
import { useParams } from "react-router-dom";

class ViewOnlyPantry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myPantryListIngredients: [],
    };

    this.handleMyPantrySelection = this.handleMyPantrySelection.bind(this);
    this.retrieveMyPantry = this.retrieveMyPantry.bind(this);
  }

  handleMyPantrySelection(id) {
    return;
  }

  retrieveMyPantry() {
    fetch("https://stayingredients-backend.herokuapp.com/api/users/getPantry/" + this.props.username)
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

  componentDidMount() {
    this.retrieveMyPantry();
  }

  render() {
    let myPantryListActions = [];

    return (
      <div className="public-pantry">
        <div className="container">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="card" styles="border-radius: 15px;">
                    <div className="card-body p-5">
                      <PageTitle></PageTitle>
                      <h1 className="mt-5 font-weight-light text-center">{this.props.username + "'s Pantry:"}</h1>
                      <IngredientList ingredients={this.state.myPantryListIngredients} handleSelect={this.handleMyPantrySelection} actions={myPantryListActions} emptyListMessage="This pantry is currently empty"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function PublicPantry() {
  const { username } = useParams();

  return(
    <ViewOnlyPantry username={username}/>
  );
}