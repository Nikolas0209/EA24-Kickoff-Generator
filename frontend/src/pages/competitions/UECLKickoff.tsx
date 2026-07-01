import type { SubmitMatch } from '../../types/submitMatch.type';
import './UECLKickoff.css';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import TeamCard from '../../components/ui/TeamCard';
import KickoffActions from '../../components/ui/KickoffActions';
import { KickoffType } from '../../enums/kickoffType.enum';
import RerollTeam from '../../components/ui/RerollTeam';

function UECLKickoff({isSubmitted, setIsSubmitted}: SubmitMatch){
  const { kickoff, setKickoff, fetchKickoff } = useKickoff<ClubKickoff>('/api/clubs?competition=UECL');
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);

  const competition = 'UECL';

  return(
    <div className="uecl-page">
      <BackNavigationButton />
     
      {kickoff && (
        <div className="kickoff-container" key={kickoff.homeTeam._id}>

          <TeamCard team={homeTeam} title='UEFA CONFERENCE LEAGUE'/>

          <KickoffActions kickoff={kickoff} setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} fetchKickoff={fetchKickoff} kickoffType={KickoffType.CLUB}/>

          <TeamCard team={awayTeam} title='UEFA CONFERENCE LEAGUE'/>
          
        </div>
      )}

      <RerollTeam setKickoff={setKickoff} kickoff={kickoff} setIsSubmitted={setIsSubmitted} rerollEndpoint={'api/clubs/random-team'} competition={competition}/>

    </div>
  )
}

export default UECLKickoff;