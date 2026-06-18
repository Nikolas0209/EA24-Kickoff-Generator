import { useEffect, useState } from 'react';
import './KickoffHistory.css';
import type { Team } from './InternationalKickoff';
import { KickoffType } from './InternationalKickoff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Kickoff = {
  homeTeam: Team,
  awayTeam: Team,
  type: KickoffType
}

function KickoffHistory(){
  const [kickoffHistory, setKickoffHistory] = useState <Kickoff>();
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
          <button>Delete</button>
        </div>
        <div className="kickoff-history-list">
            <p>Kickoff</p>
            <p>date</p>
            <button>Delete</button>
        </div>
      </div>
    </>
  )
};

export default KickoffHistory;