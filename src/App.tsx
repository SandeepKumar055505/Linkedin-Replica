import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedPage from './pages/feed-page';
import CreatePostPage from './pages/create-post-page';
import ProfilePage from './pages/profile-page';
import LoginPage from './pages/login-page';
import HeaderPage from './pages/header-page';
import PrivateRoute from './pages/private-route-page';

const App: React.FC = () => {
  return (
    <Router>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
