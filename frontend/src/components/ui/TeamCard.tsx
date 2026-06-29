import './TeamCard.css';
import { starRatings } from '../../data/starRatings';
import type { UITeam } from '../../data/createKickoffUI';

type teamDetails = {
  team: UITeam;
  title: string
}

function TeamCard({ team, title }: teamDetails){

  return(
    <div className="kickoff-team">
      <div className="subtitle-div">
        <p className="kickoff-subtitle">{title}</p>
      </div>
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

export default TeamCard;