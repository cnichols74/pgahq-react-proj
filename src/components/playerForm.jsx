import React from 'react'
import Joi from 'joi-browser'
import Form from './common/form'
import { getPlayer, savePlayer } from '../services/playerService'

class PlayerForm extends Form {
  state = {
    data: {
      firstName: '',
      lastName: '',
      score: ''
    },
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    firstName: Joi.string()
      .required()
      .label('First Name'),
    lastName: Joi.string()
      .required()
      .label('Last Name'),
    score: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Score')
  }

  componentDidMount () {
    const playerId = this.props.match.params.id
    if (playerId === 'new') return

    const player = getPlayer(playerId)
    if (!player) return this.props.history.replace('/not-found')

    this.setState({ data: this.mapToViewModel(player) })
  }

  mapToViewModel (player) {
    return {
      _id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      score: player.score
    }
  }

  doSubmit = () => {
    savePlayer(this.state.data)

    this.props.history.push('/players')
  }
  doCancel = () => {
    this.props.history.push('/players')
  }

  render () {
    return (
      <div>
        <h1>Player Form</h1>
        <form>
          {this.renderInput('firstName', 'FirstName')}
          {this.renderInput('lastName', 'Last Name')}
          {this.renderInput('score', 'Score', 'number')}
          {this.renderButton('Save')}
          {this.renderButton('Cancel',)}
        </form>
      </div>
    )
  }
}

export default PlayerForm
