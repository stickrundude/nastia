import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Message from './pages/Message';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>Happy Birthday!</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/message">Message</a></li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/message" component={Message} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
