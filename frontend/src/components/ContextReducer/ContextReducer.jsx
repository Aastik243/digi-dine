import React, { useReducer, useContext, createContext } from 'react';
import { useState } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const UserContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name,  size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let empArray = []
            return empArray;
       
            
        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);
  
    const login = (email) => {
      setUserEmail(email);
    };
  
    const logout = () => {
      setUserEmail(null);
    };
  
    return (
      <UserContext.Provider value={{ userEmail, login, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

export const useUser = () => useContext(UserContext);
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);