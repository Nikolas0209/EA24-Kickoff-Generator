import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function CountryKickoffSelector(){
 const navigate = useNavigate();

 const navigateRandomKickoff = ():void => {
  navigate('/countries-random')
 };
 
 const navigateRatingsMode = ():void => {
  navigate('/countries-ratings-mode')
 }
 
 return(
   <div className="main-buttons-div">
    <button className="kickoff-button" onClick={navigateRandomKickoff}>
      Random Kick-off 
    </button>
    <button className="kickoff-button">
      Ratings Mode Kick-off
    </button>  
   </div>
  )
}

export default CountryKickoffSelector;