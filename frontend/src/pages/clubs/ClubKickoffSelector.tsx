import '../competitions/CompetitionKickoffSelector.css';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/navigation/NavigationHeader';

function ClubKickoffSelector(){
 const navigate = useNavigate();

 const navigateRandomKickoff = ():void => {
  navigate('/clubs-random')
 };
 
 const navigateRatingsMode = ():void => {
  navigate('/clubs-ratings-mode')
 };

 const navigateLeagueMode = ():void => {
  navigate('/clubs-league-mode')
 };
 
 return(
  <div className="page-background">
   <NavigationHeader title='Club Kickoff'/>
  
   <div className="main-buttons-div">
    <button className="kickoff-button" onClick={navigateRandomKickoff}>
      Random Kickoff 
    </button>
    <button className="kickoff-button" onClick={navigateRatingsMode}>
      Ratings Mode Kickoff
    </button>  
   </div>
   <div className="competition-button-div">
       <button className="kickoff-button" onClick={navigateLeagueMode}>
         League Kickoff
       </button>
     </div>
  </div>
  )
}

export default ClubKickoffSelector;