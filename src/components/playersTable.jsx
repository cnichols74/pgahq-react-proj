import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Table from './common/table'

class PlayersTable extends Component {
  columns = [
    {
      path: 'lastName',
      label: 'Name',
      content: player => <Link to={`/players/${player._id}`}>{player.lastName + ', ' + player.firstName}</Link>
    },
    { path: 'score', label: 'Score' },
    {
      key: 'delete',
      content: player => (
        <button
          onClick={() => this.props.onDelete(player)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ]

  render () {
    const { players, onSort, sortColumn } = this.props

    return (
      <Table
        columns={this.columns}
        data={players}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    )
  }
}

export default PlayersTable
