import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Avatar, Grid, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../features/profileSlice';
import { RootState, AppDispatch } from '../../store/store';
import Loader from '../../components/loader';

interface TabPanelProps {
    children: React.ReactNode;
    value: number;
    index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: theme.spacing(2),
    fontSize: '50px',
}));

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { profileData, loading } = useSelector((state: RootState) => state.profile);
    const [value, setValue] = useState(0);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (loading) {
        return <Loader message="" />;
    }

    return (
        <Box sx={{ maxWidth: '900px', margin: '0 auto', padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <ProfileAvatar alt="Sandeep Kumar" src="/profile-pic-placeholder.jpg" />
                <Typography variant="h5" component="h1">{profileData?.name || 'User Name'}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {profileData?.role || 'User Role'}
                </Typography>
            </Box>

            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Skills" />
                <Tab label="Suggested for You" />
                <Tab label="Analytics" />
                <Tab label="Resources" />
                <Tab label="Activity" />
                <Tab label="Experience" />
                <Tab label="Education" />
            </Tabs>

            {profileData && (
                <>
                    <TabPanel value={value} index={0}>
                        <Typography variant="h6">Skills</Typography>
                        <Grid container spacing={2}>
                            {profileData.skills.map((skill: string, index: number) => (
                                <Grid item xs={6} sm={4} key={index}>
                                    <Typography variant="body1">{skill}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        <Typography variant="h6">Suggested for You</Typography>
                        <List>
                            {profileData.suggestedForYou.map((person: any, index: number) => (
                                <ListItem key={index}>
                                    <ListItemText primary={person.name} secondary={`${person.title} - ${person.location}`} />
                                </ListItem>
                            ))}
                        </List>
                    </TabPanel>

                    <TabPanel value={value} index={2}>
                        <Typography variant="h6">Analytics</Typography>
                        <Typography variant="body1">Profile Views: {profileData.analytics.profileViews}</Typography>
                        <Typography variant="body1">Post Impressions: {profileData.analytics.postImpressions}</Typography>
                        <Typography variant="body1">Connections: {profileData.analytics.connections}</Typography>
                    </TabPanel>

                    <TabPanel value={value} index={3}>
                        <Typography variant="h6">Resources</Typography>
                        <List>
                            {profileData.resources.map((resource: string, index: number) => (
                                <ListItem key={index}>
                                    <ListItemText primary={resource} />
                                </ListItem>
                            ))}
                        </List>
                    </TabPanel>

                    <TabPanel value={value} index={4}>
                        <Typography variant="h6">Activity</Typography>
                        {profileData.activity.map((activity: any, index: number) => (
                            <Card key={index} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body2">{activity.content}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </TabPanel>

                    <TabPanel value={value} index={5}>
                        <Typography variant="h6">Experience</Typography>
                        {profileData.experience.map((job: any, index: number) => (
                            <Card key={index} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body1"><strong>{job.role}</strong> at {job.company}</Typography>
                                    <Typography variant="body2">{job.duration}</Typography>
                                    <Typography variant="body2">{job.description}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </TabPanel>

                    <TabPanel value={value} index={6}>
                        <Typography variant="h6">Education</Typography>
                        {profileData.education.map((edu: any, index: number) => (
                            <Card key={index} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body1"><strong>{edu.degree}</strong> - {edu.institution}</Typography>
                                    <Typography variant="body2">Year: {edu.year}</Typography>
                                    <Typography variant="body2">Grade: {edu.grade}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </TabPanel>
                </>
            )}
        </Box>
    );
};

export default ProfilePage;
