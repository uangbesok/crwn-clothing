import React from "react";

import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  //async method because contains firebase API calls
  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      //Create user in authentication of firebase and sign user in automatically
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      //Create user in firestore
      await createUserProfileDocument(user, { displayName });

      //Clear form inputs
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("sign up error", error);
    }
  };

  handleChange = event => {
    event.preventDefault();

    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I already have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            label="Display name"
            type="text"
            value={displayName}
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            value={email}
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            value={password}
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            required
            handleChange={this.handleChange}
          />
          <div className="buttons">
            <CustomButton type="submit">Sign up</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
