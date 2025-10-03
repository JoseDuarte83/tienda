import React from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";
import LoadingSpinner from "../Common/LoadingSpinner";

const ProductList = ({products, loading, title}) => {
    if (loading){
        return <LoadingSpinner/>
    }

    if (!products || products.length === 0){
        return (
            <Container>
                <Box textAlign='center' py={4}>
                    <Typography variant="h6" color="textSecondary">
                        No se encontraron productos
                    </Typography>
                </Box>
            </Container>
        );
    }
    return (
        <Container maxWidth='lg' sx={{py:4}}>
            {title && (
                <Typography variant="h4" component='h1' gutterBottom align="center">
                    {title}
                </Typography>
            )}
            <Grid container spacing={3}>
                {products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;