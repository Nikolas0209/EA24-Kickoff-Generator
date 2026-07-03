import '../HomePage.css';
import './CompetitionKickoffSelector.css';
import { useNavigate } from 'react-router-dom';
import BackNavigationButton from '../../components/ui/BackNavigationButton';

function CompetitionKickoffSelector(){
  const navigate = useNavigate();
 
  const navigateUCL = ():void => {
    navigate('//UEFA-Champions-League')
  };

  const navigateUEL = ():void => {
   navigate('/UEFA-Europa-League')
  };

  const navigateUECL = ():void => {
    navigate('/UEFA-Conference-League')
  }

  return(
   <div className="page-background">

     <BackNavigationButton/>

     <div className="main-buttons-div competition-buttons-div">
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