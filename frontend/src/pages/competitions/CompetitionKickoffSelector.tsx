import '../HomePage.css';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/navigation/NavigationHeader';

function CompetitionKickoffSelector(){
  const navigate = useNavigate();
 
  const navigateUCL = ():void => {
    navigate('/uefa-champions-league')
  };

  const navigateUEL = ():void => {
   navigate('/uefa-europa-league')
  };

  const navigateUECL = ():void => {
    navigate('/uefa-conference-league')
  }

  return(
   <div className="page-background">

     <NavigationHeader title='UEFA Competitions Kickoff'/>

     <div className="main-buttons-div">
       <button className="kickoff-button" onClick={navigateUCL}>
         UEFA Champions League 
       </button>
       <button className="kickoff-button" onClick={navigateUEL}>
         UEFA Europa League
       </button>  
     </div>
     <div className="competition-button-div">
       <button className="kickoff-button" onClick={navigateUECL}>
         UEFA Conference League
       </button>
     </div>
   </div>
  )
}

export default CompetitionKickoffSelector;