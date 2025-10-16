import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography,Button, Badge, IconButton, Box, Menu, MenuItem, Container  } from "@mui/material";
import { ShoppingCart, Menu as MenuIcon, Store } from "@mui/icons-material";
import { useCart } from "../../Context/CartContext";
import { api } from "../../Services/api";


const Header = ()=>{
    const {state, dispatch } = useCart();
    const [categories, setCategories] = useState([]);
    const [anchorEl, setAnchorEl ] = useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);


    useEffect(()=>{
        const loadCategories = async ()=>{
            try {
                const categoriesData = await api.getCategories();
                setCategories(categoriesData);
            }catch (error){
                console.error('Error loading categories: ', error);
            }
        };
        loadCategories();
    },[]);//hace que se ejecute una sola vez el codigo anterior

    const handleCategoryMenuOpen = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleCategoryMenuClose = ()=>{
        setAnchorEl(null);
    };
    const handleMobileMenuOpen = (event)=>{
        setMobileMenuAnchor(event.currentTarget); 
    };
    const handleMobileMenuClose = ()=>{
        setMobileMenuAnchor(null);
    };
    const toggleCart = ()=>{
        dispatch({type: 'TOGGLE_CART'});
    };

    const totalItems = state.items.reduce((total, item)=> total + item.quantity, 0);

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
            <Container maxWidth='lg'>
                <Toolbar>
                    {/*Logo*/}
                    <Store sx={{mr: 2}}/>
                    <Typography
                    variant="h6"
                    component='a'
                    href="/"
                    sx={{
                        flexGrow:{xs: 1, md: 0},
                        color: 'inherit',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                    >
                        FakeStore
                    </Typography>
                    {/*navegación desktop */}
                    <Box sx={{display:{xs: 'none', md: 'flex'}, ml: 4, flexGrow: 1}}                                
                    >
                        <Button
                        color='inherit'
                        onClick={handleCategoryMenuOpen}
                        sx={{mr:2}}
                        >
                            Categorias
                        </Button>
                        <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCategoryMenuClose}
                        >
                            {categories.map((category)=>(
                                <MenuItem
                                key={category}
                                onClick={handleCategoryMenuClose}
                                component='a'
                                href={`/category/${category}`}
                                sx={{textTransform: 'capitalize'}}
                                >
                                {category}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/*Carrito */}

                    <IconButton
                        color="inherit"
                        onClick={toggleCart}>

                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart/>
                            </Badge>
                    </IconButton>

                    {/*Menu mobile */}
                    <IconButton
                        color="inherit"
                        onClick={handleMobileMenuOpen}
                        sx={{display:{md: 'none'}, ml: 1}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Menu
                        anchorEl={mobileMenuAnchor}
                        open={Boolean(mobileMenuAnchor)}
                        onClose={handleMobileMenuClose}
                    >
                        {categories.map((category)=>(
                            <MenuItem
                            key={category}
                            onClick={handleCategoryMenuClose}
                            component='a'
                            href={`/category/${category}`}
                            sx={{textTransform:'capitalize'}}
                            >
                                {category}
                                
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>

            </Container>

        </AppBar>
    );
};

export default Header;