import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter/Counter';
import { CounterFunction } from './components/Counter/CounterFunction';
import Header from './components/Header/Header';
import Post from './components/Posts/Post';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import SingUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { checkAutoLogin } from './services/AuthService';
import { withRouter } from 'react-router-dom';
import { isAuthenticated } from './Store/selectors/AuthSelector';
import { Redirect } from 'react-router-dom';


function App(props) {

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    checkAutoLogin(dispatch, props.history);
  }, []);

  let routes = (<Switch>
 
  <Route path='/singup' component={SingUp} />
  <Route path='/login' component={Login} />
 
  <Route path='/' component={Home} />
</Switch>);

if(props.isAuthenticated){
  routes = (<Switch>
  <Route path='/posts' component={Post} />
   <Route path='/createpost' component={CreatePost} />
  <Route path='/' component={Home} exact/>
  <Redirect to= '/' />
</Switch>);
}

  return (
    <>
     
        <Header />

        <div className="App container px-3 mx-auto">
          {/* <Counter />

      <br />
      <br />
      <br />
      <CounterFunction /> */}
         {routes}
        </div>
  
    </>

  );
}
const mapStateToProps = state =>{
  return {
    isAuthenticated: isAuthenticated(state),
  }
}
export default withRouter(connect(mapStateToProps)(App));
