import './TeamCard.css';
import { starRatings } from '../../../utils/starRatings';
import type { UITeam } from '../../../types/uiTeam.types';
import TeamCardTitle from './TeamCardTitle';
import LeagueTeamCardTitle from './LeagueTeamCardTitle';
import type { LeagueSwitcher } from '../../../types/clubTypes/leagueNavigation.type';
import type { KickoffTeamPosition } from '../../../types/clubTypes/KickoffTeamPosition.type';

type teamDetailsProps = {
  team: UITeam,
  title?: string,
  competitionLogo?: string,
  position?: KickoffTeamPosition,
  competition?: string,
  league?: string,
  leagueSwitcher?: LeagueSwitcher
}

function TeamCard({ team, title, competitionLogo, position, competition, league, leagueSwitcher }: teamDetailsProps){

  return(
    <div className="kickoff-team">
      {competition ? (<TeamCardTitle title={title} competitionLogo={competitionLogo} position={position} />) :
        league ? <LeagueTeamCardTitle position={position} leagueSwitcher={leagueSwitcher} /> : (
        <div className="subtitle-div">
         <p className="kickoff-subtitle">{title}</p>
       </div>
      )}
   
      <div className="country-image-container">
        <img src={team.logo} className="country-image" alt={`${team.name} logo`} />
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

export default TeamCard;