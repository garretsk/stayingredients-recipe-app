import React, { Component } from "react";

export default class BackToTopButton extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisable: false};
  }

  componentDidMount() {
    let backToTop = this;
    document.addEventListener("scroll", function(e) {
      backToTop.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({isVisable: true});
    } else {
      this.setState({isVisable: false});
    }
  }

  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    return (
      <div className="back-to-top-button fixed-bottom" style={{width: '5%', whiteSpace: 'nowrap'}}>
        {this.state.isVisable && (
          <div onClick={() => this.goToTop()} style={{width: "wrap-content"}}>
            <button className="float-left py-1 px-3 ml-4 mb-3 border border-secondary rounded-lg bg-light text-muted">Back to top</button>
          </div>
        )}
      </div>
    );
  }
}