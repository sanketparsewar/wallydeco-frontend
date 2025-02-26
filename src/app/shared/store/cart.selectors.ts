import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IcartItem, IcartState } from './cart.state';

export const selectCartState = createFeatureSelector<IcartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

// export const selectCartTotal = createSelector(
//   selectCartState,
//   (state) => state.total
// );

export const selectCartTotal = createSelector(selectCartState, (state) => {
  // Calculate the total using `dealPrice` if it exists, else use `price`
  return state.items.reduce((total: number, item: IcartItem) => {
    const priceToUse = item.price; // Use dealPrice if available
    return total + priceToUse * item.quantity; // Add to the total
  }, 0);
});
