import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { setCurrentUser } from "./redux/user/user.actions";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkoutpage/checkoutpage.component"
import SignInSignOutPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'
// import { selectCollectionsForPreview } from "./redux/shop/shop.selector";
import { checkUserSession } from "./redux/user/user.actions";
import { GlobalStyle } from "./global.styles";

import HomePage from './pages/homepage/homepage.component'
// const HomePage = lazy(() => import('./pages/homepage/homepage.component'));

const App = ({ currentUser, checkUserSession}) => {
  // unsubscribeFromAuth = null;
  console.log(__dirname);

  useEffect(() => 
  {
    checkUserSession();
  }, [checkUserSession]);


    // Auth flow without redux saga
    // const { 
    //   setCurrentUser, 
    //   // collectionsArray 
    // } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     //Create user in firestore users collection and return user reference
    //     const userRef = await createUserProfileDocument(userAuth);

    //     //Update state when user document changes
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   } 
    //   else setCurrentUser(userAuth);
    // });

    // addCollectionAndDocuments(
    //   'collections', 
    //   collectionsArray.map(({title, items}) => ({title, items}))
    //   );


  // componentWillUnmount() {
  //   //Stop listening to auth events. Needed to avoid memory leaks.
  //   this.unsubscribeFromAuth();
  // }

    return (
      <>
        <GlobalStyle />
        <Header />
        {/* <Suspense fallback={<div>...LOADING</div>} >  */}
          <Switch>
            
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route exact 
                  path="/signin"
                  render={() => currentUser ?
                                <Redirect to="/" /> :
                                <SignInSignOutPage />
                                } />
          </Switch>
        {/* </Suspense> */}
      </>
    );
  }


// Short form of mapDispatchToProps.
const mapDispatchToProps = {
  checkUserSession
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
