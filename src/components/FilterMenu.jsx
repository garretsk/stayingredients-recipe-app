import React, { Component } from "react";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

function getFilterOptions(filterType) {
  switch(filterType) {
    case 'cuisines':
      return cuisines;
    case 'mealTypes':
      return mealTypes;
    case 'intolerances':
      return intolerances;
    case 'diet':
      return diet;
    default:
      return cuisines;
  }

}

export const mealTypes = [
  { value: "main course", label: "Main Course" },
  { value: "side dish", label: "Side Dish" },
  { value: "dessert", label: "Dessert" },
  { value: "ppetizer", label: "Appetizer" },
  { value: "salad", label: "Salad" },
  { value: "bread", label: "Bread" },
  { value: "breakfast", label: "Breakfast" },
  { value: "soup", label: "Soup" },
  { value: "beverage", label: "Beverage" },
  { value: "sauce", label: "Sauce" },
  { value: "marinade", label: "Marinade" },
  { value: "fingerfood", label: "Fingerfood" },
  { value: "drink", label: "Drink" }
];

export const cuisines = [
  { value: "African", label: "African" },
  { value: "American", label: "American" },
  { value: "British", label: "British" },
  { value: "Cajun", label: "Cajun" },
  { value: "Caribbean", label: "Caribbean" },
  { value: "Chinese", label: "Chinese" },
  { value: "Eastern European", label: "Eastern" },
  { value: "European", label: "European" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Greek", label: "Greek" },
  { value: "Indian", label: "Indian" },
  { value: "Irish", label: "Irish" },
  { value: "Italian", label: "Italian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Jewish", label: "Jewish" },
  { value: "Korean", label: "Korean" },
  { value: "Latin American", label: "Latin American" },
  { value: "Mediterranean", label: "Mediterranean" },
  { value: "Mexican", label: "Mexican" },
  { value: "Middle Eastern", label: "Middle Eastern" },
  { value: "Nordic", label: "Nordic" },
  { value: "Southern", label: "Southern" },
  { value: "Spanish", label: "Spanish" },
  { value: "Thai", label: "Thai" },
  { value: "Vietnamese", label: "Vietnamese" }
];

export const intolerances = [
  { value: "Dairy", label: "Dairy" },
  { value: "Egg", label: "Egg" },
  { value: "Gluten", label: "Gluten" },
  { value: "Grain", label: "Grain" },
  { value: "Peanut", label: "Peanut" },
  { value: "Seafood", label: "Seafood" },
  { value: "Sesame", label: "Sesame" },
  { value: "Shellfish", label: "Shellfish" },
  { value: "Soy", label: "Soy" },
  { value: "Sufite", label: "Sufite" },
  { value: "Tree Nut", label: "Tree Nut" },
  { value: "Wheat", label: "Wheat" }

];

export const diet = [
  { value: "Gluten Free", label: "Gluten Free" },
  { value: "Ketogenic", label: "Ketogenic" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Lacto-Vegetarian", label: "Lacto-Vegetarian" },
  { value: "Ovo-Vegetarian", label: "Ovo-Vegetarian" },
  { value: "Vegan", label: "Vegan" },
  { value: "Pescatarian", label: "Pescatarian" },
  { value: "Paleo", label: "Paleo" },
  { value: "Primal", label: "Primal" },
  { value: "Low FODMAP", label: "Low FODMAP" },
  { value: "Whole30", label: "Whole30" }
];



export default class FilterMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: [],
      filterOptions: getFilterOptions(props.filterType),
      title: props.title,
      callback: props.callback,
      query: ""
    };
  }

   getSelectedOptions = () => {
    return this.state.selectedOptions;
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
    this.state.query = "";
    selectedOptions.map((option) => {
      this.state.query += option.value + ","
    })

    this.state.callback(this.state.query);
  };

  render() {

    return (
      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select filters"
      >
        {this.state.title}
        <ReactSelect
          options={this.state.filterOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}