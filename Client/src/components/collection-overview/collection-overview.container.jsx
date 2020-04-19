
import CollectionOverview from './collection-overview.component'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'

import WithSpinner from "../with-spinner/with-spinner.component"

const mapStateToProps = createStructuredSelector({
    isLoaded: selectIsCollectionsLoaded,
  })
  
  export default compose(
    connect(mapStateToProps),
    WithSpinner
  )(CollectionOverview)