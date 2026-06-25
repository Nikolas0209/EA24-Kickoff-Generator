import './UCLKickoff.css';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import { useKickoff } from '../../hooks/useKickoff';

function UCLKickoff(){
  const { kickoff, setKickoff } = useKickoff<ClubKickoff>('/api/clubs?competition=UCL');

  return(
    <div className="ucl-page">
    
    </div>
  )
}

export default UCLKickoff;