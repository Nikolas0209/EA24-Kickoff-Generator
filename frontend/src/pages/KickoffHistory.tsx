import { useEffect, useState } from 'react';
import './KickoffHistory.css';
import { KickoffType } from './InternationalKickoff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

type Kickoff = {
  homeTeam: string,
  awayTeam: string,
  type: KickoffType,
  _id: string,
  createdAt: string
}

function KickoffHistory(){
  const [kickoffHistory, setKickoffHistory] = useState <Kickoff[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKickoffHistory = async (): Promise<void> => {
      try{
        const response = await axios.get('http://localhost:3000/kickoff-history');
        setKickoffHistory(response.data);
      } catch(error){
        console.log('Kickoff history could not be fetched.', error)
      }  
    }

    fetchKickoffHistory();
  }, []);

  const navigatePage = (): void => {
    if(window.history.length > 1){
      navigate(-1)
    } else {
      navigate('/')
    }
  };

  const deleteAllButton = async(): Promise<void> => {
    try{
     await axios.delete('http://localhost:3000/kickoff-history');
     setKickoffHistory([]);
    } catch(error){
      console.log('Could not delete all data', error)
    }
  }

  const deleteOneButton = async(id:string): Promise<void> => {
    try{
      await axios.delete(`http://localhost:3000/kickoff-history/${id}`);
      setKickoffHistory(prev => prev.filter(kickoff => kickoff._id !== id)); 
    } catch(error){
     console.log('The kickoff could not be deleted', error);
    }
  }

  return(
    <>
      <div className="go-back-button-container">
        <button onClick={navigatePage}>
          Go Back
        </button>
      </div>
      <div className="kickoff-history-div">
        <div className="kickoff-history-title-div">
           <p className="kickoff-history-title">
             All Matches:
           </p>
           <button onClick={deleteAllButton}>
            Delete All
           </button>
        </div>
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
                <button onClick={() => deleteOneButton(kickoff._id)}>
                   Delete
                </button>
               </div>
             </div>   
             )
           })}
         </div>
      </div>
    </>
  )
};

export default KickoffHistory;