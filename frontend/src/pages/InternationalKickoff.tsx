import './InternationalKickoff.css';
import { useNavigate } from 'react-router-dom';

function InternationalKickoff(){
 const navigate = useNavigate();

 const navigatePage = (): void => {
  navigate('/')
 }

 return(
  <>
   <div className="go-back-button-container">
    <button className="go-back-button" onClick={navigatePage}>
      Go Back
    </button>
   </div>
  </>
 
 )
}

export default InternationalKickoff;