import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register';
import App from './pages/App'
import Index from './pages/Index';
import Users from './pages/Users';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Update from './pages/Update';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);


root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Index />} />
          <Route path="register" element={<Register />} />
          <Route path="users" element={<Users />} />
          <Route path="login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/update/:userId" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>,
);