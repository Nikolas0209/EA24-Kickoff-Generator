import '../KickoffContainer.css';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../utils/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';
import ErrorComponent from '../../components/ui/ErrorComponent';

function ClubRatingsKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<ClubKickoff>('/api/clubs/club-ratings');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return(
    <div className="page-background">
      {isLoading && kickoff === null ? (<LoadingComponent/>) : hasError ?
       (<ErrorComponent retryFetch={retryFetch}/>) : (
        <>
          <NavigationHeader />
  
          {kickoff && (
            <>
              <div className="kickoff-container">
                <TeamCard team={homeTeam} title='CLUBS RATINGS'/>

                <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} fetchKickoff={fetchKickoff} kickoff={kickoff} kickoffType={KickoffType.CLUB_RATINGS}/>

                <TeamCard team={awayTeam} title='CLUBS RATINGS'/>
              </div>

              <RerollTeam setIsSubmitted={setIsSubmitted} kickoff={kickoff} setKickoff={setKickoff} rerollEndpoint='/api/clubs/club-ratings'/>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ClubRatingsKickoff;