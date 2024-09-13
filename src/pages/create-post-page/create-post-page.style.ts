import MuiCard from '@mui/material/Card';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',

    overflowY: 'scroll',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    scrollbarWidth: 'none',
    maxHeight: 'calc(100vh - 110px)',

    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, max-width 0.6s ease-in-out',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '600px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
    '&:hover': {
        // transform: 'translateY(5px)',
        // maxWidth: '620px',
    },
}));


export const CreatePostContainer = styled(Box)(({ theme }) => ({
    paddingBottom: 0,
    paddingTop: 20,
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export const FileDropArea = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging: boolean }>(({ theme, isDragging }) => ({
    border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.text.secondary}`,
    padding: theme.spacing(4),
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: isDragging ? theme.palette.action.hover : theme.palette.background.paper,
    transition: 'background-color 0.3s, border-color 0.3s',
}));