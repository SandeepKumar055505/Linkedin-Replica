import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes, styled } from '@mui/system';

const rotateRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulseDot = keyframes`
  0%, 100% {
    transform: scale(0.1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
`;

const OuterRing = styled('div')(({ theme }) => ({
    border: `4px solid ${theme.palette.primary.light}`,
    borderTop: `2px solid ${theme.palette.primary.dark}`,
    borderRadius: '0%',
    width: '80px',
    height: '80px',
    position: 'absolute',
    animation: `${rotateRing} 2s linear infinite`,
}));

const InnerRing = styled('div')(({ theme }) => ({
    border: `4px solid ${theme.palette.secondary.light}`,
    borderTop: `2px solid ${theme.palette.secondary.dark}`,
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    position: 'absolute',
    animation: `${rotateRing} 1.5s linear infinite reverse`,
}));

const PulseDot = styled('div')(({ theme }) => ({
    width: '12px',
    height: '12px',
    backgroundColor: theme.palette.warning.main,
    borderRadius: '50%',
    position: 'absolute',
    animation: `${pulseDot} 1s ease-in-out infinite`,
}));

const LoaderContainer = styled(Box)(() => ({
    position: 'relative',
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const Loader: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                gap: 2,
                textAlign: 'center',
            }}
        >
            <LoaderContainer>
                <OuterRing />
                <InnerRing />
                <PulseDot sx={{ top: '0', left: '50%', transform: 'translateX(-50%)' }} />
                <PulseDot sx={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }} />
                <PulseDot sx={{ left: '0', top: '50%', transform: 'translateY(-50%)' }} />
                <PulseDot sx={{ right: '0', top: '50%', transform: 'translateY(-50%)' }} />
            </LoaderContainer>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loader;
