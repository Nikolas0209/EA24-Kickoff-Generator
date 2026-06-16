import './App.css';
import AppHeader from './components/appHeader/AppHeader';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InternationalKickoff from './pages/InternationalKickoff';

function App(){
 return (
  <BrowserRouter>
    <AppHeader />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/countries' element={<InternationalKickoff />} />
    </Routes>
  </BrowserRouter>
 )
}

export default App;
