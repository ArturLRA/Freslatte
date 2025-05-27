import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import BanhoTosa from './pages/BanhoTosa';
import HotelResort from './pages/HotelResort';
import LoginCadastro from './pages/CadastroLogin';
import NavBarMenu from './components/NavBarMenu';


function App() {
  return (
    <Router>

    <NavBarMenu />

      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/banhoTosa'  element={<BanhoTosa /> }/>
        <Route path='/hotelResort' element={<HotelResort /> } />
        <Route path='/loginECadastro' element={<LoginCadastro /> } />
      </Routes>

    </Router>


     
 
    
  );
}

export default App;
