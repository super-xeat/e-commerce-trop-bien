

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import { CartProvider } from './context/cartcontext';
import Login from './pages/login';
import Productlist from './components/productlist';
import Productform from './components/productform';
import Productdetail from './components/productdetail';
import Navbar from './components/navbar';
import Register from './pages/register';
import {Panier} from './components/panier';
import { Conversation } from './components/messagelist';
import Profil from './pages/profil';

export default function App() {

  return(
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Productlist/>}/>
            <Route path='/ajoutproduit' element={<Productform/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/panier' element={<Panier/>}/>
            <Route path='/message' element={<Conversation/>}/>
            <Route path='/product/:id' element={<Productdetail/>}/>
            <Route path='/profil' element={<Profil/>}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

