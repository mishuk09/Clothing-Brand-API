
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Auth/Dashboard';
import AddPost from './components/Post/AddPost';
import UpdatePost from './components/Post/UpdatePost';
import DeletePost from './components/Post/DeletePost';
import Edit from './components/Post/Edit';
import Delete from './components/Post/Delete';
import { useEffect, useState } from 'react';
import Orders from './components/Post/Orders';
import SignUp from './components/Auth/SignUp';

function App() {
 
  return (
    <div className="App">

      <Navbar />

      <Routes>

        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />

        <Route path="/orders" element={<Orders />} /> {/* Corrected route for Orders component */}
        <Route path='/addpost' element={<AddPost />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/delete/:id" element={<DeletePost />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>



    </div >
  );
}

export default App;
