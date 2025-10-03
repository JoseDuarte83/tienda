import React from "react";
import { ListItem, ListItemAvatar, ListItemText, IconButton, Box, Typography, Avatar } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartItem = ({item, onUpdateQuantity, onRemove})=>{
    return(
        <ListItem
            secondaryAction={
                <IconButton 
                    edge='end'
                    aria-label="delete"
                    onClick={()=> onRemove(item.id)}
                >
                    <Delete/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar
                    src={item.image}
                    alt={item.title}
                    variant="square"
                    sx={{width: 60, height: 60, mr: 2}}
                />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography
                        variant="body2"
                        sx={{
                            display: 'webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {item.title}

                    </Typography>
                }
                secondary={
                    <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
                        <IconButton
                            size="small"
                            onClick={()=> onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                            <Remove/>
                            </IconButton>
                        <Typography sx={{mx : 1}}>{item.quantity}</Typography>
                        <IconButton
                            size="small"
                            onClick={()=>onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                            <Add/>
                            </IconButton>
                    </Box>
                }
            >

            </ListItemText>

        </ListItem>
    );

};

export default CartItem;