import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selector'
import { createStructuredSelector } from 'reselect';
import Collection from './collection.component'

import WithSpinner from "../with-spinner/with-spinner.component"

const mapStateToProps = createStructuredSelector ({
    isLoaded: selectIsCollectionsLoaded,
})

export default compose(
    connect(mapStateToProps),
    WithSpinner
    )(Collection);