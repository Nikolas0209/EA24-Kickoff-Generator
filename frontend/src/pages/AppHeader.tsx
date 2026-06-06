import './AppHeader.css';
import eaLogo from '../assets/eaLogo.png';
import ball from '../assets/ball.png';

function AppHeader(){

 return(
   <header className="header-div">
    <div className="header-section-1">
      <img src={eaLogo} alt="ea-logo" className="game-logo"/>
    </div>
    <div className="header-section-2">
     <h3 className="title">
       EA Kickoff Generator
     </h3>
    </div>
    <div className="header-section-3">
     <img src={ball} className="ball"/>
    </div>
   </header> 
 )
}

export default AppHeader;