import React, { Component } from "react";
import FormTitle from "./FormTitle";
import MessagePopUp from "./MessagePopUp";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      message: "",
      contactFormSentPopUpVisable: false,
      contactFormSentPopUpAlert: ""
    }

    this.handleFNameChange = this.handleFNameChange.bind(this);
    this.handleLNameChange = this.handleLNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.showContactFormPopUp = this.showContactFormPopUp.bind(this);
    this.removeContactFormPopUp = this.removeContactFormPopUp.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  handleFNameChange(event) {
    this.setState({fname: event.target.value});
  }

  handleLNameChange(event) {
    this.setState({lname: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  showContactFormPopUp(alert) {
    this.setState({contactFormSentPopUpVisable: true});
    this.setState({contactFormSentPopUpAlert: alert});
  }

  removeContactFormPopUp() {
    this.setState({contactFormSentPopUpVisable: false});
  }

  submitEmail = async (e) => {
    e.preventDefault();
    let port = process.env.PORT || 5000;
    let path = "http://localhost:" + port.toString() + "/contact";
    await fetch(path, {
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
          this.showContactFormPopUp("Message sent. We will get back to you eventually.");
        } else if (resData.status === "fail") {
          this.showContactFormPopUp("Message failed to send");
        }
      })
      .then(() => {
        this.setState({
          fname: "",
          lname: "",
          email: "",
          message: "",
        });
      });
  };

  render() {
    return (
      <div className="contact">
        <div className="container">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" styles="border-radius: 15px;">
                    <div className="card-body p-5 gradient-custom-3">
                      <FormTitle>Contact</FormTitle>
                      <form onSubmit={this.submitEmail}>
  
                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg" placeholder="First Name" name="fname" value={this.state.fname} onChange={this.handleFNameChange} required/>
                        </div>
  
                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg" placeholder="Last Name" name="lname" value={this.state.lname} onChange={this.handleLNameChange}/>
                        </div>
  
                        <div className="form-outline mb-4">
                          <input type="text" className="form-control form-control-lg" placeholder="Email" name="email" value={this.state.email} onChange={this.handleEmailChange} required/>
                        </div>
  
                        <div className="form-outline mb-4">
                          <textarea type="text" rows="10" className="form-control form-control-lg" placeholder="Enter your message" name="message" value={this.state.message} onChange={this.handleMessageChange} required/>
                        </div>
                        
                        <div className="d-flex justify-content-center">
                          <button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Submit</button>
                        </div>
  
                      </form>
                      {this.state.contactFormSentPopUpVisable &&
                        <MessagePopUp alert={this.state.contactFormSentPopUpAlert} handleClose={this.removeContactFormPopUp}/>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Contact;