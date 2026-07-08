import './UCLKickoff.css';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import { useKickoff } from '../../hooks/useKickoff';
import TeamCard from '../../components/ui/TeamCard';
import KickoffActions from '../../components/ui/KickoffActions';
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import type { SubmitMatch } from '../../types/submitMatch.type';
import RerollTeam from '../../components/ui/RerollTeam';
import { createKickoffUI } from '../../data/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import LoadingComponent from '../../components/ui/LoadingComponent';

function UCLKickoff({ isSubmitted, setIsSubmitted }: SubmitMatch){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs?competition=UCL');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);

  const competition = 'UCL';

  return(
    <div className="ucl-page">
      {isLoading && kickoff === null ? <LoadingComponent/> : (
        <>
          <BackNavigationButton />
          
          {kickoff && (
            <div className="kickoff-container" key={kickoff.homeTeam._id}>

              <TeamCard team={homeTeam} title='UEFA CHAMPIONS LEAGUE'/>

              <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff} 
               kickoffType={KickoffType.UCL} fetchKickoff={fetchKickoff} />

              <TeamCard team={awayTeam} title='UEFA CHAMPIONS LEAGUE'/>
           </div>
          )}

          <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff} 
           rerollEndpoint='api/clubs/random-team' competition={competition}/>
        </>
      )}
    </div>
  )
}

export default UCLKickoff;