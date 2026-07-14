import '../international/InternationalKickoff.css';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';

function ClubLeagueKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  return(
    <div className="page-background">
    {isLoading && kickoff === null ? <LoadingComponent/> : (
      <>
        <NavigationHeader />

        {kickoff && (
          <div className="kickoff-container" key={kickoff.homeTeam._id}>
            <TeamCard team={homeTeam} title={homeTeam.league} />

            <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} fetchKickoff={fetchKickoff} kickoff={kickoff} kickoffType={KickoffType.CLUB_RANDOM}/>

            <TeamCard team={awayTeam} title={awayTeam.league}/>
          </div>
        )}

        <RerollTeam setIsSubmitted={setIsSubmitted} kickoff={kickoff} setKickoff={setKickoff} rerollEndpoint='api/clubs/random-team'/>
      </>
    )}
  </div>
  )
}

export default ClubLeagueKickoff;