import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage(){
  const navigate = useNavigate();
  
  const navigatePageInternationals = (): void => {
    navigate('/countries')
  }

  const navigatePageClubs = ():void => {
    navigate('/clubs')
  }

  const navigateCompetitions = ():void => {
    navigate('/competitions')
  }

  return(
   <div className="page-background">
    <div className="title-container">
      <div className="title-wrapper">
        <h1 className="title">
          Home Page
        </h1>
      </div>
    </div>
    
     <div className="main-buttons-div">
       <button className="kickoff-button" onClick={navigatePageInternationals}>
         Generate International Kickoff
       </button>
       <button className="kickoff-button" onClick={navigatePageClubs}>
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