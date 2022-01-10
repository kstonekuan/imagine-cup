import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';

const Products = withRouter(lazy(() => import('./products/Products')));
const Mentors = withRouter(lazy(() => import('./mentors/Mentors')));
const Mentees = withRouter(lazy(() => import('./mentees/Mentees')));
const Profile = withRouter(lazy(() => import('./profile/Profile')));
const Home = withRouter(lazy(() => import('./home/Home')));
const Requests = withRouter(lazy(() => import('./requests/Requests')));
const Sessions = withRouter(lazy(() => import('./sessions/Sessions')));

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
          <NavBar userInfo={this.state.userInfo} />
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/home" />
                <Route path="/products" component={Products} />
                <Route path="/about" component={About} />
                <Route path="/mentors" component={() => (<Mentors userInfo={this.state.userInfo} />)} />
                <Route path="/mentees" component={() => (<Mentees userInfo={this.state.userInfo} />)} />
                <Route path="/home" component={() => (<Home userInfo={this.state.userInfo} />)} />
                <Route path="/profile" component={() => (<Profile userInfo={this.state.userInfo} />)} />
                <Route path="/requests" component={() => (<Requests userInfo={this.state.userInfo} />)} />
                <Route path="/sessions" component={() => (<Sessions userInfo={this.state.userInfo} />)} />
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
