import React, { useState, useReducer, useContext } from 'react'
import '../App.css';
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App.js'


function Signin() {

    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('password')

    const togglePassword = () => {
        if (type === "password") {
            setType('text')
        } else {
            setType('password')
        }

    }

    const clicked = () => {
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log(res.error)
                }
                else {
                    localStorage.setItem('jwt', res.token)
                    localStorage.setItem('user', JSON.stringify(res.user))
                    dispatch({ type: 'USER', payload: res.user })
                    console.log(res)
                    history.push('/')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const style = {
        textAlign: 'center',
        maxWidth: '400px',
        marginLeft: '20px',
        borderRadius: '10px',
        padding: '30px',
        backgroundColor: '#080004',
        color: 'white'
    }

    return (
        <div style={{ display: 'flex', margin: '10px auto', justifyContent: 'center' }}>

            <div className="card" style={{
                textAlign: 'center',
                maxWidth: '800px',
                borderRadius: '10px',
                backgroundColor: '#555',
                color: 'white'
            }}>
                <div className="card-image">
                    <img src="https://q3p9g6n2.rocketcdn.me/wp-content/ml-loads/2018/07/rocket-rockets-blast-off-shutterstock_566814361-800x450.jpg" style={{ borderRadius: '10px', height: '600px', width: "100%" }} />
                    <span className="card-title">Welcome To SkyRocket— an exclusive reselling and buying portal!</span>
                </div>
            </div>


            <div className='card' style={style}>
                <h2>SkyRocket</h2>
                <h4>Sign In</h4>
                <input type="text" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type={type} id="passwrd" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)}></input><br /><br />
                <div style={{ color: 'teal' }} onClick={() => togglePassword()}>
                    Click here to show/hide Password
                </div>
                <br></br><br></br>
                <button onClick={() => clicked()} className="waves-effect waves-light btn">Sign In</button><br /><br />
                Don't have an account? <br></br>
                <Link to='/signup'>Sign Up here!</Link>
            </div>
        </div>
    )
}

export default Signin
