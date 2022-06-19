import React, { Component } from "react";
import PageTitle from "./PageTitle";
import SavedRecipeList from "./SavedRecipeList";
import Expand from "react-expand-animated";

class SavedRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false
    };

    this.expand = this.expand.bind(this);
  }

  expand() {
    this.setState({expand: true});
  }

  componentDidMount() {
    this.expand();
  }

  render() {
    return (
      <Expand open={this.state.expand}>
        <div className="saved-recipes">
          <div className="container">
            <div className="mask d-flex align-items-center h-100">
              <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                    <div className="card" styles="border-radius: 15px;">
                      <div className="card-body p-5">
                        <PageTitle>Saved Recipes</PageTitle>
                        <SavedRecipeList/>
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
  };
}

export default SavedRecipes;