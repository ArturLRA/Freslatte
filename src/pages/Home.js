import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Carrosel from "../components/Carrosel";

function Home(){
    return(
    <div className='carrosel'>
  <Carrosel />
   </div>
    )
}

export default Home