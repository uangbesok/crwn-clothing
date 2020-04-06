import React from "react";
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import Collection from '../../components/collection/collection.component'

class ShopPage extends React.Component {
  render() {
    const { match } = this.props;
    return (<div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:categoryId`} component={Collection} />  
    </div>);
  }
}



export default ShopPage;
