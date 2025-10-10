import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Box, Rating, Chip, Divider, Alert } from "@mui/material";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { useCart } from "../Context/CartContext";
import { api } from "../Services/api";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { type } from "@testing-library/user-event/dist/type";

const ProductDetail =()=>{
    const {id} = useParams();
    const {dispatch} = useCart();
    const [product,setProduct] = useState(null);
    const [loading,setLoading]= useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const loadProduct = async ()=>{
            try{
                setLoading(true);
                const productData = await api.getProduct(id);
                setProduct(productData);
            }catch (err){
                setError('Producto no encontrado');
            }finally{
                setLoading(false);
            }
        };
        loadProduct()
    },[id]);

    const handleAddToCart = ()=>{
        dispatch({
            type: 'ADD_TO_CART',
            payload: 'product'
        });
    };
    if (loading) return <LoadingSpinner/>
    if (error) return <Alert severity="error">{error}</Alert>
    if (!product) return null;

    return(
        <Container maxWidth='lg' sx={{py:4}}>
            <Button startIcon={<ArrowBack/>} href="/" sx={{mb:2}}>Volver al inicio</Button>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box 
                        component='img'
                        src={product.image}
                        alt={product.title}
                        sx={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'contain',
                            p: 2,
                            border: '1px solid',
                            borderColor: 'grey 200',
                            borderRadius: 2
                        }}
                    />
                   
                </Grid>
                <Grid item xs={12} md={6}>
                    <Chip label={product.category} color="primary" sx={{textTransform: 'capitalize', mb:2}}/>
                    <Typography variant="h4" component='h1' gutterBottom>{product.title}</Typography>
                    <Box sx={{display:'flex', alignItems: 'center', mb:2}}>
                        <Rating value={product.rating?.rate || 0} readOnly/>
                        <Typography variant="body2" color="text.secondary" sx={{ml:1}}>
                            ({product.rating?.count || 0} reseñas)
                        </Typography>
                    </Box>
                    <Typography variant="h3" color="primary" fontWeight='bold' gutterBottom>
                        ${product.price}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{mb:3}}>
                        {product.description}
                    </Typography>
                    <Button variant="contained" size="large" startIcon={<AddShoppingCart/>} onclick={handleAddToCart} sx={{py:1.5, px:4}}>
                        Agregar al carrito
                    </Button>
                    <Divider sx={{my:3}}/>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Detalles del producto
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Categoria: {product.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Calificación: {product.rating?.rate}/5 ({product.rating?.count} reseñas)
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );

};

export default ProductDetail;