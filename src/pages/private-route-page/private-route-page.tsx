import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Container, Box } from '@mui/material';
import "./private-route-page.css"

const PrivateRoute: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? (
        <Container maxWidth={false} className="private-container" >
            <Box className="private-box" > <Outlet /> </Box>
        </Container>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
