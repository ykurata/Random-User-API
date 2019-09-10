import React, { Component } from 'react';
import axios from 'axios';

import UserList from './components/UserList'


class App extends Component {
  constructor(){
    super();
    this.state ={
      users: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get('https://randomuser.me/api/?results=36&nat=CA')
      .then(response => {
        this.setState({
          users: response.data.results,
          loading: false
        })
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Users List</h1>
        <UserList data={this.state.users} />
      </div>
    )
  }
}

export default App;
