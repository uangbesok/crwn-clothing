import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignOutPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'


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
    auth.onAuthStateChanged(async userAuth => 
      {
        if(userAuth)
        {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),  
              }
            }, ()=>console.log('state onSnapshot ', this.state));
          })
        }
        else this.setState({currentUser : userAuth});
      });
      
    }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render()
  {
    console.log('state render ' , this.state);
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
