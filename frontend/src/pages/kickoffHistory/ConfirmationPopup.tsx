import './ConfirmationPopup.css';

type Popup = {
  errorMessage: string,
  yesPopupButton: () => Promise<void>,
  noPopupButton: () => void
}

function ConfirmationPopup({ noPopupButton, yesPopupButton, errorMessage }: Popup){
  
  return(
    <div className="popup-overlay">
     <div className="popup-modal">
        <p className="popup-text">
         {errorMessage === '' ?  
          `Proceeding will delete all kickoff history data.
          Do you wish to continue?` : errorMessage}
        </p>
        <div className="popup-buttons-div">
         <button onClick={yesPopupButton} className="popup-buttons">
            YES
          </button>
          <button onClick={noPopupButton} className="popup-buttons">
            NO
          </button>
        </div>
      </div>
   </div>
  )
}

export default ConfirmationPopup;