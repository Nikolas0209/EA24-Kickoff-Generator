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
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export type League = {
  league: string,
  leagueId:string
}

function ClubLeagueKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs', false);
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [homeLeagueIndex, setHomeLeagueIndex] = useState(0);
  const [awayLeagueIndex, setAwayLeagueIndex] = useState(0);

  const currentHomeLeague = leagues[homeLeagueIndex];
  const currentAwayLeague = leagues[awayLeagueIndex];

  useEffect(() => {
   const fetchLeague = async() => {
    const response = await axios.get('/api/clubs/leagues');
    setLeagues(response.data);
   }

  fetchLeague();

  }, []);

  const generateLeagueKickoff = useCallback(async()=> {  
   if(leagues.length > 0){
    await fetchKickoff(`/api/clubs/?homeLeague=${currentHomeLeague.leagueId}&awayLeague=${currentAwayLeague.leagueId}`)
   }
  }, [leagues, currentAwayLeague, currentHomeLeague, fetchKickoff]);
    
  useEffect(() => {
    generateLeagueKickoff();    
 
  }, [generateLeagueKickoff]);

  const competitionLogo = kickoff?.competitionLogo;
  const homeLeagueLogo = kickoff?.homeLeagueLogo;
  const awayLeagueLogo = kickoff?.awayLeagueLogo;

  const nextHomeLeague = (): void => {
    if(homeLeagueIndex === leagues.length - 1){
      setHomeLeagueIndex(0)
    } else {
      setHomeLeagueIndex(prev => prev + 1)
    }   
  };

  const previousHomeLeague = (): void => {
    if(homeLeagueIndex === 0){
      setHomeLeagueIndex(leagues.length - 1)
    } else {
      setHomeLeagueIndex(prev => prev - 1)
    }
  };

  const nextAwayLeague = (): void => {
    if(awayLeagueIndex === leagues.length - 1){
      setAwayLeagueIndex(0);
    } else{
      setAwayLeagueIndex(prev => prev + 1)
    }
  };

  const previousAwayLeague = (): void => {
    if(awayLeagueIndex === 0){
      setAwayLeagueIndex(leagues.length - 1)
    } else {
      setAwayLeagueIndex(prev => prev - 1)
    }
  };

 // const league2 = currentHomeLeague.leagueId === homeTeam.leagueId;

  return(
    <div className="page-background">
    {leagues.length === 0 || (isLoading && kickoff === null) ? <LoadingComponent/> : (
      <>
        <NavigationHeader />

        {kickoff && (
          <>
           <div className="kickoff-container" key={kickoff.homeTeam._id}>
            <TeamCard team={homeTeam} league={homeTeam.league} side='left' competitionLogo={competitionLogo} 
             homeLeagueLogo={homeLeagueLogo} nextHomeLeague={nextHomeLeague} previousHomeLeague={previousHomeLeague} currentHomeLeague={currentHomeLeague} />
            
            <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} fetchKickoff={fetchKickoff} kickoff={kickoff} 
             kickoffType={KickoffType.CLUB_LEAGUES} generateLeagueKickoff={generateLeagueKickoff}/>

            <TeamCard team={awayTeam} league={awayTeam.league} side='right' competitionLogo={competitionLogo} awayLeagueLogo={awayLeagueLogo}  nextAwayLeague={nextAwayLeague} previousAwayLeague={previousAwayLeague} currentAwayLeague={currentAwayLeague} />
           </div>
        
           <RerollTeam setIsSubmitted={setIsSubmitted} kickoff={kickoff} setKickoff={setKickoff} rerollEndpoint='api/clubs/random-team'/>
         </>
      )}
      </>
    )}
  </div>
  )
}

export default ClubLeagueKickoff;