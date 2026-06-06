import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type InternationalKickoff = {
  country: string,
  stars: number,
  logo: string
}

function HomePage(){
  const [countriesKickoff, setCountriesKickoff] = useState<InternationalKickoff[]>([]);
  const navigate = useNavigate();
 
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

  const navigatePage = (): void => {
    navigate('/countries')
  }

  return(
    <div className="main-buttons-div">
     <button className="kickoff-button" onClick={navigatePage}>
       Generate International Kick-off
     </button>
     <button className="kickoff-button">
       Generate Club Kick-off
     </button>
    </div>
  )
}

export default HomePage;