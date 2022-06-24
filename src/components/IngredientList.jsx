import React, { Component } from "react";
import Ingredient from "./Ingredient";

export default class IngredientList extends Component {

  render() {
    let ingredientList = [];
    let atLeastOneIngredientSelected = false;
    for(let i = 0; i < this.props.ingredients.length; ++i) {
      ingredientList.push(<Ingredient
        key={this.props.ingredients[i].id.toString()}
        id={this.props.ingredients[i].id}
        image={this.props.ingredients[i].image}
        name={this.props.ingredients[i].name}
        isSelected={this.props.ingredients[i].isSelected}
        handleSelect={this.props.handleSelect}
      />);
      if(!atLeastOneIngredientSelected && this.props.ingredients[i].isSelected) {
        atLeastOneIngredientSelected = true;
      }
    }

    let buttonList;
    if(atLeastOneIngredientSelected) {
      buttonList = this.props.actions.map((action) =>
        <button key={action.id.toString()} className="btn btn-outline mx-2 mb-1" onClick={action.action}>{action.label}</button>
      );
    }
    else {
      buttonList = this.props.actions.map((action) =>
        <div key={action.id.toString()} className="sig-disabled-btn btn btn-primary mx-2 mb-1">{action.label}</div>
      );
    }

    return(
      <div className="text-center my-2">
        <div className="form-inline justify-content-center mb-2">
          {0 === ingredientList.length &&
            <h5>{this.props.emptyListMessage}</h5>
          }
          {ingredientList}
        </div>
        {0 < ingredientList.length &&
          buttonList
        }
      </div>
    );
  }
}