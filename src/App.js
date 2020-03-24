import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { setCurrentUserAction } from './redux/user/user.actions'

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignOutPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount()
  {
    const { setCurrentUserAction } = this.props;

    auth.onAuthStateChanged(async userAuth => 
      {
        if(userAuth)
        {
          //Create user in firestore users collection and return user reference
          const userRef = await createUserProfileDocument(userAuth);

          //Update state when user document changes
          userRef.onSnapshot(snapShot => {
            setCurrentUserAction({
                id: snapShot.id,
                ...snapShot.data(),  
            });
          })
        }
        else setCurrentUserAction(userAuth);
      });
      
    }

  componentWillUnmount()
  {
    //Stop listening to auth events. Needed to avoid memory leaks.
    this.unsubscribeFromAuth();
  }

  render()
  {
    console.log('state render ' , this.state);
    return (
      <>
        <Header />
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/signin" component={SignInSignOutPage} />
        </Switch>
      </>
    );
  }
  
}

const mapDispatchToProps = dispatch => (
  {
    setCurrentUserAction: user => dispatch(setCurrentUserAction(user))
  }
);

export default connect(null, mapDispatchToProps)(App);
