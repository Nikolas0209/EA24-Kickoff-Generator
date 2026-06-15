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

type RerollTeam = {
  team: Team
}

enum KickoffType {
  INTERNATIONAL = 'international',
  CLUB = 'club'
}

function InternationalKickoff(){
 const navigate = useNavigate();
 const [countriesKickoff, setCountriesKickoff] = useState<InternationalKickoff>();
 const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
 const [submitKickoff, setSubmitKickoff] = useState<InternationalKickoff>();
 
 const fetchOneCountry = async (excludeId: string): Promise<RerollTeam> => {
  try{
    const response = await axios.get(`http://localhost:3000/countries/random-team/reroll?baseTeamId=${excludeId}`);
    return response.data;
  } catch(error){
    console.log('Could not fetch a new team', error);
  }
};
 
const fetchInternationalKickoff = async (): Promise<void> => {
  try{
   const response = await axios.get('http://localhost:3000/countries');
   setCountriesKickoff(response.data);
  } catch(error){
   console.log('Could not fetch the Internationals', error)
  }
};

 useEffect(() => {
  fetchInternationalKickoff()
 }, []);

 useEffect(() => {
  if(!isSubmitted) return;

  const timer = setTimeout (() => {
    setIsSubmitted(false);
  }, 3000)

  return () => clearTimeout(timer)
 }, [isSubmitted]);

 const navigatePage = (): void => {
  navigate('/')
 };

 const rerollHome = async (): Promise<void> => {
   const excludeId = countriesKickoff.awayTeam._id;
   const country = await fetchOneCountry(excludeId);
    
   setCountriesKickoff((prev) => ({
    ...prev,
    homeTeam: country.team    
 }))
 };

 const rerollAway = async (): Promise<void> => {
  const excludeId = countriesKickoff.homeTeam._id;
  const country = await fetchOneCountry(excludeId);

  setCountriesKickoff((prev) => ({
    ...prev,
    awayTeam: country.team
  }))
 };

 const isSubmittedButton = async(): Promise<void> => {
  if(isSubmitted) return;
 
  try{
    const response = await axios.post('http://localhost:3000/kickoff-history?homeTeam', {
      homeTeam: countriesKickoff.homeTeam,
      awayTeam: countriesKickoff.awayTeam,
      type: KickoffType.INTERNATIONAL
    }) 
  
    setSubmitKickoff(response.data);
    setIsSubmitted(true);
  } catch(error){
    console.log('The kikcoff could not be submitted', error)
  } 
 };

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
        <button className="generate-button" onClick={fetchInternationalKickoff}>
          GENERATE
        </button>
        <button className="submit-button" onClick={isSubmittedButton}>
          {isSubmitted ? 'Submitted' : 'Submit Kickoff'}
        </button>
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

     <div className="reroll-div">
       <button className="reroll-button" onClick={rerollHome}>
        Reroll team
       </button>
       <button className="reroll-button" onClick={rerollAway}>
         Reroll team
       </button>
     </div>
  </>
 )
}

export default InternationalKickoff;