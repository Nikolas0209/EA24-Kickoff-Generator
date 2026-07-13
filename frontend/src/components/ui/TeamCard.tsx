import './TeamCard.css';
import { starRatings } from '../../data/starRatings';
import type { UITeam } from '../../types/uiTeam.types';
import TeamCardTitle from './TeamCardTitle';

export type Side = 'left' | 'right';

type teamDetails = {
  team: UITeam;
  title: string;
  competitionLogo?: string;
  side?: Side;
  competition?: string
}

function TeamCard({ team, title, competitionLogo, side, competition }: teamDetails){

  return(
    <div className="kickoff-team">
      {competition ? (<TeamCardTitle title={title} competitionLogo={competitionLogo} side={side}/>) : (
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


//espanyol and juve logo, osnabruck,derby, swansea

export default TeamCard;