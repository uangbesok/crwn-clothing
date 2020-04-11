import React from "react";
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import Collection from '../../components/collection/collection.component'
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";
import WithSpinner from "../../components/with-spinner/with-spinner.component"

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  state = {
    isLoading: true,
  }

  componentDidMount()
  {
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMaps = convertCollectionSnapshotToMap(snapshot)
      this.props.updateCollections(collectionsMaps);
      this.setState({isLoading: false});
    });
  }

  componentWillUnmount()
  {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    return (<div className="shop-page">
      <Route exact path={`${match.path}`} render={props => (<CollectionOverviewWithSpinner isLoading={isLoading} {...props} />)} />
      <Route path={`${match.path}/:categoryId`} render={props => (<CollectionWithSpinner isLoading={isLoading} {...props} />)} />  
    </div>);
  }
}

const mapDispatchToProps = {
  updateCollections,
}

export default connect(null, mapDispatchToProps)(ShopPage);
