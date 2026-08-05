import '../HomePage.css';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/navigation/NavigationHeader';

function InternationalKickoffSelector(){
 const navigate = useNavigate();
 
 const navigateRandomKickoff = ():void => {
  navigate('/internationals-random')
 };
 
 const navigateRatingsMode = ():void => {
  navigate('/internationals-ratings-mode')
 }

 return(
  <div className="page-background">
   <NavigationHeader title='International Kickoff'/>

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

export default InternationalKickoffSelector;