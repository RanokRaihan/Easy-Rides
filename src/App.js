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

function App() {

  return (
    <Router>
      <div className='main'>
        <div className="container">
          <Header></Header>
          <Switch>
            <Route path='/home'>
              <div class="grid-container">
                {
                  fakeData.map(data => <Home fakeData={data}></Home>)
                }
              </div>
            </Route>
            <Route exact path='/'>
              <div class="grid-container">
                {
                  fakeData.map(data => <Home fakeData={data}></Home>)
                }
              </div>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/destination'>
              <Destination></Destination>
            </Route>
          </Switch>

        </div>
      </div>

    </Router>

  );
}

export default App;
