import './UELKickoff.css';
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import type { SubmitMatch } from '../../types/submitMatch.type';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import TeamCard from '../../components/ui/TeamCard';
import KickoffActions from '../../components/ui/KickoffActions';
import { KickoffType } from '../../enums/kickoffType.enum';
import RerollTeam from '../../components/ui/RerollTeam';

function UELKickoff({isSubmitted, setIsSubmitted}: SubmitMatch){
 const { kickoff, setKickoff, fetchKickoff } = useKickoff<ClubKickoff>('/api/clubs?competition=UEL'); 
 const {homeTeam, awayTeam} = createKickoffUI(kickoff);
 
 const competition = 'UEL';

 return(
   <div className="uel-page">
     <BackNavigationButton/>
    
     {kickoff && (
       <div className="kickoff-container" key={kickoff.homeTeam._id}>
        
         <TeamCard team={homeTeam} title='UEFA EUROPA LEAGUE'/>

         <KickoffActions setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} fetchKickoff={fetchKickoff}
          kickoff={kickoff} kickoffType={KickoffType.CLUB}/>

         <TeamCard team={awayTeam} title='UEFA EUROPA LEAGUE'/>
       </div>
     )}

     <RerollTeam setKickoff={setKickoff} kickoff={kickoff} setIsSubmitted={setIsSubmitted}
      rerollEndpoint={'api/clubs/random-team'} competition={competition}/>

   </div>
  )
}

export default UELKickoff;