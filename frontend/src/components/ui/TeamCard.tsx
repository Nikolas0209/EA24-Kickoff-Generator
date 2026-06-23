import './TeamCard.css';
import { starRatings } from '../../data/starRatings';
import type { Team } from '../../types/team.type';

type teamDetails = {
  team: Team
}

function TeamCard({ team }: teamDetails){

  return(
    <div className="kickoff-team">
      <div className="subtitle-div">
        <p className="kickoff-subtitle">INTERNATIONALS</p>
      </div>
      <div className="country-image-container">
        <img src={team.logo} className="country-image" alt="Club Logo" />
      </div>
      <div className="rating-container">
        <img src={starRatings[team.stars]} alt={team.stars.toString()} />
      </div>
      <div>
        <p className="country-name">
          {team.country}
        </p>
      </div>
    </div>
  )
}

export default TeamCard;