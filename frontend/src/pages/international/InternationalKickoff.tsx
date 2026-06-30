import './InternationalKickoff.css';
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import { useKickoff } from '../../hooks/useKickoff';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { SubmitMatch } from '../../types/submitMatch.type';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';
import { createKickoffUI } from '../../data/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';

function InternationalKickoff({ isSubmitted, setIsSubmitted }: SubmitMatch){
 const { kickoff, setKickoff, fetchKickoff } = useKickoff<CountryKickoff>('/api/countries');
 const {homeTeam, awayTeam} = createKickoffUI(kickoff);

 return(
  <div className="page-background">
   <BackNavigationButton/>

   {kickoff && (
     <div className="kickoff-container" key={kickoff.homeTeam._id}>
       <TeamCard team={homeTeam} title='INTERNATIONAL RANDOM'/>
       
       <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff}
        fetchKickoff={fetchKickoff} kickoffType={KickoffType.INTERNATIONAL} />

       <TeamCard team={awayTeam} title='INTERNATIONAL RANDOM'/>
     </div>
      )
     }

     <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff} 
      rerollEndpoint='/api/countries/random-team' />
  </div>
 )
}

export default InternationalKickoff;