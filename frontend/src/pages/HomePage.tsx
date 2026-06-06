import './HomePage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

type InternationalKickoff = {
  country: string,
  stars: number,
  logo: string
}

function HomePage(){
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

  return(
    <div className="main-buttons-div">
     <button className="kickoff-button" >
       Generate International Kick-off
     </button>
     <button className="kickoff-button">
       Generate Club Kick-off
     </button>
    </div>
  )
}

export default HomePage;