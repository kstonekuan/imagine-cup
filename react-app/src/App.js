import React, { Component, lazy, Suspense } from 'react';
import 'bulma/css/bulma.css';
import './styles.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { HeaderBar, NavBar, NotFound } from './components';
import About from './About';
import { getProfile, updateProfile } from './profile/ProfileApi';
import { getMentors, addMentor, removeMentor } from './mentors/MentorsApi';
import { getMentees, addMentee, removeMentee } from './mentors/MenteesApi';

const Products = withRouter(lazy(() => import('./products/Products')));
const Mentors = withRouter(lazy(() => import('./mentors/Mentors')));
const Profile = withRouter(lazy(() => import('./profile/Profile')));
const Home = withRouter(lazy(() => import('./home/Home')));
const Requests = withRouter(lazy(() => import('./requests/Requests')));
const Sessions = withRouter(lazy(() => import('./sessions/Sessions')));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: undefined,
      hasError: false
    }

    this.handleSaveProfile = this.handleSaveProfile.bind(this);
  };

  async componentDidMount() {
    this.setState({ profile: await getProfile() });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(info);
  }

  async handleSaveProfile(profile) {
    const res = await updateProfile(profile);
    if (!res) {
      this.setState({ hasError: true });
    }
    else {
      this.setState({ profile: res });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div>
        <HeaderBar />
        <div className="section columns">
          <NavBar profile={this.state.profile} />
          <main className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Redirect from="/" exact to="/home" />
                <Route path="/home" component={() => (<Home profile={this.state.profile} />)} />
                <Route path="/about" component={About} />
                <Route path="/products" component={Products} />

                <Route path="/profile" component={() => (<Profile profile={this.state.profile} handleSaveProfile={this.handleSaveProfile} />)} />
                <Route
                  path="/mentors" 
                  component={() => (
                    <Mentors 
                      profile={this.state.profile}
                      title="Mentors"
                      connectionType="mentor"
                      getMentors={getMentors}
                      addMentor={addMentor}
                      removeMentor={removeMentor}
                    />
                  )}
                />
                <Route
                  path="/mentees" 
                  component={() => (
                    <Mentors 
                      profile={this.state.profile}
                      title="Mentees"
                      connectionType="mentee"
                      getMentors={getMentees}
                      addMentor={addMentee}
                      removeMentor={removeMentee}
                    />
                  )}
                />
                <Route path="/requests" component={() => (<Requests profile={this.state.profile} />)} />
                <Route path="/sessions" component={() => (<Sessions profile={this.state.profile} />)} />

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
