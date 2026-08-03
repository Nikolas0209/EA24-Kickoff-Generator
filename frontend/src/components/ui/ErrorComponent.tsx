import './ErrorComponent.css';

type ErrorComponentProp = {
  retryFetch: () => Promise<void>
}

function ErrorComponent({ retryFetch }: ErrorComponentProp){

  return(
    <div className='error-div-container'>
        <div className='error-message-wrapper'>
          <p className='error-message'>
            Something went wrong. Please try again.
          </p>
          <button className='retry-button' onClick={retryFetch}>
            Retry
          </button>
        </div> 
    </div>
  )
}

export default ErrorComponent;

