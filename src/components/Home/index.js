import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsList: [],
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const teamsList = data.teams
    const formattedTeamsList = teamsList.map(each => ({
      name: each.name,
      id: each.id,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({
      isLoading: false,
      teamsList: formattedTeamsList,
    })
  }

  renderHome = () => {
    const {teamsList} = this.state

    return (
      <>
        <div className="heading-container">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>
        <ul className="ipl-teams-list">
          {teamsList.map(each => (
            <TeamCard key={each.id} teamObj={each} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-section">
        {isLoading ? (
          <div className="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderHome()
        )}
      </div>
    )
  }
}

export default Home
