const players = [
  {
    _id: '5b21ca3eeb7f6fbccd471816',
    firstName: 'John',
    lastName: 'Jacob',
    score: 96
  },
  {
    _id: '5b21ca3eeb7f6fbccd471817',
    firstName: 'Rob',
    lastName: 'Vera',
    score: 88
  },
  {
    _id: '5b21ca3eeb7f6fbccd471819',
    firstName: 'Tiger',
    lastName: 'Woods',
    score: 100
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181a',
    firstName: 'Wolfie',
    lastName: 'Nichols',
    score: 65
  },
  {
    _id: '5b21ca3eeb7f6fbccd471815',
    firstName: 'Alice',
    lastName: 'Geary',
    score: 96,
    publishDate: '2018-01-03T19:04:28.809Z'
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181b',
    firstName: 'Meg',
    lastName: 'Carroll',
    score: 45
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181e',
    firstName: 'Jack',
    lastName: 'Russell',
    score: 90
  },
  {
    _id: '5b21ca3eeb7f6fbccd47181f',
    firstName: 'Billy',
    lastName: 'Madison',
    score: 35
  },
  {
    _id: '5b21ca3eeb7f6fbccd471821',
    firstName: 'John',
    lastName: 'Daily',
    score: 94
  }
]

export function getPlayers () {
  return players
}

export function getPlayer (id) {
  return players.find(p => p._id === id)
}

export function savePlayer (player) {
  let playerInDb = players.find(p => p._id === player._id) || {}
  playerInDb.firstName = player.firstName
  playerInDb.lastName = player.lastName
  playerInDb.score = player.score

  if (!playerInDb._id) {
    playerInDb._id = Date.now().toString()
    players.push(playerInDb)
  }
  return playerInDb
}

export function deletePlayer (id) {
  let playerInDb = players.find(p => p._id === id)
  players.splice(players.indexOf(playerInDb), 1)
  return playerInDb
}
