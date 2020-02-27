import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TempLogin from './components/TempLogin';
import Dashboard from './components/Dashboard/Dashboard';
import TicketManager from './components/Tickets/TicketManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={TempLogin} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/ticket-manager' component={TicketManager}/>
      </Switch>
    </div>
  );
}

export default App;
