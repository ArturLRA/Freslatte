import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Carrosel from "../components/Carrosel";
import HomeText from "../components/TextGrid";

function Home(){
    return(
    <div className='carrosel'>
     <HomeText />
   </div>

    )
}

export default Home