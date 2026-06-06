import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage(){
  const navigate = useNavigate();
 
  const navigatePage = (): void => {
    navigate('/countries')
  }

  return(
    <div className="main-buttons-div">
     <button className="kickoff-button" onClick={navigatePage}>
       Generate International Kick-off
     </button>
     <button className="kickoff-button">
       Generate Club Kick-off
     </button>
    </div>
  )
}

export default HomePage;