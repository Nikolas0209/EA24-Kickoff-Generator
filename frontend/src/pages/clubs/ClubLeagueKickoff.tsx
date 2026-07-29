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
import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { getRequest } from '../../api/getRequest';
import type { TeamReroll } from '../../types/teamReroll.type';

export type League = {
  league: string,
  leagueId: string,
}

export type Direction = 'next' | 'previous';

function ClubLeagueKickoff(){
  const { kickoff, setKickoff, fetchKickoff, isLoading } = useKickoff<ClubKickoff>('/api/clubs', false);
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
    const response = await axios.get('/api/clubs/leagues');
    setLeagues(response.data);
   }

  fetchLeague();

  }, []);

  const generateLeagueKickoff = useCallback(async() => {  
   if(leagues.length > 0){
    await fetchKickoff(`/api/clubs/?homeLeague=${currentHomeLeague.leagueId}&awayLeague=${currentAwayLeague.leagueId}`)
   }
  }, [leagues, currentAwayLeague, currentHomeLeague, fetchKickoff]);
   
  const rerollTeamFromLeague = useCallback(async (excludeId: string, leagueId: string) => {
    return await getRequest<TeamReroll>(`/api/clubs/random-team/reroll?baseTeamId=${excludeId}&leagueId=${leagueId}`)
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
    let movement: number;

    if(direction === 'next'){
      movement = 1
    } else{
      movement = -1
    };

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
      } as typeof prev
    })
  };

  const changeAwayLeague = async(direction: Direction): Promise<void> => {
   awayRequestId.current += 1;
   const requestId = awayRequestId.current;
   const excludeId = homeTeam.id;
   let movement: number;

   if(direction === 'next'){
    movement = 1;
   } else{
    movement = -1;
   }

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
     } as typeof prev
   })
  };

  //bug in the random club kickoff with rerolls

  return(
    <div className="page-background">
    {leagues.length === 0 || (isLoading && kickoff === null) ? <LoadingComponent/> : (
      <>
        <NavigationHeader />

        {kickoff && (
          <>
           <div className="kickoff-container" key={kickoff.homeTeam._id}>
             <TeamCard team={homeTeam} league={homeTeam.league} side='left' competitionLogo={competitionLogo} 
              homeLeagueLogo={homeLeagueLogo} currentHomeLeague={currentHomeLeague} changeHomeLeague={changeHomeLeague}/>
            
             <KickoffActions isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} fetchKickoff={fetchKickoff} kickoff={kickoff} 
              kickoffType={KickoffType.CLUB_LEAGUES} generateLeagueKickoff={generateLeagueKickoff}/>

             <TeamCard team={awayTeam} league={awayTeam.league} side='right' competitionLogo={competitionLogo} awayLeagueLogo={awayLeagueLogo} 
              currentAwayLeague={currentAwayLeague} changeAwayLeague={changeAwayLeague} />
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