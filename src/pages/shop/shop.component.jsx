import React from "react";
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionOverviewWithSpinner from '../../components/collection-overview/collection-overview.container'
import CollectionWithSpinner from '../../components/collection/collection.container'
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';


class ShopPage extends React.Component {
  // unsubscribeFromSnapshot = null;

  // state = {
  //   isLoading: true,
  // }

  componentDidMount()
  {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  // componentWillUnmount()
  // {
  //   this.unsubscribeFromSnapshot();
  // }

  render() {
    const { match } = this.props;
    return (<div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverviewWithSpinner} />
      <Route path={`${match.path}/:categoryId`} component={CollectionWithSpinner} />  
    </div>);
  }
}

const mapDispatchToProps = {
  fetchCollectionsStartAsync,
}

export default connect(null, mapDispatchToProps)(ShopPage);
