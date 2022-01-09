import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';
import Mentors from './mentors/Mentors';
import Mentees from './mentees/Mentees';
import Home from './home/Home';
import Profile from './profile/Profile';
import Requests from './requests/Requests';
import Sessions from './sessions/Sessions';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products'))
);

class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar />
        <div className="section columns">
          <NavBar />
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/products" />
                <Route path="/products" component={Products} />
                <Route path="/about" component={About} />
                <Route path="/mentors" component={Mentors} />
                <Route path="/mentees" component={Mentees} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/requests" component={Requests} />
                <Route path="/sessions" component={Sessions} />
                <Route exact path="**" component={NotFound} />
              </Switch>
            </Suspense>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
