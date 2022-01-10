import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';
import Mentees from './mentees/Mentees';
import Home from './home/Home';
import Profile from './profile/Profile';
import Requests from './requests/Requests';
import Sessions from './sessions/Sessions';

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products'))
);

const Mentors = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './mentors/Mentors'))
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: undefined
    }
  };

  componentDidMount() {
    (async () => {
      this.setState({ userInfo: await this.getUserInfo()});
    })();
  }

  componentDidUpdate() {
    (async () => {
      this.setState({ userInfo: await this.getUserInfo()});
    })();
  }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  render() {
    return (
      <div>
        <HeaderBar />
        <div className="section columns">
          <NavBar userInfo={this.userInfo} />
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
