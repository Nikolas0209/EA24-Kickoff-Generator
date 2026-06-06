import './InternationalKickoff.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

type InternationalKickoff = {
  country: string,
  stars: number,
  logo: string
}


function InternationalKickoff(){
 const navigate = useNavigate();
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

 const navigatePage = (): void => {
  navigate('/')
 }

 return(
  <>
   <div className="go-back-button-container">
    <button className="go-back-button" onClick={navigatePage}>
      Go Back
    </button>
   </div>
  </>
 
 )
}

export default InternationalKickoff;