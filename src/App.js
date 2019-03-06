import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Players from './components/players'
import PlayerForm from './components/playerForm'
import NotFound from './components/notFound'
import './App.css'

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <main className="container">
          <Switch>
            <Route path="/players/:id" component={PlayerForm}/>
            <Route path="/players" exact component={Players}/>
            <Route path="/not-found" component={NotFound}/>
            <Redirect from="/" exact to="/players"/>
            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

export default App
