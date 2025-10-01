import React { createContext, useContext, useReducer } from "react";

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
        case
    }
}