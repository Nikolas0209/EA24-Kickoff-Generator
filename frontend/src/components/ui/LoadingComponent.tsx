import './LoadingComponent.css';
import loadingSpinner from '../../assets/loadingSpinner.png';

function LoadingComponent(){
  
  return(
    <div className="loading-spinner-container">
       <img src={loadingSpinner} className="loading-spinner" alt="spinner" />  
    </div>
  )
}

export default LoadingComponent;
