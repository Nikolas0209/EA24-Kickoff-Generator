import './ErrorComponent.css';

type ErrorProp = {
  retryFetch: () => Promise<void>
}

function ErrorComponent({ retryFetch }: ErrorProp){

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

//<div className='page-background'>     </div>