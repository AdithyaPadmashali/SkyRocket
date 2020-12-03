import React, { useContext } from 'react'
import { NavLink as Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
// import styled from 'style-components'

function Navbar() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const clicked_nav = {
        backgroundColor: "#12BDA6"
    }

    const logoutbtn = {
        color: "#12BDA6",
        textTransform: "uppercase",
        padding: "20px",
        border: "none",
        outline: "none",
        backgroundColor: "#08000E",
        fontWeight: "bold"
    }

    const showLinks = () => {
        if (state) {
            return ([
                <li key={1}><Link to="/" exact activeStyle={clicked_nav} >
                    Catalog
                    </Link>
                </li>,
                <li key={2}><Link to="/profile" exact activeStyle={clicked_nav} >
                    Profile
                    </Link>
                </li>,
                <li key={3}>
                    <Link to="/postProduct" exact activeStyle={clicked_nav}>
                        Sell
                        </Link>
                </li>,
                <li key={4} style={{ fontFamily: "serif" }}>
                    <Link style={{ margin: "6px" }} to="/cart">
                        <i className="material-icons">
                            shopping_cart</i>
                    </Link>
                </li>,
                // className="btn waves-effect waves-light"
                <button style={logoutbtn} name="action"
                    onClick={() => {
                        localStorage.clear()
                        dispatch({ type: 'CLEAR' })
                        history.push('/signin')
                    }}>Logout
                </button>
            ])
        }
        else {
            return ([
                <li key={5}>
                    <Link to="/signup" className="right" activeStyle={clicked_nav}>
                        Signup
                    </Link>
                </li>,
                <li key={6}>
                    <Link to="/signin" activeStyle={clicked_nav}>
                        Signin
                    </Link>
                </li>
            ])
        }
    }

    return (
        <nav className="nav-wrapper">
            <div className="container">
                <Link to={state ? '/' : '/signin'} className="brand-logo left">
                    SKYROCKET
                </Link>

                <ul id="nav-mobile" className="right">
                    {showLinks()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
