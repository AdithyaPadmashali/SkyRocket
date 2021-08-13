import React, { useEffect, useContext, createContext, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Screens/Home';
import Signin from './Screens/Signin';
import Signup from './Screens/Signup';
import Profile from './Screens/Profile';
import PostProduct from './Screens/PostProduct';
import Cart from './Screens/Cart';
import { reducer, initialState } from './Reducers/userReducer'

export const UserContext = createContext();

function Routes() {

  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'USER', payload: user })
    }
    else {
      history.push('/signin')
    }
  }, [])

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/signin' component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/cart' component={Cart} />
      <Route path='/profile' component={Profile} />
      <Route path='/postProduct' component={PostProduct} />
    </Switch>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routes />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
