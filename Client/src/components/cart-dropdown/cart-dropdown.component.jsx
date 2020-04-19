import React from "react";

import './cart-dropdown.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from "../../redux/cart/cart.selectors"

import { withRouter } from 'react-router-dom';
import { toggleCartHidden } from "../../redux/cart/cart.actions";


const CartDropdown = ({cartItems, toggleCartHidden, history}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length ?
                cartItems.map(item => <CartItem key={item.id} item={item} />) :
                <span className='empty-message'>Your card is empty</span>
            }
        </div>
        <CustomButton onClick={
            ()=>{
                    toggleCartHidden();
                    history.push('/checkout');
                }
            }>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
})

const mapDispatchToProps = {
    toggleCartHidden
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));