import MuiCard from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    margin: '0px auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '600px',
    },
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    borderRadius: '12px',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, max-width 0.6s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        maxWidth: '620px',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
    },
}));

export const FeedContainer = styled(Box)(({ theme }) => ({
    gap: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

export const CommentInput = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ccc',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
        },
    },
}));
