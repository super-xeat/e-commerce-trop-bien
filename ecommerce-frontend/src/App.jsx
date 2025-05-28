

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authprovider } from './context/authcontext';
import { Cartprovider } from './context/cartcontext';
import Login from './pages/login';
import Produclist from './components/productlist';
import Productform from './components/productform';
import Navbar from './components/navbar';
import Register from './pages/register';

export default function App() {

  return(
    <Authprovider>
      <Cartprovider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Produclist/>}/>
            <Route path='/ajoutproduit' element={<Productform/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </Cartprovider>
    </Authprovider>
  )
}

