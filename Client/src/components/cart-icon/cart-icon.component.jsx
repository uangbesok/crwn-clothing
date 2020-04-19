import React from "react";

import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { createStructuredSelector } from 'reselect';
import { selectTotalItemCount } from "../../redux/cart/cart.selectors"

const CartIcon = ({ toggleCartHidden, totalItemCount }) => (
    <div className='cart-icon' onClick={ toggleCartHidden }>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{totalItemCount}</span>
    </div>
);

const mapDispatchToProps = {
    toggleCartHidden
  };

//To reconsider whether it's better to recalculate new total quantity in the moment
// when new item added to cart
const mapStateToProps = createStructuredSelector({
    totalItemCount: selectTotalItemCount,
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);