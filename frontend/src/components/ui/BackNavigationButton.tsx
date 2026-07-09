import '../ui/BackNavigationButton.css';
import { useNavigate } from "react-router-dom";

type Navigation = {
  title?: string
}

function BackNavigationButton({ title }: Navigation){
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
     {title && (
      <span className="title-span">
         <h1 className="title">
           {title}
         </h1>
      </span>
     )} 
    </div>
 )
}

export default BackNavigationButton;