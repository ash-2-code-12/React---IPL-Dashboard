import './index.css'

const LatestMatch = props => {
  const {matchObj} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    // id,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    // matchStatus,
  } = matchObj

  return (
    <div className="latest-match-section">
      <div className="lms-first-section">
        <p className="lms-team-name">{competingTeam}</p>
        <p className="lms-match-date">{date}</p>
        <p className="lms-venue">{venue}</p>
        <p className="lms-result">{result}</p>
      </div>
      <img
        className="lms-team-logo"
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
      />
      <hr className="lms-rule" />
      <div className="lms-second-section">
        <p className="lms-info-label">First Innings</p>
        <p className="lms-info">{firstInnings}</p>
        <p className="lms-info-label">Second Innings</p>
        <p className="lms-info">{secondInnings}</p>
        <p className="lms-info-label">Man Of The Match</p>
        <p className="lms-info">{manOfTheMatch}</p>
        <p className="lms-info-label">Umpires</p>
        <p className="lms-info">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
