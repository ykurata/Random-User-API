import React, { Component } from 'react';

import User from './User';


class UserList extends Component {
  constructor() {
    super();
    this.state = {
      searchText : '',
      currentPage : 1,
      usersPerPage: 9,
      isDesc: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Handle search input
  onSearchChange = e => {
    this.setState({
      searchText : e.target.value
    });
  }


 // Handle pagination
  handleClick = e => {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }

  // Handle toggle swith
  handleToggle = e => {
		this.setState({
      isDesc: !this.state.isDesc
    });
	}

  render() {
    const { currentPage, usersPerPage, isDesc } = this.state;
    let users;

    // Logic for displaying users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    if (isDesc === false) {

      // Sort users by ascending order by registered date
      const asc = this.props.data.sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date));

      const filteredAscUser = asc.filter(
        (user) => {
          let name = user.name.first.toLowerCase() + user.name.last.toLowerCase();
          return name.indexOf(this.state.searchText.toLowerCase()) !== -1;
        }
      );

      const currentAscUsers = filteredAscUser.slice(indexOfFirstUser, indexOfLastUser);

      users = currentAscUsers.map((user, index) =>
        <User
          key={index}
          id={user.id}
          firstName={user.name.first}
          lastName={user.name.last}
          email={user.email}
          phone={user.phone}
          image={user.picture.large}
          date={user.registered.date}
        />
      );
    } else {

      // Sort users by descending order by registered date
      const desc = this.props.data.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));

      const filteredDescUser = desc.filter(
        (user) => {
          let name = user.name.first.toLowerCase() + user.name.last.toLowerCase();
          return name.indexOf(this.state.searchText.toLowerCase()) !== -1;
        }
      );

      const currentDescUsers = filteredDescUser.slice(indexOfFirstUser, indexOfLastUser);

      users = currentDescUsers.map((user, index) =>
        <User
          key={index}
          id={user.id}
          firstName={user.name.first}
          lastName={user.name.last}
          email={user.email}
          phone={user.phone}
          image={user.picture.large}
          date={user.registered.date}
        />
      );
    }

    // Loop through page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.data.length / this.state.usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <div className="pagination">
          <button key={number} id={number} onClick={this.handleClick}>
            {number}
          </button>
        </div>
      );
    });

    return (
      <div>
        <div className="search">
          <input
              type="text"
              id="search"
              ref={(input) => this.query = input}
              value={this.state.searchText}
              onChange={this.onSearchChange}
              placeholder="Search by user's name"
          />
        </div>
        <div className="toggle">
          <label className="switch">
            <input
              type="checkbox"
              id="togBtn"
              onClick={this.handleToggle}
             />
              <div className="slider round">
                <span className="asc">Asc</span>
                <span className="desc">Desc</span>
              </div>
          </label>
        </div>
        <ul>
          {users}
        </ul>
        {renderPageNumbers}
      </div>

    );
  }
}

export default UserList;
