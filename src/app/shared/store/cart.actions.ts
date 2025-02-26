
import { createAction, props } from '@ngrx/store';
import { IcartItem } from './cart.state';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: IcartItem }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ itemId: string }>()
);

export const updateItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: string; quantity: number }>()
);


export const clearCart = createAction('[Cart] Clear Cart');
