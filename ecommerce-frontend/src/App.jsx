

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
import Profil from './pages/profil';
import { Messagelist } from './components/message';
import Conversation from './pages/conversation';
import Footer from './components/footer';
import Message from './components/message-bis';
import {PrivateRoute} from './components/private';



export default function App() {


  return (
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
          
            <Route path='/panier/:id' element={<Panier/>}/>
            <Route path='/products/:id' element={<Productdetail/>}/>
            <Route path='/profil' element={<Profil/>}/>
            <Route path='/message/:userid' element={<Conversation/>} />
            <Route path='/message' element={<Message/>}/>
             
            <Route path="/message/:user1id/:user2id" element={<PrivateRoute><Messagelist/></PrivateRoute>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

