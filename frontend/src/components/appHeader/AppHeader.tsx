import './AppHeader.css';
import eaLogo from '../../assets/eaLogo.png';
import ball from '../../assets/ball.png';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function AppHeader(){
  const [isRotating, setIsRotating] = useState <boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isKickoffHistoryPage = location.pathname === '/kickoff-history';  
   
  const navigateKickoffHistory = (): void => {
    setIsRotating(true);

    navigate('/kickoff-history');  

    setTimeout(() => {
      setIsRotating(false)
    }, 3000);
  };

 return(
   <header className="header-div">
     <Link to='/'>
       <div className="header-section-1">
         <img src={eaLogo} alt="ea-logo" className="game-logo"/>   
       </div>
     </Link>
   
     <div className="header-section-2">
       <h3 className="title">
         EA Kickoff Generator
       </h3>
     </div>
   
     <div className="header-section-3">
      <button onClick={navigateKickoffHistory} disabled={isKickoffHistoryPage} 
        className={`${isKickoffHistoryPage ? 'disable-history-button' : ""}`}>
        <img src={ball} 
         className={`ball ${isRotating ? 'rotating-class' : ""} ${isKickoffHistoryPage ? 'dim-ball-img' : ""}`}/>
      </button>
      <div className={`kickoff-history-tooltip-div ${isKickoffHistoryPage ? 'hide-tooltip' : ''}`}> 
          <p className="kickoff-history-tooltip">
            Kickoff History
          </p>
        </div>
     </div>   
   </header> 
 )
}

export default AppHeader;