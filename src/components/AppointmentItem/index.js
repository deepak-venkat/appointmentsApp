import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentObj, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentObj
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starSrc = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickToggle = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-item">
      <div className="heading3-star-cont">
        <p className="heading-3">{title}</p>
        <button type="button" className="star-btn" data-testid="star">
          <img src={starSrc} alt="star" onClick={onClickToggle} />
        </button>
      </div>
      <p className="date">Date: {formattedDate} </p>
    </li>
  )
}

export default AppointmentItem
