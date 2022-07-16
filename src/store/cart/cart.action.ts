import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, TCartItem } from "./cart.types";

import {
  createAction,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  TCartItem[]
>;

const addCartItem = (
  cartItems: TCartItem[],
  productToAdd: CategoryItem
): TCartItem[] => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: TCartItem[],
  cartItemToRemove: CategoryItem
): TCartItem[] => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: TCartItem[], cartItemToClear: TCartItem) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = withMatcher((isOpen: boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)
);

// Helper Function
export const setCartItems = withMatcher((cartItems: TCartItem[]) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: TCartItem[],
  itemToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, itemToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: TCartItem[],
  cartItemToRemove: TCartItem
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: TCartItem[],
  cartItemToClear: TCartItem
) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return setCartItems(newCartItems);
};
