import './App.css';
import AppHeader from './components/appHeader/AppHeader';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InternationalKickoff from './pages/international/InternationalKickoff';
import KickoffHistory from './pages/KickoffHistory';
import CountryKickoffSelector from './pages/international/CountryKickoffSelector';
import InternationalRatingsKickoff from './pages/international/InternationalRatingsKickoff';
import { useState } from 'react';
import UCLKickoff from './pages/competitions/UCLKickoff';
import CompetitionKickoffSelector from './pages/competitions/CompetitionKickoffSelector';

function App(){
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

 return (
  <BrowserRouter>
    <AppHeader />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/countries' element={<CountryKickoffSelector />} />
      <Route path='/countries-random' element={<InternationalKickoff isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />} />
      <Route path='/countries-ratings-mode' element={<InternationalRatingsKickoff isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />} />
      <Route path='competitions' element={<CompetitionKickoffSelector/>}/>
      <Route path='/UEFA-Champions-League' element={<UCLKickoff isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}/>} />
      <Route path='/kickoff-history' element={<KickoffHistory />} />
    </Routes>
  </BrowserRouter>
 )
}

export default App;
