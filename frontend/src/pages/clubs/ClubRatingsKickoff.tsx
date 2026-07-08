import '../international/InternationalKickoff.css'
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import type { SubmitMatch } from '../../types/submitMatch.type';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import LoadingComponent from '../../components/ui/LoadingComponent';

function ClubRatingsKickoff({setIsSubmitted, isSubmitted}: SubmitMatch){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs/club-ratings');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);

  return(
    <div className="page-background">
      {isLoading && kickoff === null ? <LoadingComponent/> : (
        <>
          <BackNavigationButton />
  
          {kickoff && (
            <div className="kickoff-container" key={kickoff.homeTeam._id}>
              <TeamCard team={homeTeam} title='CLUBS RATINGS'/>

              <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} fetchKickoff={fetchKickoff} kickoff={kickoff} kickoffType={KickoffType.CLUB_RATINGS}/>

              <TeamCard team={awayTeam} title='CLUBS RATINGS'/>
            </div>
          )}
  
          <RerollTeam setIsSubmitted={setIsSubmitted} kickoff={kickoff} setKickoff={setKickoff} rerollEndpoint='/api/clubs/club-ratings'/>
        </>
      )}
    </div>
  )
}

export default ClubRatingsKickoff;