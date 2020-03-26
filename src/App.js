import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUserAction } from "./redux/user/user.actions";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignOutPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUserAction } = this.props;

    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        //Create user in firestore users collection and return user reference
        const userRef = await createUserProfileDocument(userAuth);

        //Update state when user document changes
        userRef.onSnapshot(snapShot => {
          setCurrentUserAction({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else setCurrentUserAction(userAuth);
    });
  }

  componentWillUnmount() {
    //Stop listening to auth events. Needed to avoid memory leaks.
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact 
                 path="/signin"
                 render={() => this.props.currentUser ?
                               <Redirect to="/" /> :
                               <SignInSignOutPage />
                               } />
        </Switch>
      </>
    );
  }
}

// const mapDispatchToProps = dispatch => (
//   {
//     setCurrentUserAction: user => dispatch(setCurrentUserAction(user))
//   }
// );

// Short form of mapDispatchToProps. To check if it works.
const mapDispatchToProps = {
  setCurrentUserAction
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
