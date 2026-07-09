import '../HomePage.css';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/navigation/NavigationHeader';

function ClubKickoffSelector(){
 const navigate = useNavigate();

 const navigateRandomKickoff = ():void => {
  navigate('/clubs-random')
 };
 
 const navigateRatingsMode = ():void => {
  navigate('/clubs-ratings-mode')
 }
 
 return(
  <div className="page-background">
   <NavigationHeader title='Club Kickoff'/>
  
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

export default ClubKickoffSelector;