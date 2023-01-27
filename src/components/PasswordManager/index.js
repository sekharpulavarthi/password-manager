import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: true,
  }

  onAddPasswordItem = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const initialBackgroundColorClassName = `first-letter-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const passwordItem = {
      id: uuidv4(),
      websiteInput,
      usernameInput,
      passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, passwordItem],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSelectCheckbox = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  deletePassword = passwordId => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        passwordItem => passwordItem.id !== passwordId,
      ),
    })
  }

  getSearchedPasswords = () => {
    const {passwordsList, searchInput} = this.state
    const searchResults = passwordsList.filter(password =>
      password.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  renderForm = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state

    return (
      <form className="form" onSubmit={this.onAddPasswordItem}>
        <h1 className="heading">Add New Password</h1>
        <div className="input-element-container">
          <div className="input-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-logo"
            />
          </div>
          <input
            type="text"
            value={websiteInput}
            onChange={this.onChangeWebsiteInput}
            placeholder="Enter Website"
            className="input-element"
          />
        </div>
        <div className="input-element-container">
          <div className="input-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-logo"
            />
          </div>
          <input
            type="text"
            value={usernameInput}
            onChange={this.onChangeUsernameInput}
            placeholder="Enter Username"
            className="input-element"
          />
        </div>
        <div className="input-element-container">
          <div className="input-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-logo"
            />
          </div>
          <input
            type="password"
            value={passwordInput}
            onChange={this.onChangePasswordInput}
            placeholder="Enter Password"
            className="input-element"
          />
        </div>
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
    )
  }

  renderNavbar = () => {
    const {passwordsList, searchInput, showPasswords} = this.state
    const searchedPasswords = this.getSearchedPasswords()
    const noPasswords = searchedPasswords.length === 0
    return (
      <div className="list-of-passwords-container">
        <div className="nav-bar-container">
          <p className="your-passwords-text">
            Your Passwords{' '}
            <span className="password-length">{passwordsList.length}</span>
          </p>
          <div className="search-input-container">
            <div className="search-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
            </div>
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              value={searchInput}
              className="search-input"
              placeholder="Search"
            />
          </div>
        </div>
        <hr />
        <div className="show-passwords-container">
          <input
            type="checkbox"
            onChange={this.onSelectCheckbox}
            value={this.showPasswords}
            className="checkbox-element"
            id="showPasswords"
          />
          <label htmlFor="showPasswords" className="show-passwords-label">
            Show Passwords
          </label>
        </div>
        {noPasswords ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords-view"
          />
        ) : (
          <div className="password-items-container">
            {searchedPasswords.map(passwordItem => (
              <PasswordItem
                key={passwordItem.id}
                passwordDetails={passwordItem}
                showPasswords={showPasswords}
                deletePassword={this.deletePassword}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="password-manager-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="password-manager-logo"
          alt="app logo"
        />
        <div className="password-manager-sub-container">
          <>{this.renderForm()}</>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        {this.renderNavbar()}
      </div>
    )
  }
}

export default PasswordManager
