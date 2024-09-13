import React from 'react';
import { AppBar, Box, Tabs, Tab, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ColorModeSelect from '../../theme/ColorModeSelect';
import { RootState } from '../../store/store';
import { logout } from '../../features/authSlice';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const getTabIndex = () => {
        switch (location.pathname) {
            case '/feed':
                return 0;
            case '/create-post':
                return 1;
            case '/profile':
                return 2;
            default:
                return 0;
        }
    };

    const [value, setValue] = React.useState(getTabIndex);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/feed');
                break;
            case 1:
                navigate('/create-post');
                break;
            case 2:
                navigate('/profile');
                break;
            default:
                navigate('/');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'inherit', }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    component="div"
                >
                    LinkedIn
                </Typography>

                {isAuthenticated && (
                    <Box sx={{ flexGrow: 1 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            centered
                            sx={{
                                '.MuiTab-root': {
                                    fontWeight: '500',
                                    textTransform: 'none',
                                },
                            }}
                        >
                            <Tab
                                icon={<HomeIcon />}
                                iconPosition="start"
                                label="Feed"
                                sx={{
                                    marginBottom: '0px',
                                    paddingLeft: '0px',
                                    marginLeft: '0.5rem',
                                    '& .MuiTab-iconWrapper': {
                                        fontSize: '1.3rem',
                                    },
                                }}
                            />
                            <Tab
                                icon={<CreateIcon />}
                                iconPosition="start"
                                label="Create Post"
                                sx={{
                                    marginBottom: '0px',
                                    paddingLeft: '0px',
                                    marginLeft: '0.5rem',
                                    '& .MuiTab-iconWrapper': {
                                        fontSize: '1.3rem',
                                    },
                                }}
                            />
                            <Tab
                                icon={<AccountCircleIcon />}
                                iconPosition="start"
                                label="Profile"
                                sx={{
                                    marginBottom: '0px',
                                    paddingLeft: '0px',
                                    marginLeft: '0.5rem',
                                    '& .MuiTab-iconWrapper': {
                                        fontSize: '1.3rem',
                                    },
                                }}
                            />
                        </Tabs>
                    </Box>
                )}

                {isAuthenticated && (
                    <IconButton
                        color="inherit"
                        onClick={handleLogout}
                        sx={{
                            marginLeft: 2,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                )}

                <ColorModeSelect sx={{ ml: 2 }} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
