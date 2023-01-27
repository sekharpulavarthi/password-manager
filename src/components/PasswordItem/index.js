import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPasswords, deletePassword} = props
  const {
    websiteInput,
    usernameInput,
    passwordInput,
    initialClassName,
    id,
  } = passwordDetails
  const firstLetter = websiteInput[0]

  const deletePasswordItem = () => {
    deletePassword(id)
  }

  return (
    <div className="password-item-container">
      <div className="password-item-sub-container">
        <div className={initialClassName}>
          <p className="first-letter">{firstLetter}</p>
        </div>
        <div className="w-u-p-container">
          <p className="website-input">{websiteInput}</p>
          <p className="username-input">{usernameInput}</p>
          {showPasswords ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          ) : (
            <p className="password-input">{passwordInput}</p>
          )}
        </div>
      </div>
      <button className="button" onClick={deletePasswordItem} type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </div>
  )
}

export default PasswordItem
