import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Nav from './components/Nav';

import './sass/main.scss';

import Accommodations from './pages/Accommodations';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Login from './pages/Login';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Router>
          <Nav></Nav>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/accommodations' component={Accommodations} />
            <Route path='/detail/:id' component={Detail} />
            <Route path='/contact' component={Contact} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/add' component={Add} />
            <Route path='/edit/:id' component={Edit} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
