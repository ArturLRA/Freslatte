import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import HomeFooter from './components/Footer';
import NavBarMenu from './components/NavBarMenu';


function App() {
  const location = useLocation();

  const rotasSemLayout = ['/loginpage', '/cadastro'];
  const esconderLayout = rotasSemLayout.includes(location.pathname.toLowerCase());

  return (
    <>
      {!esconderLayout && <NavBarMenu />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
      
      {!esconderLayout && <HomeFooter />}
    </>
  );
}
export default App;
