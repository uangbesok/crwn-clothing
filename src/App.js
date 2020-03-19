import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInSignOutPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInSignOutPage} />
        </div>
      </Switch>
    </>
  );
}

export default App;
