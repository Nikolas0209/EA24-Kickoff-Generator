import '../ui/BackNavigationButton.css';
import { useNavigate } from "react-router-dom";

function BackNavigationButton(){
  const navigate = useNavigate();

  const navigatePage = (): void => {
    if(window.history.length > 1){
      navigate(-1)
    } else {
      navigate('/')
    }
  };

  return(
    <div className="go-back-button-container">
     <button className="go-back-button" onClick={navigatePage}>
       Go Back
     </button>
   </div>
 )
}

export default BackNavigationButton;