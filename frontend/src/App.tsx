import './App.css';
import AppHeader from './components/appHeader/AppHeader';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InternationalKickoff from './pages/international/InternationalKickoff';
import KickoffHistory from './pages/kickoffHistory/KickoffHistory';
import CountryKickoffSelector from './pages/international/CountryKickoffSelector';
import InternationalRatingsKickoff from './pages/international/InternationalRatingsKickoff';
import UCLKickoff from './pages/competitions/UCLKickoff';
import CompetitionKickoffSelector from './pages/competitions/CompetitionKickoffSelector';
import UELKickoff from './pages/competitions/UELKickoff';
import UECLKickoff from './pages/competitions/UECLKickoff';
import ClubKickoffSelector from './pages/clubs/ClubKickoffSelector';
import ClubRatingsKickoff from './pages/clubs/ClubRatingsKickoff';
import ClubRandomKickoff from './pages/clubs/ClubRandomKickoff';
import ClubLeagueKickoff from './pages/clubs/ClubLeagueKickoff';

function App(){
  
 return (
  <BrowserRouter>
    <AppHeader />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/countries' element={<CountryKickoffSelector />} />
      <Route path='/countries-random' element={<InternationalKickoff />} />
      <Route path='/countries-ratings-mode' element={<InternationalRatingsKickoff />} />
      <Route path='/competitions' element={<CompetitionKickoffSelector />} />
      <Route path='/UEFA-Champions-League' element={<UCLKickoff />} />
      <Route path='/UEFA-Europa-League' element={<UELKickoff />} />
      <Route path='/UEFA-Conference-League' element={<UECLKickoff />} />
      <Route path='/clubs'element={<ClubKickoffSelector />} />
      <Route path='clubs-random' element={<ClubRandomKickoff />} />
      <Route path='/clubs-ratings-mode' element={<ClubRatingsKickoff />} />
      <Route path='/clubs-league-mode' element={<ClubLeagueKickoff />}  />
      <Route path='/kickoff-history' element={<KickoffHistory />} />
    </Routes>
  </BrowserRouter>
 )
}

export default App;
