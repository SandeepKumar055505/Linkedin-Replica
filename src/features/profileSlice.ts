import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProfileState {
    profileData: any;
    loading: boolean;
    error: string | null;
}

const initialState: ProfileState = {
    profileData: null,
    loading: false,
    error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
    try {
        const response = await axios.get('https://api.example.com/profile');
        return response.data;
    } catch (error) {
        return {
            name: "Sandeep Kumar",
            role: "Front-End Developer | React | JavaScript",
            skills: [
                "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Redux", "Thunk",
                "Zustand", "Material UI", "Tailwind CSS", "Bootstrap", "Emailjs", "Geolocation", "Git", "Azure",
                "Lazy loading", "Agile Methodologies"
            ],
            suggestedForYou: [
                { name: "John Doe", title: "Full-Stack Developer", location: "Delhi, India" },
                { name: "Jane Smith", title: "UI/UX Designer", location: "Mumbai, India" }
            ],
            analytics: {
                profileViews: 45,
                postImpressions: 1500,
                connections: 180
            },
            resources: ["JavaScript Mastery Course", "React Advanced Guide", "TypeScript in Depth"],
            activity: [
                { content: "Successfully launched a comprehensive digital marketing management platform." },
                { content: "Developed real-time messaging system for BioBrain project." }
            ],
            experience: [
                {
                    role: "React Developer",
                    company: "Tooliqa Innovations LLP",
                    duration: "May 2023 – Present",
                    description: "Responsible for the design and development of a comprehensive digital marketing management platform."
                },
                {
                    role: "Junior Frontend Developer",
                    company: "ACIL Technologies Pvt. Ltd.",
                    duration: "January 2022 – May 2023",
                    description: "Contributed to the design and development of a flight booking platform."
                }
            ],
            education: [
                { degree: "B.Tech", institution: "Maharshi Dayanand University", year: "2016 – 2020", grade: "68%" },
                { degree: "12th", institution: "CBSE", year: "2014 – 2016", grade: "70.2%" }
            ]
        };
    }
});

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profileData = action.payload;
                state.loading = false;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to load profile data';
            });
    }
});

export const profileReducer = profileSlice.reducer;
