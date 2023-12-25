import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    starredActive: false,
  }

  onChangeTitle = event => {
    const title = event.target.value
    this.setState({title})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {title, date} = this.state
    this.setState(prevState => {
      const {appointmentsList} = prevState
      if (prevState.title !== '' && prevState.date !== '') {
        const newObj = {
          id: uuidv4(),
          title,
          date,
          isStarred: false,
        }
        return {
          appointmentsList: [...appointmentsList, newObj],
          title: '',
          date: '',
        }
      }
      return {
        appointmentsList,
        title: '',
        date: '',
      }
    })
  }

  onClickStarred = () => {
    this.setState(prevState => ({
      starredActive: !prevState.starredActive,
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachObj => {
        if (id === eachObj.id) {
          return {...eachObj, isStarred: !eachObj.isStarred}
        }
        return eachObj
      }),
    }))
  }

  render() {
    const {title, date, appointmentsList, starredActive} = this.state
    const starredClassName = starredActive ? 'active-starred' : ''
    const filteredAppointmentsList = starredActive
      ? appointmentsList.filter(eachObj => eachObj.isStarred === true)
      : appointmentsList
    return (
      <div className="bg-container">
        <div className="card">
          <div className="card-1">
            <form className="input-card" onSubmit={this.onClickAdd}>
              <h1 className="heading">Add Appointment</h1>
              <label className="label-text" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input-box"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <label className="label-text" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input-box"
                value={date}
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img-card"
            />
          </div>
          <div className="card-2">
            <div className="appointments-starred-cont">
              <h2 className="heading2">Appointments</h2>
              <button
                type="button"
                className={`starred-btn ${starredClassName}`}
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="list-of-appointments">
              {filteredAppointmentsList.map(eachObj => (
                <AppointmentItem
                  key={eachObj.id}
                  appointmentObj={eachObj}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
