import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import { Nav } from './Components/Nav';
import { Shop } from './Pages/shop/Shop';
import { Cart } from './Pages/cart/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
