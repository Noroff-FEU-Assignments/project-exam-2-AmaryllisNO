import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';

import './sass/main.scss';

import Accommodations from './pages/Accommodations';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div className='App'>
      <Router>
        <Nav></Nav>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/accommodations' component={Accommodations} />
          <Route path='/detail' component={Detail} />
          <Route path='/contact' component={Contact} />
          <Route path='/login' component={Login} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
