import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {
      teamBannerUrl: '',
      latestMatchDetails: {},
      recentMatches: [],
    },
    currentTeamId: '',
    matchOnDisplay: {},
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  formatMatchToCamelCase = matchObj => ({
    umpires: matchObj.umpires,
    result: matchObj.result,
    manOfTheMatch: matchObj.man_of_the_match,
    id: matchObj.id,
    date: matchObj.date,
    venue: matchObj.venue,
    competingTeam: matchObj.competing_team,
    competingTeamLogo: matchObj.competing_team_logo,
    firstInnings: matchObj.first_innings,
    secondInnings: matchObj.second_innings,
    matchStatus: matchObj.match_status,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const lmds = this.formatMatchToCamelCase(data.latest_match_details)
    // prettier ignore
    const rms = data.recent_matches.map(each =>
      this.formatMatchToCamelCase(each),
    )
    this.setState({
      isLoading: false,
      teamMatchesData: {
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails: lmds,
        recentMatches: rms,
      },
      currentTeamId: id,
      matchOnDisplay: lmds,
    })
  }

  selectDisplayMatch = id => {
    console.log('parent card func')
    const {matchOnDisplay, teamMatchesData} = this.state
    if (matchOnDisplay.id === id) return
    const {latestMatchDetails, recentMatches} = teamMatchesData
    if (latestMatchDetails.id === id) {
      this.setState({matchOnDisplay: latestMatchDetails})
      return
    }
    const newDisplayMatch =
      id === latestMatchDetails.id
        ? latestMatchDetails
        : recentMatches.find(match => match.id === id)

    if (newDisplayMatch) {
      this.setState({matchOnDisplay: newDisplayMatch})
    }
  }

  renderTeamMatchesPage = () => {
    const {teamMatchesData, matchOnDisplay} = this.state
    // prettier-ignore
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData

    return (
      <>
        <img src={teamBannerUrl} className="team-banner" alt="team banner" />
        <h3 className="latest-match-heading">Latest Matches</h3>
        <LatestMatch matchObj={matchOnDisplay} />
        <ul className="recent-matches-list">
          <MatchCard
            matchObj={latestMatchDetails}
            selectDisplayMatch={this.selectDisplayMatch}
          />
          {recentMatches.map(matchObj => (
            <MatchCard
              key={matchObj.id}
              matchObj={matchObj}
              selectDisplayMatch={this.selectDisplayMatch}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading, currentTeamId} = this.state

    return (
      <div
        className={`team-matches-section ${currentTeamId.toLocaleLowerCase()}`}
      >
        {isLoading ? (
          <div className="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatchesPage()
        )}
      </div>
    )
  }
}

export default TeamMatches
