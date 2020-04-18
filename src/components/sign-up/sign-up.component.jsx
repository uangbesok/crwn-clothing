import React, { useState } from "react";

import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";

const SignUp = ({ signUpStart }) => {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userDetails;

  //async method because contains firebase API calls
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      signUpStart(email, password, displayName);

      //Clear form inputs
      // this.setState({
      //   displayName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: ""
      // });
    } catch (error) {
      console.error("sign up error", error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          label="Display name"
          type="text"
          value={displayName}
          required
          handleChange={handleChange}
        />
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
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          required
          handleChange={handleChange}
        />
        <div className="buttons">
          <CustomButton type="submit">Sign up</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName })),
});

export default connect(null, mapDispatchToProps)(SignUp);
