import '../KickoffContainer.css';
import NavigationHeader from '../../components/navigation/NavigationHeader';
import { useKickoff } from '../../hooks/useKickoff';
import { createKickoffUI } from '../../data/createKickoffUI';
import { KickoffType } from '../../enums/kickoffType.enum';
import TeamCard from '../../components/ui/TeamCard';
import RerollTeam from '../../components/ui/RerollTeam';
import KickoffActions from '../../components/ui/KickoffActions';
import type { ClubKickoff } from '../../types/clubTypes/clubKickoff.type';
import LoadingComponent from '../../components/ui/LoadingComponent';
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { getRequest } from '../../api/getRequest';
import ErrorComponent from '../../components/ui/ErrorComponent';
import type { LeagueTeamSelection } from '../../types/clubTypes/leagueTeamSelection.type';
import type { League, Direction } from '../../types/clubTypes/leagueNavigation.type';

function ClubLeagueKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading, hasError, retryFetch } = useKickoff<ClubKickoff>('/api/clubs', false);
  const {homeTeam, awayTeam} = createKickoffUI(kickoff);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [homeLeagueIndex, setHomeLeagueIndex] = useState(0);
  const [awayLeagueIndex, setAwayLeagueIndex] = useState(0);
  const homeRequestId = useRef(0);
  const awayRequestId = useRef(0); 

  const currentHomeLeague = leagues[homeLeagueIndex];
  const currentAwayLeague = leagues[awayLeagueIndex];

  useEffect(() => {
   const fetchLeague = async() => {
    try{
      const response = await axios.get('/api/clubs/leagues');
      setLeagues(response.data);
    } catch (error){
      console.log('Leagues could not be fetched.', error)
    }
   }

  fetchLeague();
  }, []);

  const generateLeagueKickoff = useCallback(async() => {  
   if(leagues.length > 0){
    await fetchKickoff(`/api/clubs/?homeLeague=${currentHomeLeague.leagueId}&awayLeague=${currentAwayLeague.leagueId}`)
   }
  }, [leagues, currentAwayLeague, currentHomeLeague, fetchKickoff]);
   
  const rerollTeamFromLeague = useCallback(async (excludeId: string, leagueId: string) => {
    return await getRequest<LeagueTeamSelection>(`/api/clubs/random-team/reroll?baseTeamId=${excludeId}&leagueId=${leagueId}`)
  }, []);

  useEffect(() => {
    if(leagues.length > 0 && kickoff === null){
     generateLeagueKickoff(); 
    }
  
  }, [leagues.length, generateLeagueKickoff, kickoff]);

  const competitionLogo = kickoff?.competitionLogo;
  const homeLeagueLogo = kickoff?.homeLeagueLogo;
  const awayLeagueLogo = kickoff?.awayLeagueLogo;

  const changeHomeLeague = async(direction: Direction): Promise<void> => {
    homeRequestId.current += 1;
    const requestId = homeRequestId.current;
    const excludeId = awayTeam.id;
    const movement = direction === 'next' ? 1 : -1;

    let targetLeagueIndex = homeLeagueIndex + movement;

    if(targetLeagueIndex === leagues.length){
      targetLeagueIndex = 0;
    }

    if(targetLeagueIndex === -1){
      targetLeagueIndex = leagues.length -1;
    }

    setHomeLeagueIndex(targetLeagueIndex);

    const leagueId = leagues[targetLeagueIndex].leagueId;
    const rerolledTeam = await rerollTeamFromLeague(excludeId, leagueId);

    if(requestId !== homeRequestId.current) return;

    setKickoff((prev) => {
      if(!prev) return prev;

      return{
        ...prev,
        homeTeam: rerolledTeam.team,
        homeLeagueLogo: rerolledTeam.leagueLogo
      } 
    })
  };

  const changeAwayLeague = async(direction: Direction): Promise<void> => {
   awayRequestId.current += 1;
   const requestId = awayRequestId.current;
   const excludeId = homeTeam.id;
   const movement = direction === 'next' ? 1 : -1;

   let targetLeagueIndex = awayLeagueIndex + movement;

   if(targetLeagueIndex === leagues.length){
    targetLeagueIndex = 0;
   }

   if(targetLeagueIndex === -1){
    targetLeagueIndex = leagues.length - 1;
   }

   setAwayLeagueIndex(targetLeagueIndex);

   const leagueId = leagues[targetLeagueIndex].leagueId;
   const rerolledTeam = await rerollTeamFromLeague(excludeId, leagueId);

   if(requestId !== awayRequestId.current) return;

   setKickoff((prev) => {
     if(!prev) return prev;

     return{
      ...prev, 
      awayTeam: rerolledTeam.team,
      awayLeagueLogo: rerolledTeam.leagueLogo
     } 
   })
  };

  return(
    <div className="page-background">
    {leagues.length === 0 || (isLoading && kickoff === null) ? (<LoadingComponent/>) : hasError ?
     (<ErrorComponent retryFetch={retryFetch}/>) : (
      <>
        <NavigationHeader />

        {kickoff && (
          <>
           <div className="kickoff-container">
             <TeamCard team={homeTeam} league={homeTeam.league} position='left' competitionLogo={competitionLogo} 
              homeLeagueLogo={homeLeagueLogo} currentHomeLeague={currentHomeLeague} changeHomeLeague={changeHomeLeague}/>
            
             <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} fetchKickoff={fetchKickoff} kickoff={kickoff} 
              kickoffType={KickoffType.CLUB_LEAGUES} generateLeagueKickoff={generateLeagueKickoff}/>

             <TeamCard team={awayTeam} league={awayTeam.league} position='right' competitionLogo={competitionLogo} awayLeagueLogo={awayLeagueLogo} 
              currentAwayLeague={currentAwayLeague} changeAwayLeague={changeAwayLeague} />
           </div>
        
           <RerollTeam setIsSubmitted={setIsSubmitted} kickoff={kickoff} setKickoff={setKickoff} rerollEndpoint='/api/clubs/random-team' mode='club-league'/>
         </>
      )}
      </>
    )}
  </div>
  )
}

export default ClubLeagueKickoff;