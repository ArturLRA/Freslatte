import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CadastroLogin from './pages/Cadastro';
import HomeFooter from './components/Footer';
import NavBarMenu from './components/NavBarMenu';


function App() {
  const location = useLocation();


  const rotasSemLayout = ['/cadastrologin'];

  const esconderLayout = rotasSemLayout.includes(location.pathname.toLowerCase());

  return (
    <>
      {!esconderLayout && <NavBarMenu />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cadastro" element={<CadastroLogin />} />
      </Routes>
      
      {!esconderLayout && <HomeFooter />}
    </>
  );
}
export default App;
