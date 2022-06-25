import React, { Component } from "react";
import PageTitle from "./PageTitle";
import IngredientList from "./IngredientList";
import jwt_decode from "jwt-decode";
import Expand from "react-expand-animated";
import useParams from "react-router-dom";

class ViewOnlyPantry extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;

    this.state = {
      currentUser: name,
      expand: false,
      myPantryListIngredients: [],
    };

    this.expand = this.expand.bind(this);
    this.handleMyPantrySelection = this.handleMyPantrySelection.bind(this);
    this.retrieveMyPantry = this.retrieveMyPantry.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  handleMyPantrySelection(id) {
    return;
  }

  retrieveMyPantry() {
    const token = localStorage.jwtToken;
    const decoded = jwt_decode(token);
    const name = decoded.uname;
    console.log("getting pantry");

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
    this.expand();
    this.retrieveMyPantry();
  }

  render() {
    let myPantryListActions = [];

    return (
      <Expand open={this.state.expand}>
        <div className="public-pantry">
          <div className="container">
            <div className="mask d-flex align-items-center h-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card" styles="border-radius: 15px;">
                      <div className="card-body p-5">
                        <PageTitle></PageTitle>
                        <h1 className="mt-5 font-weight-light text-center">User's Pantry:</h1>
                        <IngredientList ingredients={this.state.myPantryListIngredients} handleSelect={this.handleMyPantrySelection} actions={myPantryListActions} emptyListMessage={this.props.username + "'s pantry is currently empty"}/>
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

export default function PublicPantry() {
  const { id } = useParams();

  return(
    <ViewOnlyPantry username={id}/>
  );
}