import React, {useState, useEffect} from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { api } from "../Services/api";
import ProductList from "../components/Product/ProductList";
import LoadingSpinner from "../components/Common/LoadingSpinner";

const Home =  ()=>{
    const [featuredProducts, setFeaturedProducts]= useState([]);
    const [loading, setLoading]=  useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const loadFeaturedProducts = async ()=>{
            try{
                setLoading(true);
                const products = await api.getLimitedProducts(8);
                setFeaturedProducts(products)
            }catch(err){
                setError('Error al cargar los productos');
                console.error('Error: ', err);                
            }finally{
                setLoading(false);
            }
        };
        loadFeaturedProducts();
    },[]);

    if (error){
        return(
            <Container>
                <Box textAlign='center' py={4}>
                <Typography variant="h5" color="error">
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    onClick={()=> window.location.reload()}//vuelve a cargar la página
                    sx={{mt:2}}
                >
                    Reintentar
                    </Button>
                </Box>
            </Container>
        );
    }
    return(
        <Box>
        <Box
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%',
                color: 'white',
                py: 8,
                textAlign: 'center'
            }}
        >
            <Container maxWidth='lg'>
                <Typography variant="h2" component='h1' gutterBottom fontWeight='bold'>Bienvenido a Fake Store</Typography>
                <Typography variant="h5" component='p' sx={{mb: 4}}>Descubre los mejores productos al mejor precio</Typography>
                <Button 
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: 'white',
                        color: 'primary.main',
                        '&:hover':{
                            backgroundColor:'grey.100'
                        }
                    }}
                >
                    Ver todos los productos
                </Button>
            </Container>

        </Box>

        <Container maxWidth='lg' sx={{py: 6}}>
            <Typography variant="h3" component='h2' align="center" gutterBottom>Productos Destacados</Typography>
            {loading ? (
                <LoadingSpinner/>
            ):(
                <ProductList products={featuredProducts}/>
            )}

        </Container>
        </Box>
       
    );

};

export default Home;