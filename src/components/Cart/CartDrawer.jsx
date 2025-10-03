import React from "react";
import { Drawer, Box, Typography, Button, IconButton, Divider, List, ListItem } from "@mui/material";
import { Close, Add, Remove, Delete } from "@mui/icons-material";
import { useCart } from "../../Context/CartContext";
import CartItem from "./CartItem";

const CartDrawer = ()=>{
    const {state, dispatch} = useCart();

    const handleClose = ()=> {
        dispatch({ type: 'TOGGLE_CART'});
    };

    const handleUpdateQuantity = (productId, NewQuantity) =>{
        if (NewQuantity === 0){
            dispatch({type: 'REMOVE_FROM_CART', payload: productId});
        }else{
            dispatch({
                type: 'UPDATE_QUANTITY',
                payload: {id: productId, quantity: NewQuantity}
            });
        }
    };

    const handleRemoveItem = (productId)=>{
        dispatch({type: 'REMOVE_FROM_CART', payload: productId});
    };

    const handleClearCart = ()=>{
        dispatch:({type:'CLEAR_CART'});
    };

    return(
        <Drawer
        anchor="right"
        open={state.isOpen}
        onClose={handleClose}
        sx={{
            '& .MuiDrawer-paper':{
                width:{ xs:'100%', sm: 400}
            }
        }}
        >
            <Box sx={{ p:2, display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Typography variant="h6">Carrito de Compras</Typography>
                <IconButton onClick={handleClose}>
                    <Close/>
                </IconButton>
            </Box>

            <Divider/>

            <Box sx={{flexGrow:1, overflow:'auto'}}>
                {state.items.length === 0 ? (
                    <Box sx={{p:3, textAlign: 'center'}}>
                        <Typography variant="body1" color='textSecondary'>
                            Tu carrito está vacio
                        </Typography>
                    </Box>
                ):(
                    <List>
                        {state.items.map((item)=>(
                            <CartItem
                                key={item-id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </List>

                )}

            </Box>

            {state.items.length > 0 && (
                <>
                <Divider/>
                <Box sx={{p:2}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6" fontWeight='bold'>
                            ${state.total.toFixed(2)}
                        </Typography>
                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mb: 1}}
                    >
                        Proceder al pago
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={handleClearCart}
                    >
                        Vaciar el carrito
                    </Button>

                </Box>
                </>
            )}

        </Drawer>
    );
};

export default CartDrawer;