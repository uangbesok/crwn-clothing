import React from "react";

import "./sign-in.styles.scss";
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {

      //Sign in with firebase using email, password. Returns authenticated user.
      const { user } = await auth.signInWithEmailAndPassword(
        email,
        password
      );

      //Clear sign in form inputs
      this.setState({ email: "", password: "" });

    } catch (error) {
      console.error("sign in error", error);
    }
  };

  //Updates state with user input. Might be not the best solution for sign-in form
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
            {/* isGoogleSignIn param for special styling of Google sign in button. */}
            {/* Might be not the best approach. */}
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
