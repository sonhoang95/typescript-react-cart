import { ICartItem } from './interfaces';

interface ReducerState {
  cart: ICartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
}

type ReducerAction = {
  type: string;
  payload?: number | any;
  isLoading?: boolean;
};

const reducer = (state: ReducerState, action: ReducerAction) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  if (action.type === 'REMOVE_ITEM') {
    return {
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== action.payload),
    };
  }

  if (action.type === 'INCREMENT') {
    const tempCart = state.cart.map(cartItem => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === 'DECREMENT') {
    const tempCart = state.cart
      .map(cartItem => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter(cartItem => cartItem.amount > 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  if (action.type === 'LOADING') {
    return { ...state, isLoading: false };
  }

  if (action.type === 'DISPLAY_CART') {
    console.log(action.payload);
    return { ...state, cart: action.payload };
  }

  throw new Error('no matching action type');
};

export default reducer;
