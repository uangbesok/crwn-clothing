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