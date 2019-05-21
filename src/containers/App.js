import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Video from '../components/Video';
import UserProfile from '../components/UserProfile';


const App = () => (
<div style={{marginTop:'80px', marginBottom:'80px'}} className='container'>
  <Router>
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/videos/:videoId' component={Video} />  
          <Route path='/users/:userId' component={UserProfile} />
          <Route render={() => <h1>Four oh Four.</h1>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;