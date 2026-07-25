import './TeamCard.css';
import { starRatings } from '../../data/starRatings';
import type { UITeam } from '../../types/uiTeam.types';
import TeamCardTitle from './TeamCardTitle';
import LeagueTeamCardTitle from './LeagueTeamCardTitle';
import type { League } from '../../pages/clubs/ClubLeagueKickoff';

export type Side = 'left' | 'right';

type teamDetails = {
  team: UITeam;
  title?: string;
  competitionLogo?: string;
  side?: Side;
  competition?: string,
  league?: string,
  homeLeagueLogo?: string,
  awayLeagueLogo?: string,
  nextHomeLeague?: () => void,
  previousHomeLeague?: () => void,
  nextAwayLeague?: () => void,
  previousAwayLeague?: () => void,
  currentHomeLeague?: League,
  currentAwayLeague?: League,
  toggleLeague?: () => Promise<void>,
}

function TeamCard({ team, title, competitionLogo, side, competition, league, homeLeagueLogo, awayLeagueLogo, nextHomeLeague, previousHomeLeague, nextAwayLeague, previousAwayLeague, currentHomeLeague, currentAwayLeague, toggleLeague }: teamDetails){

  return(
    <div className="kickoff-team">
      {competition ? (<TeamCardTitle title={title} competitionLogo={competitionLogo} side={side} />) : league ? 
         <LeagueTeamCardTitle homeLeagueLogo={homeLeagueLogo} awayLeagueLogo={awayLeagueLogo} side={side}  nextHomeLeague={nextHomeLeague} previousHomeLeague={previousHomeLeague} nextAwayLeague={nextAwayLeague} previousAwayLeague={previousAwayLeague}  currentHomeLeague={currentHomeLeague} currentAwayLeague={currentAwayLeague} toggleLeague={toggleLeague} /> : (
        <div className="subtitle-div">
        <p className="kickoff-subtitle">{title}</p>
      </div>
      )}
   
      <div className="country-image-container">
        <img src={team.logo} className="country-image" alt="Club Logo" />
      </div>
      <div className="rating-container">
        <img src={starRatings[team.stars]} alt={team.stars.toString()} />
      </div>
      <div>
        <p className="country-name">
          {team.name}
        </p>
      </div>
    </div>
  )
}


//espanyol and juve logo, osnabruck,derby, swansea, osnabruck, charlton

export default TeamCard;