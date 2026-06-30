import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage(){
  const navigate = useNavigate();
 
  const navigatePage = (): void => {
    navigate('/countries')
  }

  const navigateCompetitions = ():void => {
    navigate('/competitions')
  }

  return(
   <div className="page-background">
     <div className="main-buttons-div">
       <button className="kickoff-button" onClick={navigatePage}>
         Generate International Kickoff
       </button>
       <button className="kickoff-button">
         Generate Club Kickoff
       </button>
     </div>
    
     <div className="competition-button-div">
       <button className="kickoff-button" onClick={navigateCompetitions}>
         Generate UEFA Competition Kickoff
       </button>
     </div>
   </div>
  )
}

export default HomePage;