import React, {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Breadcrumbs, Link } from "@mui/material";
import { api } from "../Services/api";
import ProductList from "../components/Product/ProductList";


const CategoryPage = ()=>{
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const loadProducts = async ()=>{
            try{
                setLoading(true);
                const productsData = await api.getProductsByCategory(category);
                setProducts(productsData);
            }catch (error){
                console.error('Error loading products', error);
            }finally{
                setLoading(false);
            }
        };

        loadProducts();
    },[category]);

    return (
        <Container maxWidth='lg' sx={{py:4}}>
            <Breadcrumbs sx={{mb:3}}>
                <Link color="inherit" href='/'>Inicio</Link>
                <Typography color="text.primary" textTransform='capitalize'>{category}</Typography>
            </Breadcrumbs>
            <ProductList
                products={products}
                loading={loading}
                title={category ? `Categoría : ${category}` : 'Todos los productos'}           
            
            />
        </Container>
    );
};

export default CategoryPage;