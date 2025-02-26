// Here, we handle the state changes based on the actions we defined earlier. Each case updates the cart items and calculates the total.
import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem, updateItemQuantity, clearCart} from './cart.actions';
import { IcartState, initialCartState } from './cart.state';

export const cartReducer = createReducer(
  initialCartState,
  on(addItem, (state, { item }) => {
    const existingItem = state.items.find(i => i.id === item.id);
    let updatedItems = [...state.items];
    
    if (existingItem) {
      updatedItems = updatedItems.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updatedItems.push(item);
    }
    
    const updatedTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    return { ...state, items: updatedItems, total: updatedTotal };
  }),

  on(removeItem, (state, { itemId }) => {
    const updatedItems = state.items.filter(item => item.id !== itemId);
    const updatedTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    return { ...state, items: updatedItems, total: updatedTotal };
  }),

  on(updateItemQuantity, (state, { itemId, quantity }) => {
    const updatedItems = state.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    const updatedTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return { ...state, items: updatedItems, total: updatedTotal };
  }),

  on(clearCart, (state) => ({
    ...state,
    items: [],
    total: 0
  })),
  
 
);
