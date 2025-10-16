import React, { createContext, useContext, useReducer} from "react";

//crear context

const CartContext = createContext();

//estado inicial del carrito

const initialState = {
    items: [],
    total: 0,
    isOpen: false
};

//Reducer para manejar las acciones del carrito

const cartReducer = (state, action)=>{
    switch (action.type){
        case 'ADD_TO_CART':
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if(existingItem){
                const updatedItems = state.items.map(item => 
                    item.id === action.payload.id 
                    ? {...item, quantity: item.quantity +1 } 
                    : item
                );
            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
             };
            }
            const newItems = [...state.items, {...action.payload, quantity: 1}];
            return {
                ...state,
                items: newItems,
                total: calculateTotal(newItems),
            };
        case 'REMOVE_FROM_CART':
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: filteredItems, 
                total: calculateTotal(filteredItems),
            };
        case 'UPDATE_QUANTITY':
            const updatedItems = state.items.map(item =>
            item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0);
        return {
            ...state,
            items: updatedItems,
            total: calculateTotal(updatedItems)
        };
        case 'TOGGLE_CART':
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case 'CLEAR_CART':
            return initialState;
        default: 
            return state;
    }
};

const calculateTotal = (items)=>{
    return items.reduce((total,item)=> total + (item.price * item.quantity),0);
};

// provider de context

export const CartProvider = ({children})=>{
    const [ state, dispatch ] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
    );
};
// crear un hook personalizado

export const useCart = ()=>{
    const context = useContext(CartContext)
    if (!context){
        throw new Error('useCart debe de ser usado dentro de CartProvider');
    }
    return context;
};