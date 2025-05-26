

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authprovider } from './context/authcontext';
import { Cartprovider } from './context/cartcontext';
import Login from './pages/login';
import Produclist from './components/productlist';
import Productform from './components/productform';


export default function App() {

    <Authprovider>
      <Cartprovider>
        <BrowserRouter>
          <Headers/>
          <Routes>
            <Route path='/' element={<Produclist/>}/>
            <Route path='/ajoutproduit' element={<Productform/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </Cartprovider>
    </Authprovider>
}

