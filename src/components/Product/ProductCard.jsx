import React from "react";
import { Card, CardMedia, CardContent,CardActions,Typography,Box, Rating } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useCart } from "../../Context/CartContext";

const ProductCard = ({product})=>{
    const {dispatch} = useCart();

    const handleAddCart = ()=>{
        dispatch({
            type: 'ADD_TO_CART',
            payload: product
        });
    };
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&;hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                }
            }}
        >
            <CardMedia
                component='img'
                height='200'
                image={product.image}
                alt={product.title}
                sx={{objectFit: 'contain', p:1}}
            />
            <CardContent sx={{flexGrow:1}}>
                <Typography
                    gutterBottom
                    variant="h6"
                    component='h2'
                    sx={{
                        fontSize: '0.9rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow:'hidden'
                    }}
                >
                    {product.title}
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                    <Rating value={product.rating?.rate || 0} readOnly size="small"/>
                    <Typography variant="body2" color="text.secondary" sx={{ml:1}}>({product.rating?.count || 0})</Typography>
                </Box>
                <Typography variant="h6" color="primary" fontWeight='bold'>${product.price}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{textTransform: 'capitalize', fontStyle: 'italic'}}>{product.category}</Typography>

            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddShoppingCart/>}
                    onClick={handleAddCart}
                    size="small"
                >
                    Agregar al Carrito</Button>
            </CardActions>
            
        </Card>
    );
};

export default ProductCard