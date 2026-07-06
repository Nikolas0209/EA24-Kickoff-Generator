import { useEffect, useState } from 'react';
import './KickoffHistory.css';
import type { CountryKickoff } from '../types/internationalTypes/countryKickoff.type';
import axios from 'axios';
import dayjs from 'dayjs';
import BackNavigationButton from '../components/ui/BackNavigationButton';
import LoadingComponent from '../components/ui/LoadingComponent';
import EmptyKickoffHistory from '../components/ui/EmptyKickoffHistory';

type HistoryKickoff = {
  homeTeam: string,
  awayTeam: string,
  type: CountryKickoff,
  _id: string,
  createdAt: string
}

function KickoffHistory(){
  const [kickoffHistory, setKickoffHistory] = useState <HistoryKickoff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchKickoffHistory = async (): Promise<void> => {
      try{
        setIsLoading(true);
        const response = await axios.get('/api/kickoff-history');
        setKickoffHistory(response.data);
      } catch(error){
        console.log('Kickoff history could not be fetched.', error)
      } finally{
        setIsLoading(false);
      } 
    }

    fetchKickoffHistory();
  }, []);

  const deleteAllButton = ():void => {
     setIsPopup(true);
  };

  const deleteAllKickoffs = async(): Promise<void> => {
    try{
      await axios.delete('/api/kickoff-history');
      setKickoffHistory([]);
     } catch(error){
       console.log('Could not delete all data', error)
     }
  };

  const deleteOneButton = async(id:string): Promise<void> => {
    try{
      await axios.delete(`/api/kickoff-history/${id}`);
      setKickoffHistory(prev => prev.filter(kickoff => kickoff._id !== id)); 
    } catch(error){
     console.log('The kickoff could not be deleted', error);
    }
  };

  const noPopupButton = ():void => {
    setIsPopup(false);
    setErrorMessage('');
  };

  const yesPopupButton = async(): Promise<void> => {
    try{
      await deleteAllKickoffs();
      setIsPopup(false);
    } catch(err){
      setErrorMessage('Delete failed. Please try again.');
    }
  };

  return(
   <div className="page-background">
     <BackNavigationButton />

     <div className="kickoff-history-div">
      {isPopup && (
         <div className="popup-overlay">
         <div className="popup-modal">
           <p className="popup-text">
            {errorMessage === '' ?  
            `Proceeding will delete all kickoff history data.
             Do you wish to proceed` : errorMessage}
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
      )}
  
       <div className="kickoff-history-title-div">
         <p className="kickoff-history-title">
           All Matches:
         </p>
         <button disabled={kickoffHistory.length === 0}
           className={`delete-button ${kickoffHistory.length === 0 ?'disable-delete-all-button': ''}`}
           onClick={deleteAllButton}>
           Delete All
         </button>
       </div>
       <div className='wrapper'>
       {isLoading ? (<LoadingComponent/>) : 
          kickoffHistory.length === 0 ? ( 
             <div className="empty-kickoff-wrapper">
              <EmptyKickoffHistory />
            </div>) : (
            <div className="kickoff-list-wrapper">
            {kickoffHistory.map(kickoff => {
              return( 
                <div className="kickoff-history-list" key={kickoff._id}>
                  <div className="kickoff-team-div">
                    <p className="kickoff">
                      {`${kickoff.homeTeam} - ${kickoff.awayTeam}`}
                    </p>
                  </div>
                  <div className="kickoff-date-div">
                    <p>{dayjs(kickoff.createdAt).format('DD/MM/YYYY')}</p>
                  </div>
                  <div className="delete-one-btn-div">
                    <button className="delete-button"
                      onClick={() => deleteOneButton(kickoff._id)}>
                        Delete
                    </button>
                  </div>
                </div>   
                )
              })}
          </div>
        )}
       </div>
      </div>    
    </div>
  )
};

export default KickoffHistory;