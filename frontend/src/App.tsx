import './App.css';
import AppHeader from './components/appHeader/AppHeader';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InternationalKickoff from './pages/InternationalKickoff';
import KickoffHistory from './pages/KickoffHistory';
import CountryKickoffSelector from './pages/CountryKickoffSelector';

function App(){
 return (
  <BrowserRouter>
    <AppHeader />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/countries' element={<CountryKickoffSelector />} />
      <Route path='/countries-random' element={<InternationalKickoff />} />
      <Route path='/kickoff-history' element={<KickoffHistory />} />
    </Routes>
  </BrowserRouter>
 )
}

export default App;
