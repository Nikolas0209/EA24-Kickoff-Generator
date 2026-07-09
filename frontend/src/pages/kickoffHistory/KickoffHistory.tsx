import { useEffect, useState } from 'react';
import './KickoffHistory.css';
import axios from 'axios';
import dayjs from 'dayjs';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import LoadingComponent from '../../components/ui/LoadingComponent';
import EmptyKickoffHistory from '../../components/ui/EmptyKickoffHistory';
import ConfirmationPopup from './ConfirmationPopup';
import { KickoffType } from '../../enums/kickoffType.enum';
import KickoffHistoryToolbar from './KickoffHistoryToolbar';

export type HistoryKickoff = {
  homeTeam: string,
  awayTeam: string,
  kickoffType: KickoffType,
  _id: string,
  createdAt: string
}

function KickoffHistory(){
  const [kickoffHistory, setKickoffHistory] = useState <HistoryKickoff[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<KickoffType>(KickoffType.ALL);

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

  const filteredKickoffHistory = selectedFilter === KickoffType.ALL
   ? kickoffHistory
   : kickoffHistory.filter(kickoff => kickoff.kickoffType === selectedFilter);
  
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

  const openDropDownMenu = ():void => {
    if(!isDropDown){
      setIsDropDown(true)
    } else {
      setIsDropDown(false)
    }
  }

  const chooseFilter = (selectedFilter: KickoffType):void => {
    setSelectedFilter(selectedFilter);
    setIsDropDown(false);
  }

  return(
   <div className="page-background">
     <NavigationHeader />

     <div className="kickoff-history-div">
      {isPopup && (
         <ConfirmationPopup yesPopupButton={yesPopupButton} noPopupButton={noPopupButton} errorMessage={errorMessage} />
      )}
  
       <div className="kickoff-history-title-div">
          <p className="kickoff-history-title">
             Matches: {selectedFilter.toUpperCase()}
           </p>
         <div className="filter-section">
           <KickoffHistoryToolbar kickoffHistory={kickoffHistory} isDropDown={isDropDown} 
            openDropDownMenu={openDropDownMenu} filteredKickoffHistory={filteredKickoffHistory}
            deleteAllButton={deleteAllButton} chooseFilter={chooseFilter}/>
         </div>
       
       </div>

       <div>
       {isLoading ? (<LoadingComponent/>) : 
          filteredKickoffHistory.length === 0 ? ( 
             <div className="empty-kickoff-wrapper">
              <EmptyKickoffHistory />
            </div>) : (
            <div className="kickoff-list-wrapper">
            {filteredKickoffHistory.map(kickoff => { 
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