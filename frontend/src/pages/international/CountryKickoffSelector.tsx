import '../HomePage.css';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/navigation/NavigationHeader';

function CountryKickoffSelector(){
 const navigate = useNavigate();
 
 const navigateRandomKickoff = ():void => {
  navigate('/countries-random')
 };
 
 const navigateRatingsMode = ():void => {
  navigate('/countries-ratings-mode')
 }

 return(
  <div className="page-background">
   <NavigationHeader title='Country Kickoff'/>

   <div className="main-buttons-div">
    <button className="kickoff-button" onClick={navigateRandomKickoff}>
      Random Kick-off 
    </button>
    <button className="kickoff-button" onClick={navigateRatingsMode}>
      Ratings Mode Kick-off
    </button>  
   </div>
  </div>
  )
}

export default CountryKickoffSelector;