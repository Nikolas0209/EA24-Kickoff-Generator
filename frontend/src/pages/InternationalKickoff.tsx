import './InternationalKickoff.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { starRatings } from '../data/starRatings'; 

type Team = {
  _id: string,
  country: string,
  stars: number,
  logo: string
}

type InternationalKickoff = {
  homeTeam: Team,
  awayTeam: Team
}


function InternationalKickoff(){
 const navigate = useNavigate();
 const [countriesKickoff, setCountriesKickoff] = useState<InternationalKickoff>();
 
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
     
   {
    countriesKickoff && (
     <div className="kickoff-container" key={countriesKickoff.homeTeam._id}>
       <div className="kickoff-team">
         <div className="subtitle-div">
          <p className="kickoff-subtitle">INTERNATIONALS</p>
         </div>
         <div className="country-image-container">
          <img src={`http://localhost:3000${countriesKickoff.homeTeam.logo}`} 
           className="country-image" alt="Club Logo" />
         </div>
         <div className="rating-container">
           <img src={starRatings[countriesKickoff.homeTeam.stars]} 
             alt={countriesKickoff.homeTeam.stars.toString()} />
         </div>
         <div className="club-name-container">
           <p className="country-name">
            {countriesKickoff.homeTeam.country}
           </p>
         </div>
       </div>

     <div className="kickoff-center">
      <button className="generate-button">GENERATE</button>
      <button className="submit-button">Submit Kickoff</button>
     </div>

     <div className="kickoff-team">
       <div className="subtitle-div">
        <p className="kickoff-subtitle">INTERNATIONALS</p>
       </div>
       <div className="country-image-container">
        <img src={`http://localhost:3000${countriesKickoff.awayTeam.logo}`}
         className="country-image" alt="Club Logo" />
       </div>
       <div className="rating-container">
         <img src={starRatings[countriesKickoff.awayTeam.stars]} 
           alt={countriesKickoff.awayTeam.stars.toString()} />
       </div>
       <div className="club-name-container">
         <p className="country-name">
          {countriesKickoff.awayTeam.country}
        </p>
      </div>
    </div>
   </div>
      )
     }
  </>
 )
}

export default InternationalKickoff;