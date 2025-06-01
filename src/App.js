import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop';
import HomeFooter from './components/Footer';
import NavBarMenu from './components/NavBarMenu';


function App() {
  return (
    <Router>

    <NavBarMenu />

      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/Shop'  element={<Shop /> }/>
      </Routes>

      <HomeFooter />
    </Router>
  );
}

export default App;
