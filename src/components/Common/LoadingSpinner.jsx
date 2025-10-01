import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({message = "Cargando..."})=>{
    return(
        <Box
            display="flex"
            flex="column"
            alignItems="center"
            justifyContent="center"
            height="200px"
        >

            <CircularProgress size={60} thickness={4}/>
            <Typography variant="h5" color="textSecondary" sx={{mt: 2}}>{message}</Typography>

        </Box>
    );
};

export default LoadingSpinner;