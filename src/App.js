import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'
import OptionItem from './optionItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here
class App extends Component {
  state = {
    projectsList: [],
    category: categoriesList[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const options = {
      method: 'GET',
    }
    const {category} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/ps/projects?category=${category}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const filteredData = data.projects.map(project => ({
        id: project.id,
        name: project.name,
        imageUrl: project.image_url,
      }))
      this.setState({
        projectsList: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  renderSuccessView = () => {
    const {projectsList} = this.state
    return (
      <ul>
        {projectsList.map(project => (
          <li key={project.id}>
            <img src={project.imageUrl} alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  retryBtn = () => {
    this.getProjects()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.retryBtn}>
        Retry
      </button>
    </div>
  )

  renderData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoading()

      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  onChangeCategory = id => {
    this.setState({category: id})
  }

  render() {
    const {projectsList, loading, category} = this.state
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
          alt="website logo"
        />
        <select value={category}>
          {categoriesList.map(categoryChoosen => (
            <OptionItem details={categoryChoosen} key={categoryChoosen.id} />
          ))}
        </select>
        {this.renderData()}
      </div>
    )
  }
}

export default App
