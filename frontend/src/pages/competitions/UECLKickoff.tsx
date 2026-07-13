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

function UECLKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs?competition=UECL');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const competition = 'UECL';
  const competitionLogo = kickoff?.competitionLogo;

  return(
    <div className="uecl-page">
      {isLoading && kickoff === null ? <LoadingComponent/> : (
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