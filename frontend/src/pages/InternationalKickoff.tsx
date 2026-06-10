import './InternationalKickoff.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import rating_05 from '../assets/starRatings/rating_05.png';
import rating_1 from '../assets/starRatings/rarting_1.png';
import rating_1_5 from '../assets/starRatings/rating_1_5.png';
import rating_2 from '../assets/starRatings/rating_2.png';
import rating_2_5 from '../assets/starRatings/rating_2_5.png';
import rating_3 from '../assets/starRatings/rating_3.png';
import rating_3_5 from '../assets/starRatings/rating_3_5.png';
import rating_4 from '../assets/starRatings/rating_4.png';
import rating_4_5 from '../assets/starRatings/rating_4_5.png';
import rating_5 from '../assets/starRatings/rating_5.png';


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

 const starRatings = {
  0.5: rating_05,
  1: rating_1,
  1.5: rating_1_5,
  2: rating_2,
  2.5: rating_2_5,
  3: rating_3,
  3.5: rating_3_5,
  4: rating_4,
  4.5: rating_4_5,
  5: rating_5
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
         <div>
          <p>Internationals</p>
         </div>
         <div className="country-image-container">
          <img src={`http://localhost:3000${countriesKickoff.homeTeam.logo}`} 
           className="country-image" alt="" />
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
     <div className="kickoff-center">Hello</div>
     <div className="kickoff-team">
       <div>
        <p>Internationals</p>
       </div>
       <div className="country-image-container">
        <img src={`http://localhost:3000${countriesKickoff.awayTeam.logo}`}
         className="country-image" alt="" />
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