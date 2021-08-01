
import './App.css';
import { Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Login from './components/userinfo/UserLogin';
import SignUp from './components/userinfo/UserSignup';
import Home from './components/userinfo/Home';
import Profile from './components/userinfo/UserProfile';
import AuthService from "./components/userinfo/services/auth.service";



function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="App">
       
       {currentUser ? (
                  <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/user/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
            <main>
            <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/profile" component={Profile} />  
            </main>
          </div>
        )}
      
    </div>
  );
}

export default App;