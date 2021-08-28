import LoginPage from './components/loginPage'
import RegisterPage from './components/registerPage'
import MainPage from './components/mainPage';
import NetworkPage from './components/networkPage';
import UserDetailPage from './components/userDetailPage';

import Navibar from './components/nav';

import { BrowserRouter as Router, Switch,Route} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store'


function App() {

  return (

    // 로그인하지 않은 유저는 Nav가 보이지 않도록 하고싶었지만 .. 
    
    <Router>
      <Provider store={store}>
        <Navibar />
          <Switch> 
            <Route exact path='/'>
              <LoginPage />
            </Route>
            <Route path='/register'>
              <RegisterPage />
            </Route>
            <Route path='/main'>
              <MainPage />
            </Route>
            <Route path='/network'>
              <NetworkPage />
            </Route>
            <Route path='/userDetail'>
              <UserDetailPage />
            </Route>
          </Switch>
      </Provider>
    </Router>
  );
}

export default App;
