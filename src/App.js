import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignOutPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth } from './firebase/firebase.utils'


class App extends React.Component {

  constructor()
  {
    super();

    this.state = {
      currentUser : null,
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount()
  {
    auth.onAuthStateChanged(user => 
      {
          this.setState({currentUser: user})
      });
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render()
  {
    return (
      <>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route exact path="/signin" component={SignInSignOutPage} />
        </Switch>
      </>
    );
  }
  
}

export default App;
