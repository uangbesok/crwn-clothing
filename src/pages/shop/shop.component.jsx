import React from "react";
import './shop.styles.scss';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import Collection from '../../components/collection/collection.component'
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.utils";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount()
  {
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
      const collectionsMaps = convertCollectionSnapshotToMap(snapshot)
      this.props.updateCollections(collectionsMaps);
    });
  }

  componentWillUnmount()
  {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { match } = this.props;
    return (<div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:categoryId`} component={Collection} />  
    </div>);
  }
}

const mapDispatchToProps = {
  updateCollections,
}

export default connect(null, mapDispatchToProps)(ShopPage);
