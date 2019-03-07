import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PlayersTable from './playersTable'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'
import { getPlayers, deletePlayer } from '../services/playerService'
import SearchBox from './searchBox'
import _ from 'lodash'

class Players extends Component {
  state = {
    players: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    sortColumn: { path: ['score', 'lastName'], order: ['desc', 'asc'] }
  }

  componentDidMount () {
    this.setState({ players: getPlayers() })
  }

  handleDelete = player => {
    const players = this.state.players.filter(p => p._id !== player._id)
    this.setState({ players })

    deletePlayer(player._id)
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 })
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      players: allPlayers
    } = this.state

    let filtered = allPlayers
    if (searchQuery)
      filtered = allPlayers.filter(p =>
        p.lastName.toLowerCase().startsWith(searchQuery.toLowerCase())
      )

    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order)

    const players = paginate(sorted, currentPage, pageSize)

    return { playerPerPageCount: players.length, data: players }
  }

  render () {
    const { length: totalCount } = this.state.players
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state

    if (totalCount === 0) return <p>There are no players in the database.</p>

    const { playerPerPageCount, data: players } = this.getPagedData()

    return (
      <div className="row">
        <div className="col-md-12">
          <Link
            to="/players/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Player
          </Link>
          <p>Showing {playerPerPageCount} of {totalCount} players</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch}/>
          <PlayersTable
            players={players}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Players
