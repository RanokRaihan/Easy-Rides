import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import fakeData from './fakeData/fakeData.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import { createContext } from 'react';
import { useState } from 'react';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';

//context api
export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    userName: '',
    email: '',
    picture: ''
  })
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div className='main'>
          <div className="container">
            <Header></Header>
            <Switch>
              <Route path='/home'>
                <div className="grid-container">
                  {
                    fakeData.map(data => <Home fakeData={data} key={Math.random().toString(36).substr(2, 9)}></Home>)
                  }
                </div>
              </Route>
              <Route exact path='/'>
                <div className="grid-container">
                  {
                    fakeData.map(data => {
                      return (
                        <Link style={{ textDecoration: 'none' }} to={`/destination/${data.id}`}>
                          <Home fakeData={data} key={Math.random().toString(36).substr(2, 9)}></Home>
                        </Link>

                      )
                    })
                  }
                </div>
              </Route>
              <Route path='/login'>
                <Login></Login>
              </Route>
              <PrivetRoute path='/destination/:id'>
                <Destination></Destination>
              </PrivetRoute>

            </Switch>

          </div>
        </div>

      </Router>
    </userContext.Provider>
  );
}

export default App;
