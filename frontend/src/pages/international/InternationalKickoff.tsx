import './InternationalKickoff.css';
import BackNavigationButton from '../../components/ui/BackNavigationButton';
import { useKickoff } from '../../hooks/useKickoff';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { SubmitMatch } from '../../types/submitMatch.type';
import type { CountryKickoff } from '../../types/internationalTypes/countryKickoff.type';

function InternationalKickoff({ isSubmitted, setIsSubmitted }: SubmitMatch){
 const { kickoff, setKickoff, fetchKickoff } = useKickoff<CountryKickoff>('/api/countries');
 
 return(
  <>
   <BackNavigationButton/>

   {kickoff && (
     <div className="kickoff-container" key={kickoff.homeTeam._id}>
       <TeamCard team={kickoff.homeTeam} title='INTERNATIONAL RANDOM'/>
       
       <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} kickoff={kickoff}
        fetchKickoff={fetchKickoff}/>

       <TeamCard team={kickoff.awayTeam} title='INTERNATIONAL RANDOM'/>
     </div>
      )
     }

     <RerollTeam setIsSubmitted={setIsSubmitted} setKickoff={setKickoff} kickoff={kickoff} 
      rerollEndpoint='/api/countries/random-team' />
  </>
 )
}

export default InternationalKickoff;