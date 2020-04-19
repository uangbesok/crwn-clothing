import React, { useEffect } from "react";
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionOverviewWithSpinner from '../../components/collection-overview/collection-overview.container'
import CollectionWithSpinner from '../../components/collection/collection.container'
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


const ShopPage = ({fetchCollectionsStart, match}) => {
  // unsubscribeFromSnapshot = null;

  // state = {
  //   isLoading: true,
  // }

  useEffect(() => 
  {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);


  // componentWillUnmount()
  // {
  //   this.unsubscribeFromSnapshot();
  // }


    return (<div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverviewWithSpinner} />
      <Route path={`${match.path}/:categoryId`} component={CollectionWithSpinner} />  
    </div>);
 
}

const mapDispatchToProps = {
  fetchCollectionsStart,
}

export default connect(null, mapDispatchToProps)(ShopPage);
