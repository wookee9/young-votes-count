/* eslint-disable class-methods-use-this, no-console, react/sort-comp */
/* global window, fetch */
import React, { Component } from 'react';

class Root extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.renderVote = this.renderVote.bind(this);

    this.createVoter = this.createVoter.bind(this);
    this.getVoter = this.getVoter.bind(this);

    this.state = {
      date: new Date().toString(),
      id: undefined,
      token: undefined,
      loggedIn: false,
      voteStatus: undefined,
    };

    this.endpoint = 'https://ocw13iuw26.execute-api.us-east-1.amazonaws.com/dev';

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1684125768307809',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: false, // parse social plugins on this page
        version: 'v2.12', // use graph api version 2.8
      });

      window.FB.getLoginStatus(this.statusChangeCallback);
    };
  }

  componentWillMount() {
    // window.FB.getLoginStatus(this.statusChangeCallback);
  }

  componentDidMount() {
    // window.FB.getLoginStatus((response) => {
    //   this.statusChangeCallback(response);
    // });
  }

  logout() {
    window.FB.logout((response) => {
      // Person is now logged out
      console.log('logout');
      console.log(response);
      this.setState({
        id: undefined,
        name: undefined,
        birthday: undefined,
        token: undefined,
        loggedIn: false,
        voteStatus: undefined,
      });
    });
  }

  login() {
    window.FB.login(
      this.statusChangeCallback,
      { scope: 'public_profile,user_birthday,user_hometown,user_location' },
    );
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log('Logged into your app and Facebook.');
      // this.testAPI();
      this.setState({
        token: response.authResponse.accessToken,
        id: response.authResponse.userID,
        loggedIn: true,
      });
    } else {
      // The person is not logged into your app or we are unable to tell.
      // document.getElementById('status').innerHTML = 'Please log into this app.';
      console.log('Please log into this app.');
    }
  }

  checkLoginState() {
    window.FB.getLoginStatus(this.statusChangeCallback);
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    window.FB.api('/me?fields=id,name,birthday', (response) => {
      console.log(`Successful login for: ${response.name}`);
      console.log(response);
      this.setState({
        birthday: response.birthday,
        name: response.name,
      })
    });
  }

  submitVote() {
    this.setState({ voteStatus: 'Submitting vote...' });

    const url = `${this.endpoint}/vote`;
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
      },
      mode: 'cors',
      body: JSON.stringify({
        id: this.state.id,
        token: this.state.token,
        vote: 'remain',
      }),
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *omit
    };

    fetch(url, config)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(res);
        return res.json();
      })
      // console.error(res);
      // this.setState({ voteStatus: 'Something went wrong.' });
      // return undefined;
      .then((res) => {
        console.log(res);
        this.setState({ voteStatus: 'Vote submitted. Thank you!' });
      })
      .catch((err) => {
        this.setState({ voteStatus: 'Something went wrong.' });
        console.error(err);
      });
  }

  createVoter() {
    this.setState({ voteStatus: 'Creating voter...' });

    const url = `${this.endpoint}/voters`;
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        birthday: this.state.birthday,
        // token: this.state.token,
        // vote: 'remain',
      }),
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *omit
    };

    fetch(url, config)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({ voteStatus: 'Voter created. Thank you!' });
      })
      .catch((err) => {
        this.setState({ voteStatus: 'Something went wrong.' });
        console.error(err);
      });
  }

  getVoter() {
    this.setState({ voteStatus: 'Getting voter...' });
    const url = `${this.endpoint}/voters/${this.state.id}`;
    const config = {
      mode: 'cors',
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *omit
    };

    fetch(url, config)
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.setState({ voteStatus: 'Voter retreived!' });
      })
      .catch((err) => {
        this.setState({ voteStatus: 'Something went wrong.' });
        console.error(err);
      });
  }


  renderVote() {
    if (!this.state.loggedIn) return null;

    return (
      <div>
        <p>Logged in as: {this.state.id}</p>
        <p><button onClick={this.submitVote}>Vote!</button></p>
        <br />
        <p><button onClick={this.createVoter}>Create Voter</button></p>
        <p><button onClick={this.getVoter}>Get Voter</button></p>
      </div>
    );
  }

  renderVoteStatus() {
    if (!this.state.loggedIn) return null;

    return <p>Vote submission status: {this.state.voteStatus}</p>;
  }

  render() {
    return (
      <div>
        <h1>Young Votes Count.</h1>
        <p>{this.state.date}</p>
        <p><button onClick={this.login}>Login</button></p>
        <p><button onClick={this.logout}>Logout</button></p>
        { this.renderVote() }
        { this.renderVoteStatus() }
        <p><button onClick={this.testAPI}>Get FB profile data</button></p>
      </div>
    );
  }
}

export default Root;
