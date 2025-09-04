import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';
import { ACCESS_TOKEN } from './constants';
import NewTaskForm from './pages/NewTaskForm';
import MemberInvitationModal from './pages/MemberInvitationModal';
import AccountSettings from './pages/AccountSettings';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />

        <Route path='/login' element={<Login />}  />
        <Route path='/register' element={<Register />} />
        <Route path='/task' element={<NewTaskForm />} />
        <Route path='/invite' element={<MemberInvitationModal />} />
        <Route path='/account' element={<AccountSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
