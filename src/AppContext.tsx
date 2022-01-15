import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';
import { ICartItem } from './interfaces';
import CartItem from './CartItem';
const url = 'https://course-api.com/react-useReducer-cart-project';

interface GlobalContext {
  cart: ICartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
  clearCart: () => void;
  removeCartItem: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = React.createContext({} as GlobalContext);

interface CartState {
  cart: ICartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
}

const initialState: CartState = {
  cart: [],
  isLoading: true,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeCartItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const increment = (id: number) => {
    dispatch({ type: 'INCREMENT', payload: id });
  };

  const decrement = (id: number) => {
    dispatch({ type: 'DECREMENT', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getProducts = async () => {
    dispatch({ type: 'LOADING' });
    const res = await fetch(url);
    const data = await res.json();
    dispatch({ type: 'DISPLAY_CART', payload: data });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCartItem,
        increment,
        decrement,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
