import './UECLKickoff.css';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import TeamCard from '../../components/ui/TeamCard';
import KickoffActions from '../../components/ui/KickoffActions';
import { KickoffType } from '../../enums/kickoffType.enum';
import RerollTeam from '../../components/ui/RerollTeam';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState } from 'react';
import ErrorComponent from '../../components/ui/ErrorComponent';

function UECLKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<ClubKickoff>('/api/clubs?competition=UECL');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const competition = 'UECL';
  const competitionLogo = kickoff?.competitionLogo;

  return(
    <div className="uecl-page">
      {isLoading && kickoff === null ? (<LoadingComponent/>) : hasError ? 
       (<ErrorComponent retryFetch={retryFetch}/>) : (
        <>
          <NavigationHeader />
     
          {kickoff && (
            <div className="kickoff-container" key={kickoff.homeTeam._id}>

             <TeamCard team={homeTeam} title='UEFA CONFERENCE LEAGUE' competitionLogo={competitionLogo}
              side='left' competition={competition}/>

             <KickoffActions kickoff={kickoff} setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} fetchKickoff={fetchKickoff} kickoffType={KickoffType.UECL}/>

             <TeamCard team={awayTeam} title='UEFA CONFERENCE LEAGUE' competitionLogo={competitionLogo} 
              side='right' competition={competition}/>
         
            </div>
          )}

          <RerollTeam setKickoff={setKickoff} kickoff={kickoff} setIsSubmitted={setIsSubmitted} rerollEndpoint={'api/clubs/random-team'} competition={competition}/>
        </>
      )}
    </div>
  )
}

export default UECLKickoff;