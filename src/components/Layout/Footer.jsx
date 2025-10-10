import React from "react"
import { Box, Container, Typography, Grid, Link } from "@mui/material"
import { Store } from "@mui/icons-material"

const Footer =()=>{
    return (
        <Box
            component='footer'
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 4,
                mt: 'auto'
            }}
        >
            <Container maxWidth='lg'>
                <Grid container spacing={4}>
                    <Grid xs={12} sm={6} md={4}>
                        <Box sx={{display:'flex', alignItems:'center', mb:2}}>
                            <Store sx={{mr:1}}/>
                            <Typography variant="h6" component='div'>
                                FAKE STORE
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            Tu tienda en linea de confianza. Ofrecemos los mejores productos.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Enlaces rápidos
                        </Typography>
                        <Box sx={{display:'flex', flexDirection: 'column'}}>
                            <Link href='/category/electronics' color="inherit" sx={{mb: 1}}>
                            Electrónica
                            </Link>
                            <Link href='/category/jewerly' color="inherit" sx={{mb: 1}}>
                            Joyería
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h5" gutterBottom>
                            Contacto
                        </Typography>
                        <Typography variant="body2">
                           Email: info@fakestore.com
                        </Typography>
                        <Typography variant="body2">
                           Teléfono: 1234-5566-8000
                        </Typography>
                    </Grid>
                </Grid>
                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, mt: 3}}>
                    <Typography variant="body2" align="center">
                        {new Date().getFullYear()} Fakestore. Todos los derechos reservados
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;