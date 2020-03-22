import React from "react";

import "./sign-in.styles.scss";
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = event => {
    event.preventDefault();

    const { name, value} = event.target;
    this.setState({ [name]: value});
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className='title'>I don't have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name="email" 
            label="Email"
            type="email" 
            value={this.state.email} 
            required 
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
