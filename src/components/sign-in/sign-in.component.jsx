import React, { useState } from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSignInStart(email, password);

    // try {

    //   //Sign in with firebase using email, password. Returns authenticated user.
    //   const { user } = await auth.signInWithEmailAndPassword(
    //     email,
    //     password
    //   );

    //   //Clear sign in form inputs
    //   this.setState({ email: "", password: "" });

    // } catch (error) {
    //   console.error("sign in error", error);
    // }
  };

  //Updates state with user input. Might be not the best solution for sign-in form
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={email}
          required
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={password}
          required
          handleChange={handleChange}
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          {/* isGoogleSignIn param for special styling of Google sign in button. */}
          {/* Might be not the best approach. */}
          {/* googleSignInStart is an action processed by sagas */}
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
