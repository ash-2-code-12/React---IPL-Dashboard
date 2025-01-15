import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamObj} = props
  const {id, name, teamImageUrl} = teamObj

  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-card">
        <img className="card-team-logo" src={teamImageUrl} alt={name} />
        <p className="card-team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
