import React from "react";
import './collection.styles.scss';

import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector'
import { createStructuredSelector } from 'reselect';

import CollectionItem from '../collection-item/collection-item.component'

const Collection = ({ collection }) => {
    const { title, items } = collection;
    return (<div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => 
                    <CollectionItem key={item.id} item={item} />)
            }

        </div>
    </div>
)}

const mapStateToProps = createStructuredSelector ({
    collection: (state, props) => selectCollection(props.match.params.categoryId)(state),
})

export default connect(mapStateToProps)(Collection);