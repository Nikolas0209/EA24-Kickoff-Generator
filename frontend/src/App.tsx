import './App.css';
import eaLogo from './assets/eaLogo.png';
import ball from './assets/ball.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

type InternationalKickoff = {
  country: string,
  stars: number,
  logo: string
}

function App(){
  const [countriesKickoff, setCountriesKickoff] = useState<InternationalKickoff[]>([]);

  useEffect(() => {
    const fetchInternationalKickoff = async (): Promise<void> => {
     try{
      const response = await axios.get('http://localhost:3000/countries');
      setCountriesKickoff(response.data);
     } catch(error){
      console.log('Could not fetch the Internationals', error)
     }
    }

    fetchInternationalKickoff();
  }, []);

  return (
    <>
     <header className="header-div">
      <div className="header-section-1">
        <img src={eaLogo} alt="ea-logo" className="game-logo"/>
      </div>
      <div className="header-section-2">
       <h3 className="title">
        EA Kickoff Generator
       </h3>
      </div>
      <div className="header-section-3">
        <img src={ball} className="ball"/>
      </div>
     </header>
     <div className="main-buttons-div">
      <button className="kickoff-button">
        Generate International Kick-off
      </button>
      <button className="kickoff-button">
        Generate Club Kick-off
      </button>
     </div>
    </>
  )
}

export default App
