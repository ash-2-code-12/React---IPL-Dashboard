import './index.css'

const MatchCard = props => {
  const {matchObj, selectDisplayMatch} = props
  // prettier-ignore
  const {id, result, competingTeam, competingTeamLogo, matchStatus} = matchObj
  const onSelectMatch = () => {
    console.log('match card func')
    selectDisplayMatch(id)
  }

  return (
    <li className="match-card-section" type="button" onClick={onSelectMatch}>
      <div className="mc-logo-box">
        <img
          className="mc-team-logo"
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
        />
      </div>
      <p className="mc-team-name">{competingTeam}</p>
      <p className="mc-result">{result}</p>
      <p className={`mc-status ${matchStatus.toLowerCase()}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
