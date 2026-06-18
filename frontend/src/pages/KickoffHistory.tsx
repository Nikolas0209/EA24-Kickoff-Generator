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
        setKickoffHistory(response.data.kickoffHistory);
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
     const response = await axios.delete('http://localhost:3000/kickoff-history');
     setKickoffHistory(response.data)
    } catch(error){
      console.log('Could not delete all data', error)
    }
  }


  return(
    <>
      <div className="go-back-button-container">
        <button className="go-back-button" onClick={navigatePage}>
          Go Back
        </button>
      </div>
      <div className="kickoff-history-div">
        <div className="kickoff-history-title-div">
           <p className="kickoff-history-title">
             All Matches:
           </p>
           <button onClick={deleteAllButton}>Delete</button>
        </div>
        {kickoffHistory.map(kickoff => {
          return( 
            <div className="kickoff-history-list"  key={kickoff._id}>
             <p>{`${kickoff.homeTeam} - ${kickoff.awayTeam}`}</p>
             <p>{dayjs(kickoff.createdAt).format('DD/MM/YYYY')}</p>
             <button>Delete</button>
            </div>   
            )
          })}
      </div>
    </>
  )
};

export default KickoffHistory;