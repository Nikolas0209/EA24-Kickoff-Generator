import './App.css';
import AppHeader from './pages/AppHeader';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InternationalKickoff from './pages/InternationalKickoff';

function App(){
 return (
  <>
   <AppHeader/>
   
   <BrowserRouter>
    <Routes>
     <Route path='/' element={<HomePage />}/>
     <Route path='/countries' element={<InternationalKickoff />}/>
    </Routes>
   </BrowserRouter>
  </>
 )
}

export default App;
