import React from 'react';
import UserList from './components/UserList';
import UserAddForm from './components/UserAddForm';
import './App.css';
import PostList from './components/PostList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      background: '#FDF5E6',
      textColor: 'black',
      users: [],
      posts: [],
      showUsers: true,
      showPosts: false,
      isNameValid: true,
      isEmailValid: true
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.filter(user => user.id < 4);
        data.forEach(user => {
          user.isGoldClient = false;
          user.salary = user.id * 1000; 
          user.imgUrl = "http://via.placeholder.com/200x20" + user.id;
        });
        this.setState({users: data});
      });

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        data = data.filter(post => post.id < 4);
        this.setState({posts: data});
      });
  }

  changeColor(event) {
    this.setState({background: event.target.value});
  }

  changeTextColor(event) {
    this.setState({textColor: event.target.value});
  }

  toggleShowUsers() {
    this.setState({showUsers: !this.state.showUsers});
  }

  toggleShowPosts() {
    this.setState({showPosts: !this.state.showPosts});
  }

  getMaxId(users) {
    let maxId = 0;

    users.forEach(user => {
      if (user.id > maxId) {
        maxId = user.id;
      }
    });

    return maxId;
  }

  submitAddForm(event, name, email, isGoldClient) {
    event.preventDefault();

    let isNameValid = Boolean(name);

    let emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isEmailValid = emailValidationRegex.test(email);

    if (!isNameValid || !isEmailValid) {
      this.setState({
          isNameValid: isNameValid,
          isEmailValid: isEmailValid
        });
      return;
    }

    this.setState(prevState => {
      return {
        users: [
          ...prevState.users,
          {
            id: this.getMaxId(prevState.users) + 1,
            name,
            email,
            isGoldClient,
            imgUrl: "http://via.placeholder.com/200x180"
          }
        ]
      }
    });
  }

  deleteUser(id) {
    let newUsers = this.state.users.filter((user) => user.id !== id)
    this.setState({users: newUsers});
  }

  render() {
    return(
      <div className="app" style={{background: this.state.background, color: this.state.textColor}}>
        <h1 className='projectName'>Admin panel - Proiectul 1</h1>

        <UserAddForm submitAddForm={(event, name, email, isGoldClient) => this.submitAddForm(event, name, email, isGoldClient)}/>
        { !this.state.isNameValid
            ? <p>Name cannot be empty</p>
            : null
        }
        { !this.state.isEmailValid
            ? <p>Email is invalid</p>
            : null
        }

        <br/>
        <button onClick={this.toggleShowUsers.bind(this)}>Afiseaza useri</button>
        <button onClick={this.toggleShowPosts.bind(this)}>Afiseaza postari</button>

        { this.state.showUsers
            ? <UserList users={this.state.users} deleteUser={(event, id) => this.deleteUser(id)}/>
            : null
        }
        { this.state.showPosts
            ? <PostList posts={this.state.posts}/>
            : null
        }

        <h3>Culoare text:</h3>
        <input type="color" onChange={(event) => this.changeTextColor(event)}/>

        <h3>Culoare background:</h3>
        <input type="color" onChange={(event) => this.changeColor(event)}/>
      </div>
    );
  }
}

export default App;
