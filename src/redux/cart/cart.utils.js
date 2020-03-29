export const addItemToCart = (cartItems, cartItemToAdd) => {
    let existingItem = false;
    const updatedCartItems = cartItems.map(item => {
        if(item.id === cartItemToAdd.id)
        {
            existingItem = true;
            return {...item, quantity: item.quantity+1};
        }
        return item;
    });
    if(existingItem)
        return updatedCartItems;
    return [...updatedCartItems, {...cartItemToAdd, quantity: 1}];    
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    return  cartItems.filter((item) => item.id !== cartItemToClear.id);    
}

export const removeItemFromCart = (cartItems, cartItemToRemove) =>
{
    const existingItem = cartItems.find((item) => item.id === cartItemToRemove.id);
    return existingItem.quantity === 1 ?
    cartItems.filter((item) => item.id !== cartItemToRemove.id) :
    cartItems.map(item => {
        if(item.id === cartItemToRemove.id)
            return {...item, quantity: item.quantity-1};
        return item;
    });
}