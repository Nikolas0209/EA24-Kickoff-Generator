import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage(){
  const navigate = useNavigate();
 
  const navigatePage = (): void => {
    navigate('/countries')
  }

  const navigateUCL = ():void => {
    navigate('//UEFA-Champions-League')
  }

  return(
   <div className="page-background">
     <div className="main-buttons-div">
       <button className="kickoff-button" onClick={navigatePage}>
         Generate International Kickoff
       </button>
       <button className="kickoff-button" onClick={navigateUCL}>
         Generate Club Kickoff
       </button>
     </div>
    
     <div className="competition-button-div">
       <button className="kickoff-button">
         Generate UEFA Competition Kickoff
       </button>
     </div>
   </div>
  )
}

export default HomePage;